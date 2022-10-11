<?php
/**
 * Filters API to optimize responses
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\API;

/**
 * Class ApiFilter
 */
class ApiFilter {

	/**
	 * Register hooks
	 *
	 * @return void
	 */
	public function register() {
		$post_types = get_post_types( [ 'show_in_rest' => true ] );

		foreach ( $post_types as $post_type ) {
			add_filter( "rest_prepare_{$post_type}", [ static::class, 'remove_fields' ], 100000 );
		}

		add_filter( 'rest_prepare_user', [ static::class, 'remove_fields' ], 100000 );

		$taxonomies = get_taxonomies( [ 'show_in_rest' => true ], 'names' );

		foreach ( $taxonomies as $taxonomy ) {
			add_filter( "rest_prepare_{$taxonomy}", [ static::class, 'remove_fields' ], 100000 );
		}
	}

	/**
	 * Can register.
	 *
	 * @return boolean
	 */
	public function can_register() {
		return true;
	}

	/**
	 * Remove extra data from response.
	 *
	 * @param \WP_REST_Response $response The REST Response objcet
	 *
	 * @return \WP_REST_Response
	 */
	public static function remove_fields( \WP_REST_Response $response ) {
		if ( isset( $response->data['yoast_head'] ) ) {
			unset( $response->data['yoast_head'] );
		}

		return $response;
	}
}
