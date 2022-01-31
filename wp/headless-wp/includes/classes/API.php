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
			add_filter( "rest_{$post_type}_collection_params", [ $this, 'modify_taxonomy_params_schema' ], 10, 2 );
		}

	}

	/**
	 * Filters the default collection params for custom post types to allow querying by taxonomy slug
	 *
	 * @param array        $query_params JSON Schema-formatted collection parameters.
	 * @param WP_Post_Type $post_type    Post type object.
	 * @return array
	 */
 	public function modify_taxonomy_params_schema( $query_params, $post_type ) {
		$taxonomies = wp_list_filter( get_object_taxonomies( $post_type->name, 'objects' ), [ 'show_in_rest' => true ] );

		if ( ! $taxonomies ) {
			return $query_params;
		}

		foreach ( $taxonomies as $taxonomy ) {
			$base         = ! empty( $taxonomy->rest_base ) ? $taxonomy->rest_base : $taxonomy->name;
			$base_exclude = $base . '_exclude';

			$query_params[ $base ]['oneOf'][0]['items']['type'] = [ 'integer', 'string' ];
			$query_params[ $base_exclude ]['oneOf'][0]['items']['type'] = [ 'integer', 'string' ];
		}

		return $query_params;
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

		$taxonomies = wp_list_filter( get_object_taxonomies( $args['post_type'], 'objects' ), [ 'show_in_rest' => true ] );

		foreach ( $taxonomies as $taxonomy ) {
			$term = filter_input( INPUT_GET, $taxonomy->name, FILTER_SANITIZE_STRING );

			if ( ! empty( $term ) && ! is_numeric( $term ) ) {
				if ( isset( $args['tax_query'] ) ) {
					$args['tax_query'][0]['field'] = 'slug';
					$args['tax_query'] = array_map( function( $tax_query ) use ( $taxonomy ) {
						if ( $tax_query['taxonomy'] === $taxonomy->name ) {
							$tax_query['field'] = 'slug';
							return $tax_query;
						}
						return $tax_query;
					}, $args['tax_query'] );
				} else {
					$args['tax_query'][] = array(
						'taxonomy'         => $taxonomy->name,
						'field'            => 'slug',
						'terms'            => sanitize_text_field( $term ),
						'include_children' => false,
					);
				}
			}
		}

		return $args;
	}

}
