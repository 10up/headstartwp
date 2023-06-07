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
	 * @param int $post_id The post id
	 * @param string $modified_date The post modified date
	 * @return void
	 */
	public function run_job( $post_id, $modified_date ) {
		return $this->revalidate( $post_id );
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
		if ( ! $update )  {
			return;
		}

		/**
		 * Checks wheter the revalidation should run in a cron job.
		 *
		 * @param boolean $run_in_cron Whether it should run in a cron job or not.
		 */
		$run_in_cron = apply_filters( 'tenup_headless_wp_revalidate_on_cron', true );

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

	public function revalidate( $post_id ) {
		try {
			$post = get_post( $post_id );
			$payload = CacheFlushToken::generateForPost( $post );

			$response = $this->revalidate_request( $payload['post_id'], $payload['path'], $payload['token'] );

			$frontpage_id = get_option( 'page_on_front' );

			if ( intval( $frontpage_id ) === intval( $post->ID ) ) {
				// revalidate front page as well
				$payload  = CacheFlushToken::generateForPost( $post, '/' );
				$response = $this->revalidate_request( $payload['post_id'], '/', $payload['token'] );
			}

			$status_code = wp_remote_retrieve_response_code( $response );
			$body        = json_decode( wp_remote_retrieve_body( $response ) );

			$headless_post_url = untrailingslashit( Plugin::get_react_url() ) . $payload['path'];

			if ( 200 === (int) $status_code && function_exists( 'wpcom_vip_purge_edge_cache_for_url' ) ) {
				wpcom_vip_purge_edge_cache_for_url( $headless_post_url );
			}

			/**
			 * Runs after a revalidate request has been fired off to Next.js.
			 *
			 * This can be used to run custom revalidation logic such as flushing the CDN cache.
			 *
			 * @param \WP_Post $post The Post object
			 * @param string $headless_post_url the headless post url
			 */
			do_action( 'tenup_headless_wp_revalidate', $post, $headless_post_url );

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
	public function revalidate_request( $post_id, $path, $token ) {
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
}
