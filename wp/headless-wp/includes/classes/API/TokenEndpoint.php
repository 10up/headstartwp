<?php
/**
 * Handles REST endpoint for previews.
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\API;

use HeadlessWP\CacheFlush\CacheFlushToken;
use WP_REST_Server;
use Exception;
use WP_REST_Response;

/**
 * TokenEndpoint class
 */
class TokenEndpoint {

	/**
	 * Registers hooks.
	 */
	public function register(): void {
		add_action( 'rest_api_init', [ $this, 'register_rest_route' ] );
	}

	/**
	 * Registers a rest route for token endpoint
	 */
	public function register_rest_route(): void {
		register_rest_route(
			\HeadlessWP\API::$namespace,
			'token',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_item' ],
					'permission_callback' => [ $this, 'get_item_permissions_check' ],
				],
			]
		);
	}

	/**
	 * Checks whether the current request validates the token or not
	 *
	 * @throws Exception If payload is invalid.
	 */
	public function get_item_permissions_check(): bool {
		try {
			$payload = CacheFlushToken::getToken();

			if ( empty( $payload ) || ! isset( $payload['type'] ) ) {
				throw new Exception( 'type missing' );
			}

			if ( 'isr-revalidate' === $payload['type'] ) {
				return true;
			}
		} catch ( Exception ) {
			return false;
		}

		return false;
	}
	/**
	 * Returns the token payload.
	 */
	public function get_item(): WP_REST_Response {
		$payload = CacheFlushToken::getToken();

		return rest_ensure_response(
			[
				'post_id' => $payload['post_id'],
				'path'    => $payload['path'],
			]
		);
	}
}
