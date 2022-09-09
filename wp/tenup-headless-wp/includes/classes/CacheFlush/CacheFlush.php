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
		add_action( 'save_post', [ $this, 'trigger_cache_for_post' ], 10, 2 );
	}

	/**
	 * Triggers a cache flush operation
	 *
	 * @param number   $post_id The Post id.
	 * @param \WP_Post $post The post object.
	 *
	 * @return void
	 */
	public function trigger_cache_for_post( $post_id, \WP_Post $post ) {
		if ( ! Plugin::should_revalidate_isr() ) {
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
			$path             = false !== $parsed_url ? $parsed_url['path'] : '';

			if ( empty( $path ) ) {
				return;
			}

			$revalidate_url = sprintf(
				'%?post_id=%d&token=%s&path=%s',
				trailingslashit( $revalidate_endpoint ),
				$post_id,
				$revalidate_token,
				get_permalink( $post )
			);

			$response = wp_remote_get(
				$revalidate_url,
				[
					'timeout' => 30,
				]
			);

			update_post_meta( $post_id, self::LAST_FLUSH_KEY, time() );

			$status_code = wp_remote_retrieve_response_code( $response );

			if ( is_wp_error( $response ) || 200 !== $status_code ) {
				return;
			}

			update_post_meta( $post_id, self::LAST_FLUSH_STATUS_KEY, $status_code );
		} catch ( \Exception $e ) {
			// do nothing
		}
	}
}
