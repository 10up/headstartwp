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


	/**
	 * Registers the action needed for revalidation.
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'wp_after_insert_post', [ $this, 'trigger_cache_for_post' ], 10, 3 );
	}

	/**
	 * Triggers a cache flush operation
	 *
	 * @param number   $post_id The post id.
	 * @param \WP_Post $post The post object.
	 * @param bool     $update Whether this is a new post or update.
	 *
	 * @return void
	 */
	public function trigger_cache_for_post( $post_id, \WP_Post $post, $update ) {
		// Checks if the admin setting for revalidation is set to true.
		// If not, does not need to revalidate.
		if ( ! Plugin::should_revalidate_isr() ) {
			return;
		}

		// If this is just a revision, no need to revalidate.
		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}

		// Checks if a post revalidation is needed. If needed, sends the revalidation
		// request and updates post meta with the revalidation data.
		try {
			// If it is not an update there is no need to revalidate the post paths.
			if ( $update ) {
				$frontpage_id = get_option( 'page_on_front' );

				if ( intval( $frontpage_id ) === intval( $post->ID ) ) {
					$payload = CacheFlushToken::generateForPost( $post, '/' );
				} else {
					$payload  = CacheFlushToken::generateForPost( $post );
				}

				$response = $this->revalidate_post_request( $payload['post_id'], $payload['paths'], $payload['token'] );

				$status_code = wp_remote_retrieve_response_code( $response );
				$body        = json_decode( wp_remote_retrieve_body( $response ) );

				update_post_meta(
					$post_id,
					self::LAST_FLUSH_KEY,
					[
						'time'        => time(),
						'status_code' => $status_code,
						'message'     => isset( $body->message ) ? $body->message : '',
						'paths'       => isset( $body->paths ) ? $body->paths : '',
					]
				);
			}
		} catch ( \Exception $e ) {
			// do nothing
		}

		// Checks if there are terms related to the post. If so, sends the revalidation
		// request and updates each term meta with the revalidation data.
		try {
			$taxonomies = get_taxonomies();
			$terms = wp_get_post_terms( $post_id, $taxonomies );
			$total_pages = apply_filters( 'tenup_headless_isr_revalidate_terms_total_pages', 2 );

			if ( ! empty( $terms ) ) {
				$payload = CacheFlushToken::generateForTerms( $terms );
	
				$response = $this->revalidate_terms_request( $payload['terms_ids'], $payload['paths'], $total_pages, $payload['token']);
	
				$status_code = wp_remote_retrieve_response_code( $response );
				$body		 = json_decode( wp_remote_retrieve_body( $response ));
	
				foreach($terms as $term) {
					$term_path = wp_parse_url( get_term_link( $term ) )['path'];
					$path = isset( $body->paths ) && in_array( $term_path, $body->paths ) ? $term_path : '';
	
					update_term_meta(
						$term->term_id,
						self::LAST_FLUSH_KEY,
						[
							'time'		  => time(),
							'status_code' => $status_code,
							'message'     => isset( $body->message ) ? $body->message : '',
							'path'        => $path,
						]
					);
				};
			}
		} catch ( \Exception $e ) {
			// do nothing
		}
	}

	/**
	 * Makes a revalidate request for a given path
	 *
	 * @param int 		$post_id The post id.
	 * @param string[] 	$paths The paths of the post to revalidate.
	 * @param string 	$token The jwt token to verify the data.
	 *
	 * @return array|\WP_Error
	 */
	public function revalidate_post_request( $post_id, $paths, $token ) {
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
				'paths'   => implode(',', $paths),
				'locale'  => $locale,
				'token'   => $token,
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
	 * Makes a revalidate request for the terms paths.
	 * 
	 * @param int[]		$terms_ids The terms ids.
	 * @param string[]	$paths The paths of the terms to revalidate..
	 * @param int		$total_pages The number of pages to revalidate.
	 * @param string	$token The jwt token to verify the data.
	 * 
	 * @return array|\WP_Error
	 */
	public function revalidate_terms_request( $terms_ids, $paths, $total_pages, $token ) {
		/**
		 * Filters the revalidate endpoint.
		 * 
		 * @param string $revalidate_endpoint The revalidate endpoint.
		 */
		$revalidate_endpoint = apply_filters( 'tenup_headless_isr_revalidate_endpoint', trailingslashit( Plugin::get_react_url() ) . 'api/revalidate' );

		$revalidate_url = add_query_arg(
			[
				'terms_ids' 	=> implode(',', $terms_ids),
				'paths'			=> implode(',', $paths),
				'total_pages'	=> $total_pages,
				'locale'		=> Plugin::get_site_locale(),
				'token'			=> $token,
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
