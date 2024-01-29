<?php
/**
 * Handles REST endpoint for previews.
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\API;

use HeadlessWP\CacheFlush\CacheFlushToken;
use WP_Error;
use WP_REST_Server;

/**
 * TokenEndpoint class
 */
class TokenEndpoint {
	/**
	 * Registers hooks.
	 */
	public function register() {
		add_action( 'rest_api_init', array( $this, 'register_rest_route' ) );
	}

	/**
	 * Registers a rest route for token endpoint
	 *
	 * @return void
	 */
	public function register_rest_route() {
		register_rest_route(
			\HeadlessWP\API::$namespace,
			'token',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_item' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
				],
			]
		);
	}

	/**
	 * Checks whether the current request validates the token or not
	 *
	 * @return boolean|WP_Error True if permission is granted; error otherwise.
	 *
	 * @throws \Exception If payload is invalid.
	 */
	public function get_item_permissions_check() {
		try {
			$payload = CacheFlushToken::getToken();

			if ( empty( $payload ) || ! isset( $payload['type'] ) ) {
				throw new \Exception( 'type missing' );
			}

			if ( 'isr-revalidate' === $payload['type'] ) {
				return true;
			}
		} catch ( \Exception $e ) {
			return false;
		}

		return false;
	}
	/**
	 * Returns the token payload.
	 *
	 * @return WP_REST_Response The REST response.
	 */
	public function get_item() {
		$payload = CacheFlushToken::getToken();

		return rest_ensure_response(
			[
				'post_id' => $payload['post_id'],
				'path'    => $payload['path'],
			]
		);
	}
}
