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
class PreviewEndpoint {
	/**
	 * Registers hooks.
	 */
	public function register() {
		add_action( 'rest_api_init', array( $this, 'register_rest_route' ) );
	}

	/**
	 * Registers a rest route for post previews.
	 *
	 * @return void
	 */
	public function register_rest_route() {
		register_rest_route(
			\HeadlessWP\API::$namespace,
			'preview/(?P<id>[\d]+)/?',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_item' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
				),
			)
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
	 * Provides the path to a REST endpoint with the data the preview endpoint should return.
	 *
	 * @param int   $post_id WP_Post ID.
	 * @param array $params REST params.
	 * @return string Path.
	 */
	public function get_preview_rest_request_path( $post_id, $params ) {
		$revision_types = array( 'revision', 'autosave' );
		if ( isset( $params['revision_type'] ) && in_array( $params['revision_type'], $revision_types, true ) ) {
			return sprintf(
				'/wp/v2/%s/%d/%ss/%d',
				$params['type'],
				intval( $post_id ),
				$params['revision_type'],
				intval( $params['revision_id'] )
			);
		}

		return sprintf( '/wp/v2/%s/%d', $params['type'], intval( $post_id ) );
	}

	/**
	 * Returns the preview post.
	 *
	 * @param WP_REST_Request $request The current request.
	 * @return WP_REST_Response The REST response.
	 */
	public function get_item( WP_REST_Request $request ) {
		$post_id = $request['id'];
		if ( empty( $post_id ) ) {
			return new WP_Error( 'rest_post_invalid_id', __( 'Invalid item ID.' ), array( 'status' => 404 ) );
		}

		$params       = $request->get_params();
		$request_path = $this->get_preview_rest_request_path( $post_id, $params );

		// The following parameters are used to build the request path and don't need to go into the request itself.
		unset( $params['id'] );
		unset( $params['revision_id'] );
		unset( $params['revision_type'] );
		unset( $params['type'] );

		$request = new WP_REST_Request( WP_REST_SERVER::READABLE, $request_path, $params );

		return rest_do_request( $request );
	}
}
