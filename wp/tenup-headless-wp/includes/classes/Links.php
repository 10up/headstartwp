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

		// Override sitemap stylesheet.
		add_filter( 'wpseo_stylesheet_url', array( $this, 'override_wpseo_stylesheet_url' ) );

		// Override url in sitemap at root/index.
		add_filter( 'wpseo_sitemap_index_links', array( $this, 'maybe_override_sitemap_index_links' ) );

		// Override url in sitemap for posts, pages, taxonomy archives, authors etc.
		add_filter( 'wpseo_sitemap_url', array( $this, 'maybe_override_sitemap_url' ), 10, 2 );
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

		if ( is_admin() || is_preview() || is_robots() ) {
			return;
		}

		$site_url = \get_option( 'site_react_url' );

		if ( ! empty( $site_url ) && true === Plugin::should_frontend_redirect() ) {

				$url_request = $wp->request;

				// Redirect the frontend WordPress request to the React website URL.
				\wp_redirect( trailingslashit( esc_url_raw( $site_url ) ) . $url_request, 301 );
				exit;
		}
	}

	/**
	 * Replace host domain for sitemap stylesheet url.
	 *
	 * @return string  Modified sitemap stylesheet xml markup.
	 */
	public function override_wpseo_stylesheet_url() {
		return sprintf(
			'<?xml-stylesheet type="text/xsl" href="%s/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl"?>',
			untrailingslashit( Plugin::get_react_url() )
		);
	}

	/**
	 * Override base url for sitemap links with NextJS app url in sitemap.
	 *
	 * @param  array $links Array of links to be shown in sitemap.
	 * @return array        Modified array of links to be shown in sitemap.
	 */
	public function maybe_override_sitemap_index_links( array $links ) : array {
		return array_map( function( $link ) {
			// Bail, if we don't have loc.
			if ( empty( $link['loc'] ) ) {
				return $link;
			}

			// Replace base url in loc with NextJS app url.
			$link['loc'] = str_replace(
				home_url( '', wp_parse_url( get_option( 'home' ), PHP_URL_SCHEME ) ),
				untrailingslashit( Plugin::get_react_url() ),
				$link['loc']
			);

			return $link;
		}, $links );
	}

	/**
	 * Override base url for sitemap links with NextJS app url in sitemap.
	 *
	 * @param  string $xml  XML markup for url for the given link in sitemap.
	 * @param  array  $link Link for which the url xml markup is rendered.
	 * @return string       Modified XML markup for url for the given link in sitemap.
	 */
	public function maybe_override_sitemap_url( string $xml, array $link ) : string {
		$url = new \DOMDocument();
		$url->loadXML( $xml );

		// Get all `loc` nodes.
		$locs = $url->getElementsByTagName('loc');
		foreach ($locs as $loc) {
			// Bail, if it's not a url.
			if ( filter_var( $loc->nodeValue, FILTER_VALIDATE_URL ) === false ) {
				continue;
			}

			// Create new text node with the replaced url.
			$new_value = $url->createTextNode(
				str_replace(
					home_url( '', wp_parse_url( get_option( 'home' ), PHP_URL_SCHEME ) ),
					untrailingslashit( Plugin::get_react_url() ),
					$loc->nodeValue
				)
			);

			// Remove existing child nodes.
			foreach ( $loc->childNodes as $node ) {
				$loc->removeChild( $node );
			}

			// Append new child node with replaced url.
			$loc->appendChild( $new_value );
		}

		// Merge all child nodes and prepare string.
		$all = array_map(
			[ $url, 'saveXML' ],
			iterator_to_array( $url->childNodes )
		);

		// Return final xml string.
		return implode( '', $all );
	}
}
