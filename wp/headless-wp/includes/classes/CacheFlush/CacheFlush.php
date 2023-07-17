<?php
/**
 * Cache Flush handling
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\CacheFlush;

use HeadlessWP\Plugin;

/**
 * The Cache Flush class
 *
 * Handles triggering cache flush requests
 */
class CacheFlush {
	const LAST_FLUSH_KEY = 'tenup-headless-last-cache-flush';

	const CRON_JOB_NAME = 'tenup-headless-trigger-cache-flush';

	/**
	 * Register the
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'save_post', [ $this, 'trigger_cache_for_post' ], 99999999, 3 );
		add_action( self::CRON_JOB_NAME, [ $this, 'run_job' ], 10, 2 );
	}

	/**
	 * Run the cron job
	 *
	 * @param int    $post_id The post id
	 * @param string $modified_date The post modified date
	 * @return void
	 */
	public function run_job( $post_id, $modified_date ) {
		$this->revalidate( $post_id );
	}

	/**
	 * Triggers a cache flush operation
	 *
	 * @param number   $post_id The Post id.
	 * @param \WP_Post $post The post object.
	 * @param bool     $update Whether this is a new post or update
	 *
	 * @return void
	 */
	public function trigger_cache_for_post( $post_id, \WP_Post $post, $update ) {
		if ( ! Plugin::should_revalidate_isr() ) {
			return;
		}

		// If this is just a revision, no need to revalidate
		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}

		// no need to revalidate new posts
		if ( ! $update ) {
			return;
		}

		/**
		 * Checks whether the revalidation should run in a cron job.
		 *
		 * @param boolean $run_in_cron Whether it should run in a cron job or not.
		 */
		$run_in_cron = apply_filters( 'tenup_headless_wp_revalidate_on_cron', false );

		if ( ! $run_in_cron ) {
			$this->revalidate( $post->ID );
			return;
		}

		$args = [
			'post_id'       => $post->ID,
			// the modified date will ensure every event is unique based on the modified date
			'modified_date' => $post->post_modified,
		];

		// don't schedule duplicated events
		if ( ! wp_next_scheduled( self::CRON_JOB_NAME, $args ) ) {
			wp_schedule_single_event(
				time(),
				self::CRON_JOB_NAME,
				$args
			);
		}
	}

	/**
	 * Runs the revalidation logic
	 *
	 * @param int $post_id The Post id
	 *
	 * @return void
	 */
	public function revalidate( $post_id ) {
		try {
			$react_url = untrailingslashit( Plugin::get_react_url() );

			/**
			 * Post revalidation
			 */
			$post = get_post( $post_id );

			$payload  = CacheFlushToken::generateForPost( $post );
			$response = $this->revalidate_post_request( $payload['post_id'], $payload['path'], $payload['token'] );

			$frontpage_id = get_option( 'page_on_front' );

			if ( intval( $frontpage_id ) === intval( $post->ID ) ) {
				// revalidate front page as well
				$payload  = CacheFlushToken::generateForPost( $post, '/' );
				$response = $this->revalidate_post_request( $payload['post_id'], '/', $payload['token'] );
			}

			$status_code = wp_remote_retrieve_response_code( $response );
			$body        = json_decode( wp_remote_retrieve_body( $response ) );

			$headless_post_url = $react_url . $payload['path'];

			if ( 200 === (int) $status_code && function_exists( 'wpcom_vip_purge_edge_cache_for_url' ) ) {
				wpcom_vip_purge_edge_cache_for_url( $headless_post_url );
			}

			/**
			 * Archive revalidation.
			 */
			$archive_link = get_post_type_archive_link( $post->post_type );

			if ( false !== $archive_link ) {
				$archive_path        = str_replace( home_url(), '', $archive_link );
				$archive_path        = (bool) $archive_path ? untrailingslashit( $archive_path ) : '/';
				$archive_total_pages = apply_filters( 'tenup_headless_isr_revalidate_archive_total_pages', 2 );

				$payload  = CacheFlushToken::generateForArchive( $post, $archive_path );
				$response = $this->revalidate_archive_request( $payload['post_type'], $payload['path'], $archive_total_pages, $payload['token'] );

				$status_code = wp_remote_retrieve_response_code( $response );
				$body        = json_decode( wp_remote_retrieve_body( $response ) );

				$headless_archive_url = $react_url . $payload['path'];

				if ( 200 === (int) $status_code && function_exists( 'wpcom_vip_purge_edge_cache_for_url' ) ) {
					wpcom_vip_purge_edge_cache_for_url( $headless_archive_url );
				}
			}

			/**
			 * Terms revalidation
			 */
			$taxonomies        = get_taxonomies();
			$terms             = wp_get_post_terms( $post_id, $taxonomies );
			$terms_total_pages = apply_filters( 'tenup_headless_isr_revalidate_terms_total_pages', 2 );

			$headless_terms_urls = [];

			if ( ! empty( $terms ) ) {
				$payload  = CacheFlushToken::generateForTerms( $terms );
				$response = $this->revalidate_terms_request( $payload['terms_ids'], $payload['paths'], $terms_total_pages, $payload['token'] );

				$status_code = wp_remote_retrieve_response_code( $response );
				$body        = json_decode( wp_remote_retrieve_body( $response ) );

				foreach ( $payload['paths'] as $path ) {
					$headless_term_url = $react_url . $path;
					array_push( $headless_terms_urls, $headless_term_url );

					if ( 200 === (int) $status_code && function_exists( 'wpcom_vip_purge_edge_cache_for_url' ) ) {
						wpcom_vip_purge_edge_cache_for_url( $headless_term_url );
					}
				}
			}

			/**
			 * Runs after a revalidate request has been fired off to Next.js.
			 *
			 * This can be used to run custom revalidation logic such as flushing the CDN cache.
			 *
			 * @param \WP_Post $post The Post object
			 * @param string $headless_post_url the headless post url
			 * @param string[] $headless_term_urls the headless terms urls
			 */
			do_action( 'tenup_headless_wp_revalidate', $post, $headless_post_url, $headless_terms_urls );

			update_post_meta(
				$post->ID,
				self::LAST_FLUSH_KEY,
				[
					'time'        => time(),
					'status_code' => $status_code,
					'message'     => isset( $body->message ) ? $body->message : '',
					'path'        => isset( $body->path ) ? $body->path : '',
				]
			);

			foreach ( $terms as $term ) {
				$term_path = wp_parse_url( get_term_link( $term ) )['path'];
				$path      = isset( $body->paths ) && in_array( $term_path, $body->paths, true ) ? $term_path : '';

				update_term_meta(
					$term->term_id,
					self::LAST_FLUSH_KEY,
					[
						'time'        => time(),
						'status_code' => $status_code,
						'message'     => isset( $body->message ) ? $body->message : '',
						'path'        => $path,
					]
				);
			};
		} catch ( \Exception $e ) {
			// do nothing
		}
	}

	/**
	 * Makes a revalidate request for a given path
	 *
	 * @param number $post_id The Post id
	 * @param string $path The Path to revalidate
	 * @param string $token The jwt token
	 *
	 * @return array|\WP_Error
	 */
	public function revalidate_post_request( $post_id, $path, $token ) {
		/**
		 * Filters the revalidate endpoint.
		 *
		 * @param string $revalidate_endpoint The revalidate endpoint
		 */
		$revalidate_endpoint = apply_filters( 'tenup_headless_isr_revalidate_endpoint', trailingslashit( Plugin::get_react_url() ) . 'api/revalidate' );

		$locale = Plugin::get_site_locale();

		if ( function_exists( 'pll_get_post_language' ) ) {
			$locale = pll_get_post_language( $post_id, 'slug' );
		}

		$revalidate_url = add_query_arg(
			[
				'post_id' => $post_id,
				'token'   => $token,
				'path'    => $path,
				'locale'  => $locale,
			],
			$revalidate_endpoint
		);

		return wp_remote_get(
			$revalidate_url,
			[
				'timeout' => 5,
			]
		);
	}

	/**
	 * Makes a revalidate request for an archive path.
	 *
	 * @param string $post_type The post type.
	 * @param string $path The path of the archive to revalidate.
	 * @param int    $total_pages The number of pages to revalidate.
	 * @param string $token The jwt token.
	 *
	 * @return array|\WP_Error
	 */
	public function revalidate_archive_request( $post_type, $path, $total_pages, $token ) {
		/**
		 * Filters the revalidate endpoint.
		 *
		 * @param string $revalidate_endpoint The revalidate endpoint.
		 */
		$revalidate_endpoint = apply_filters( 'tenup_headless_isr_revalidate_endpoint', trailingslashit( Plugin::get_react_url() ) . 'api/revalidate' );

		$locale = Plugin::get_site_locale();

		$revalidate_url = add_query_arg(
			[
				'post_type'   => $post_type,
				'path'        => $path,
				'total_pages' => $total_pages,
				'token'       => $token,
			]
		);

		return wp_remote_get(
			$revalidate_url,
			[
				'timeout' => 5,
			]
		);
	}

	/**
	 * Makes a revalidate request for the terms paths.
	 *
	 * @param int[]    $terms_ids The terms ids.
	 * @param string[] $paths The paths of the terms to revalidate.
	 * @param int      $terms_total_pages The number of pages to revalidate.
	 * @param string   $token The jwt token.
	 *
	 * @return array|\WP_Error
	 */
	public function revalidate_terms_request( $terms_ids, $paths, $terms_total_pages, $token ) {
		/**
		 * Filters the revalidate endpoint.
		 *
		 * @param string $revalidate_endpoint The revalidate endpoint.
		 */
		$revalidate_endpoint = apply_filters( 'tenup_headless_isr_revalidate_endpoint', trailingslashit( Plugin::get_react_url() ) . 'api/revalidate' );

		$locale = Plugin::get_site_locale();

		$revalidate_url = add_query_arg(
			[
				'terms_ids'   => implode( ',', $terms_ids ),
				'paths'       => implode( ',', $paths ),
				'total_pages' => $terms_total_pages,
				'locale'      => $locale,
				'token'       => $token,
			],
			$revalidate_endpoint
		);

		return wp_remote_get(
			$revalidate_url,
			[
				'timeout' => 5,
			]
		);
	}
}
