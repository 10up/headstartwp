<?php
/**
 *  HeadlessWP REST API Class
 *
 *  REST API customizations for the scaffold
 *
 * @package HeadlessWP
 */

namespace HeadlessWP;

use WP_REST_Request;

/**
 * Class for API REST Endpoint
 */
class API {

	/**
	 * Namespace for API requests
	 *
	 * @var string
	 */
	public static $namespace = 'headless-wp/v1';

	public function register() {

		// Register the 'app' endpoint that serves the default data needed for every request in the headless website
		$app_endpoint = new API\AppEndpoint();
		$app_endpoint->register();

		$preview_endpoint = new API\PreviewEndpoint();
		$preview_endpoint->register();

		add_action( 'init', array( $this, 'register_post_type_taxonomy_params' ), 999 );

	}

	/**
	 * Add a filter for all queryable post types to be able to be filtered by taxonomy term slug instead of ID.
	 * The main purpose of this is to prevent an extra REST API request to get the taxonomy information to get the slug
	 */
	public function register_post_type_taxonomy_params() {

		$post_types = get_post_types(
			array(
				'show_in_rest' => true,
				'public'       => true,
			)
		);

		foreach ( $post_types as $post_type ) {
			add_filter( "rest_{$post_type}_query", array( $this, 'modify_taxonomy_params' ), 10, 2 );
		}

	}

	/**
	 * Modifies the REST API query parameters to check for a taxonomy term slug instead of ID, which is the default
	 * This is passed via the URL via ?<taxonomy>=term, eg ?category=catgory-slug
	 *
	 * @param array  - $args
	 * @param object - $request
	 * @return array - array of args
	 */
	public function modify_taxonomy_params( $args, $request ) {

		if ( empty( $args['post_type'] ) ) {
			return $args;
		}

		$taxonomies = get_object_taxonomies( $args['post_type'], 'object' );

		foreach ( $taxonomies as $taxonomy ) {

			if ( ! empty( $_GET[ $taxonomy->name ] ) && ! is_numeric( $_GET[ $taxonomy->name ] ) ) {

				// Taxonomy slug was passed, add to the tax filter.
				$args['tax_query'][] = array(
					'taxonomy'         => $taxonomy->name,
					'field'            => 'slug',
					'terms'            => sanitize_text_field( $_GET[ $taxonomy->name ] ),
					'include_children' => false,
				);
			}
		}

		return $args;
	}

}
