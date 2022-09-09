<?php
/**
 *  HeadlessWP Links Class
 *
 *  Functionality for replacing URLs with the React URL for previews and permalinks
 *
 * @package HeadlessWP
 */

namespace HeadlessWP;

use WP_Post;

/**
 * Links Class
 * Defines functionality specific to rewriting URLs used in the site.
 */
class Links {

	/**
	 * Set up any hooks
	 */
	public function register() {
		// if request method is HEAD then the headless site is making a HEAD request to figure out redirects, so don't mess with redirects or home_url
		$request_method = $_SERVER['REQUEST_METHOD'];

		if ( 'HEAD' !== $request_method ) {
			add_action( 'template_redirect', array( $this, 'maybe_redirect_frontend' ) );
		}

		add_filter( 'rewrite_rules_array', array( $this, 'create_taxonomy_rewrites' ) );

		// We need to hook in early so that the home filter will work when validating an auth token
		if ( isset( $_SERVER['HTTP_AUTHORIZATION'] ) && $_SERVER['HTTP_AUTHORIZATION'] && false !== strpos( wp_unslash( $_SERVER['HTTP_AUTHORIZATION'] ), 'Bearer' ) ) {
			if ( 'HEAD' !== $request_method ) {
				add_action( 'plugin_loaded', array( $this, 'hook_home_url_filter' ) );
			}
		}
	}

	/**
	 * Create Taxonomy Rewrites
	 *
	 * @param array $array - array of rewrite rules.
	 * @return array
	 *
	 * * /posts/category/category-slug
	 * /events/category/category-slug
	 *
	 * This is to allow taxonomy archive pages to exist that aren't specific to the 'post' post type by default and make more usable across other post types by
	 * creating default rewrite rules for taxonomy endpoints for post types for the front-end site to resolve to in the format /<CPT>/<taxonomy>/<slug>.
	 */
	public function create_taxonomy_rewrites( $array ) {

		// When set_taxonomy_rewrites_disabled true, bypasses these custom endpoint rewrite rules
		if ( true === apply_filters( __function__ . '_disabled', false ) ) {
			return $array;
		}

		$post_types = get_post_types(
			array(
				'show_in_rest' => true,
				'public'       => true,
			)
		);

		unset( $post_types['page'] );

		foreach ( $post_types as $post_type ) {

			$post_slug = $post_type;

			$taxonomies = get_object_taxonomies( $post_type, 'object' );

			foreach ( $taxonomies as $taxonomy ) {

				// If this taxonomy isn't set to show in the REST API, then don't create a rewrite rule for it
				if ( true !== $taxonomy->show_in_rest ) {
					continue;
				}

				$rewrite_slug      = $taxonomy->rewrite['slug'];
				$rewrite_query_var = $taxonomy->query_var;

				if ( empty( $rewrite_slug ) || empty( $rewrite_query_var ) ) {
					continue;
				}

				$array[ "$post_slug/$rewrite_slug/(.+?)/?$" ]                   = "index.php?$rewrite_query_var=$1&post_type=$post_type";
				$array[ "$post_slug/$rewrite_slug/(.+?)/page/?([0-9]{1,})/?$" ] = "index.php?$rewrite_query_var=$1&paged=$2&post_type=$post_type";

			}
		}

		return $array;
	}

	/**
	 * Replace WordPress URLs with React URLs (if React URL set)
	 *
	 * @param string $home_url The home url
	 * @param string $path The path
	 * @param string $orig_scheme The orig scheme
	 * @return string
	 */
	public function filter_home_url( $home_url, $path, $orig_scheme ) {
		$url = Plugin::get_react_url();

		if ( empty( $url ) ) {
			return $home_url;
		}

		if ( ! empty( $path ) ) {
			$url = trailingslashit( $url ) . ltrim( $path, '/' );
		}

		$url = set_url_scheme( $url );

		return $url;
	}

	/**
	 * Redirect the WordPress frontend if the React website URL has been filled in and the user has selected to redirect the frontend
	 */
	public function maybe_redirect_frontend() {

		global $wp;

		if ( is_admin() || is_preview() ) {
			return;
		}

		$site_url = \get_option( 'site_react_url' );

		if ( ! empty( $site_url ) && true === Plugin::should_frontend_redirect() ) {

				$url_request = $wp->request;

				// Redirect the frontend WordPress request to the React website URL.
				\wp_redirect( trailingslashit( esc_url_raw( $site_url ) ) . $url_request, 301 );
		}
	}
}
