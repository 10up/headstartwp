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
 * Handles triggering cacle flush requests
 */
class CacheFlush {

	const LAST_FLUSH_KEY        = 'tenup-headless-last-cache-flush';
	const LAST_FLUSH_STATUS_KEY = 'tenup-headless-last-flush-status-key';

	/**
	 * Register the
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'save_post', [ $this, 'trigger_cache_for_post' ], 10, 3 );
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
		 * Filters the revalidate endpoint.
		 *
		 * @param string $revalidate_endpoint The revalidate endpoint
		 */
		$revalidate_endpoint = apply_filters( 'tenup_headless_isr_revalidate_endpoint', trailingslashit( Plugin::get_react_url() ) . 'api/revalidate' );

		try {
			$revalidate_token = CacheFlushToken::generateForPost( $post );
			$parsed_url       = wp_parse_url( get_permalink( $post ) );
			$path             = false !== $parsed_url ? untrailingslashit( $parsed_url['path'] ) : '';

			if ( empty( $path ) ) {
				return;
			}

			$revalidate_url = add_query_arg(
				[
					'post_id' => $post_id,
					'token'   => $revalidate_token,
					'path'    => $path,
				],
				$revalidate_endpoint
			);

			$response = wp_remote_get(
				$revalidate_url,
				[
					'timeout' => 30,
				]
			);

			$status_code = wp_remote_retrieve_response_code( $response );
			$body        = json_decode( wp_remote_retrieve_body( $response ) );

			update_post_meta(
				$post_id,
				self::LAST_FLUSH_KEY,
				[
					'time'        => time(),
					'status_code' => $status_code,
					'message'     => $body->message,
				]
			);

		} catch ( \Exception $e ) {
			// do nothing
		}
	}
}
