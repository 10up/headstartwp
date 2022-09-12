<?php
/**
 * Handles REST endpoint for previews.
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\API;

use HeadlessWP\CacheFlush\CacheFlushToken;
use WP_Error;
use WP_REST_Request;
use WP_REST_Server;

/**
 * Previews class
 */
class TokenEndpoint {
	/**
	 * Registers hooks.
	 */
	public function register() {
		add_action( 'rest_api_init', array( $this, 'register_rest_route' ) );
	}

	/**
	 * Registers a rest route for ptoken endpoint
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
	 * @param WP_REST_Request $request The current request.
	 * @return boolean|WP_Error True if permisson is granted; error otherwise.
	 *
	 * @throws \Exception If payload is invalid.
	 */
	public function get_item_permissions_check( WP_REST_Request $request ) {
		try {
			$payload = CacheFlushToken::getToken();

			if ( ! isset( $payload ) ) {
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
	 * Returns the preview post.
	 *
	 * @param WP_REST_Request $request The current request.
	 * @return WP_REST_Response The REST response.
	 */
	public function get_item( WP_REST_Request $request ) {
		$payload = CacheFlushToken::getToken();

		return rest_ensure_response(
			[
				'post_id' => $payload['post_id'],
				'path'    => $payload['path'],
			]
		);
	}
}
