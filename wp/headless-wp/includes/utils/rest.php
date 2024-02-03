<?php
/**
 * Helper functions for REST API.
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Utils\Rest;

/**
 * Determine if it's a REST API request.
 *
 * @return boolean True if rest request.
 */
function is_rest() {
	return defined( 'REST_REQUEST' ) && REST_REQUEST;
}


/**
 * Verifies if REST request and checks URI against available taxonomies.
 *
 * @return boolean|\WP_term;
 */
function is_taxonomy_rest_request() {
	if ( ! is_rest() ) {
		return false;
	}

	$request_uri = filter_input( INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_URL );
	$taxonomies  = get_taxonomies(
		[
			'public'       => true,
			'show_in_rest' => true,
		]
	);

	// Capture the endpoint and slug value from request URI.
	$pattern = '/\/wp-json\/wp\/v2\/(?<endpoint>\w+)\?.*?slug=(?<slug>[^&\s]+)/';
	preg_match( $pattern, $request_uri, $matches );

	if ( empty( $matches ) || ! in_array( $matches['endpoint'], $taxonomies, true ) ) {
		return false;
	}

	$taxonomy = $matches['endpoint'];
	$term     = get_term_by( 'slug', $matches['slug'], $taxonomy );

	if ( ! $term instanceof \WP_Term ) {
		return false;
	}

	return $term;
}
