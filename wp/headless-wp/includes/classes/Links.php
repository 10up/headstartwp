<?php
/**
 *  HeadlessWP Links Class
 *
 *  Functionality for replacing URLs with the React URL for previews and permalinks
 *
 * @package HeadlessWP
 */

namespace HeadlessWP;

/**
 * Links Class
 * Defines functionality specific to rewriting URLs used in the site.
 */
class Links {

	/**
	 * Set up any hooks
	 */
	public function register(): void {
		add_action( 'template_redirect', [ $this, 'maybe_redirect_frontend' ] );
		add_filter( 'rewrite_rules_array', [ $this, 'create_taxonomy_rewrites' ] );
	}

	/**
	 * Create Taxonomy Rewrites
	 *
	 * /posts/category/category-slug
	 * /events/category/category-slug
	 *
	 * This is to allow taxonomy archive pages to exist that aren't specific to the 'post' post type by default and make more usable across other post types by
	 * creating default rewrite rules for taxonomy endpoints for post types for the front-end site to resolve to in the format /<CPT>/<taxonomy>/<slug>.
	 *
	 * @param array $rules Rewrite rules.
	 */
	public function create_taxonomy_rewrites( array $rules ): array {

		// When set_taxonomy_rewrites_disabled true, bypasses these custom endpoint rewrite rules
		if ( true === apply_filters( __FUNCTION__ . '_disabled', false ) ) {
			return $rules;
		}

		$post_types = get_post_types(
			[
				'show_in_rest' => true,
				'public'       => true,
			]
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
				if ( empty( $rewrite_slug ) ) {
					continue;
				}
				if ( empty( $rewrite_query_var ) ) {
					continue;
				}

				$rules[ sprintf( '%s/%s/(.+?)/?$', $post_slug, $rewrite_slug ) ]                   = sprintf( 'index.php?%s=$1&post_type=%s', $rewrite_query_var, $post_type );
				$rules[ sprintf( '%s/%s/(.+?)/page/?([0-9]{1,})/?$', $post_slug, $rewrite_slug ) ] = sprintf( 'index.php?%s=$1&paged=$2&post_type=%s', $rewrite_query_var, $post_type );

			}
		}

		return $rules;
	}

	/**
	 * Replace WordPress URLs with React URLs (if React URL set)
	 *
	 * @param string $home_url The home url
	 * @param string $path The path
	 * @param string $orig_scheme The orig scheme
	 */
	public function filter_home_url( string $home_url, string $path, string $orig_scheme ): string { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed
		$url = Plugin::get_react_url();

		if ( empty( $url ) ) {
			return $home_url;
		}

		if ( ! empty( $path ) ) {
			$url = trailingslashit( $url ) . ltrim( $path, '/' );
		}

		return set_url_scheme( $url );
	}

	/**
	 * Redirect the WordPress frontend if the React website URL has been filled in and the user has selected to redirect the frontend
	 */
	public function maybe_redirect_frontend(): void {
		// if request method is HEAD then the headless site is making a HEAD request to figure out redirects, so don't mess with redirects or home_url
		if (
			isset( $_SERVER['REQUEST_METHOD'] ) &&
			'HEAD' === sanitize_text_field( wp_unslash( $_SERVER['REQUEST_METHOD'] ) )
		) {
			return;
		}

		if ( isset( $_SERVER['HTTP_X_WP_REDIRECT_CHECK'] ) ) {
			return;
		}

		global $wp;

		$site_url = \get_option( 'site_react_url' );

		$should_redirect = ! is_admin() && ! is_preview() && ! is_robots() && ! is_feed() && ! empty( $site_url );
		$should_redirect = $should_redirect && Plugin::should_frontend_redirect();

		/**
		 * Filter's whether the frontend should redirect to the react url
		 *
		 * @param array $should_redirect The default should redirect value.
		 */
		$should_redirect = apply_filters( 'tenup_headless_wp_frontend_should_redirect', $should_redirect );

		if ( $should_redirect ) {
			$url_request = $wp->request;

			// do not redirect for (missing) assets
			if ( str_starts_with( (string) $url_request, '/wp-content' ) || str_ends_with( (string) $url_request, '.css' ) || str_ends_with( (string) $url_request, '.js' ) ) {
				return;
			}

			// Redirect the frontend WordPress request to the React website URL.
			// phpcs:ignore WordPress.Security.SafeRedirect.wp_redirect_wp_redirect
			\wp_redirect( trailingslashit( esc_url_raw( $site_url ) ) . $url_request, 301 );
			exit;
		}
	}
}
