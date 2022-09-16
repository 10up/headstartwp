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

	const LAST_FLUSH_KEY = 'tenup-headless-last-cache-flush';


	/**
	 * Register the
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'save_post', [ $this, 'trigger_cache_for_post' ], 10, 3 );
	}

	/**
	 * Checks whether we should use redis as transport method
	 *
	 * @return boolean
	 */
	private function is_redis_mode() {
		/**
		 * Filters whether redis mode should be used. Defaults to false
		 *
		 * @param bool $redis_mode Whether Redis should be used to trigger a on-demand revalidate request or not
		 */
		return apply_filters( 'tenup_headless_isr_redis_mode', true );
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

		try {
			$payload = CacheFlushToken::generateForPost( $post );

			$response = $this->revalidate_request( $payload['post_id'], $payload['path'], $payload['token'] );

			$frontpage_id = get_option( 'page_on_front' );

			if ( intval( $frontpage_id ) === intval( $post->ID ) ) {
				// revalidate front page as well
				$payload  = CacheFlushToken::generateForPost( $post, '/' );
				$response = $this->revalidate_request( $payload['post_id'], '/', $payload['token'] );
			}

			update_post_meta(
				$post_id,
				self::LAST_FLUSH_KEY,
				[
					'time'        => time(),
					'status_code' => $response['status_code'],
					'message'     => $response['message'],
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
		if ( $this->is_redis_mode() ) {
			/**
			 * Filters the redis credentials
			 *
			 * @var array $redis_credentials {
			 *  Required. Array contains redis credetials.
			 *
			 *  @type number $port The redis port
			 *  @type string $host The redis host
			 *  @type string $password The redis password
			 * }
			 */
			$redis_credentials = apply_filters(
				'tenup_headless_redis_credentials',
				[
					'scheme'   => 'tls',
					'host'     => 'localhost',
					'port'     => 6379,
					'password' => '',
				]
			);

			$redis = new \Predis\Client( $redis_credentials );

			$return = $redis->publish(
				'isr-revalidate-request',
				wp_json_encode(
					[
						'post_id' => $post_id,
						'path'    => $path,
					]
				)
			);

			$status_code = 200;
			$message     = 'Redis';
		} else {
			/**
			 * Filters the revalidate endpoint.
			 *
			 * @param string $revalidate_endpoint The revalidate endpoint
			 */
			$revalidate_endpoint = apply_filters( 'tenup_headless_isr_revalidate_endpoint', trailingslashit( Plugin::get_react_url() ) . 'api / revalidate' );

			$revalidate_url = add_query_arg(
				[
					'post_id' => $post_id,
					'token'   => $token,
					'path'    => $path,
				],
				$revalidate_endpoint
			);

			$response = wp_remote_get(
				$revalidate_url,
				[
					'timeout' => 5,
				]
			);

			$status_code = wp_remote_retrieve_response_code( $response );
			$body        = json_decode( wp_remote_retrieve_body( $response ) );
			$message     = $body->message;
		}

		return [
			'status_code' => $status_code,
			'message'     => $message,
		];
	}
}
