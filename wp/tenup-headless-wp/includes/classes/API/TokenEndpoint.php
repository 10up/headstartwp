<?php
/**
 * Handles REST endpoint for previews.
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\API;

use WP_Error;
use WP_Post;
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
					'args'                => [
						'token' => [
							'description'       => 'The token to validate',
							'type'              => 'string',
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						],
					],
				],
			]
		);
	}

	/**
	 * Checks whether the current request has permission to get the post preview.
	 *
	 * @param WP_REST_Request $request The current request.
	 * @return boolean|WP_Error True if permisson is granted; error otherwise.
	 */
	public function get_item_permissions_check( WP_REST_Request $request ) {
		return current_user_can( 'edit_post', $request['id'] );
	}
	/**
	 * Returns the preview post.
	 *
	 * @param WP_REST_Request $request The current request.
	 * @return WP_REST_Response The REST response.
	 */
	public function get_item( WP_REST_Request $request ) {

	}
}
