<?php
/**
 * HeadlessWP YoastSEO Class
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Integrations;

use HeadlessWP\Plugin;

/**
 * The YoastSEO integration class
 */
class YoastSEO {
	/**
	 * Register Hooks
	 */
	public function register() {
		// Override sitemap stylesheet.
		add_filter( 'wpseo_stylesheet_url', array( $this, 'override_wpseo_stylesheet_url' ) );

		// Override url in sitemap at root/index.
		add_filter( 'wpseo_sitemap_index_links', array( $this, 'maybe_override_sitemap_index_links' ) );

		// Override url in sitemap for posts, pages, taxonomy archives, authors etc.
		add_filter( 'wpseo_sitemap_url', array( $this, 'maybe_override_sitemap_url' ), 10, 2 );

		add_filter( 'robots_txt', array( $this, 'maybe_override_sitemap_robots_url' ), 999999 );

		// Override Search results yoast head, get_head endpoint currently does't detect search page.
		add_filter( 'wpseo_canonical', array( $this, 'override_search_canonical' ), 10, 1 );
		add_filter( 'wpseo_title', array( $this, 'override_search_title' ), 10, 1 );
		add_filter( 'wpseo_opengraph_title', array( $this, 'override_search_title' ), 10, 1 );
		add_filter( 'wpseo_opengraph_url', array( $this, 'override_search_canonical' ), 10, 1 );
	}

	/**
	 * Checks if Yoast SEO Urls should be rewritten
	 *
	 * @return boolean
	 */
	protected function should_rewrite_urls() {
		if ( ! Plugin::get_react_url() ) {
			return false;
		}

		$rewrite_urls = filter_input( INPUT_GET, 'rewrite_urls', FILTER_SANITIZE_NUMBER_INT );

		return (bool) $rewrite_urls;
	}

	/**
	 * Replace host domain for sitemap stylesheet url.
	 *
	 * @param string $stylesheet the stylesheet markup
	 *
	 * @return string  Modified sitemap stylesheet xml markup.
	 */
	public function override_wpseo_stylesheet_url( $stylesheet ) {
		if ( $this->should_rewrite_urls() ) {
			return sprintf(
				'<?xml-stylesheet type="text/xsl" href="%s/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl"?>',
				untrailingslashit( Plugin::get_react_url() )
			);
		}

		return $stylesheet;
	}

	/**
	 * Override base url for sitemap links with NextJS app url in sitemap.
	 *
	 * @param  array $links Array of links to be shown in sitemap.
	 * @return array        Modified array of links to be shown in sitemap.
	 */
	public function maybe_override_sitemap_index_links( array $links ) : array {
		if ( ! $this->should_rewrite_urls() ) {
			return $links;
		}

		return array_map(
			function( $link ) {
				// Bail, if we don't have loc.
				if ( empty( $link['loc'] ) ) {
					return $link;
				}

				// Replace base url in loc with NextJS app url.
				$link['loc'] = str_replace(
					untrailingslashit( home_url( '', wp_parse_url( get_option( 'home' ), PHP_URL_SCHEME ) ) ),
					untrailingslashit( Plugin::get_react_url() ),
					$link['loc']
				);

				return $link;
			},
			$links
		);
	}

	/**
	 * Override base url for sitemap links with NextJS app url in sitemap.
	 *
	 * @param  string $xml  XML markup for url for the given link in sitemap.
	 * @param  array  $link Link for which the url xml markup is rendered.
	 * @return string       Modified XML markup for url for the given link in sitemap.
	 */
	public function maybe_override_sitemap_url( string $xml, array $link ) : string {
		if ( ! $this->should_rewrite_urls() ) {
			return $xml;
		}

		$url = new \DOMDocument();
		$url->loadXML( $xml );

		// Get all `loc` nodes.
		$locs = $url->getElementsByTagName( 'loc' );
		foreach ( $locs as $loc ) {
			// Bail, if it's not a url.
			if ( filter_var( $loc->nodeValue, FILTER_VALIDATE_URL ) === false ) { // phpcs:ignore WordPress.NamingConventions.ValidVariableName
				continue;
			}

			// Create new text node with the replaced url.
			$new_value = $url->createTextNode(
				str_replace(
					untrailingslashit( home_url( '', wp_parse_url( get_option( 'home' ), PHP_URL_SCHEME ) ) ),
					untrailingslashit( Plugin::get_react_url() ),
					$loc->nodeValue // phpcs:ignore WordPress.NamingConventions.ValidVariableName
				)
			);

			// Remove existing child nodes.
			foreach ( $loc->childNodes as $node ) { // phpcs:ignore WordPress.NamingConventions.ValidVariableName
				$loc->removeChild( $node );
			}

			// Append new child node with replaced url.
			$loc->appendChild( $new_value );
		}

		// Merge all child nodes and prepare string.
		$all = array_map(
			[ $url, 'saveXML' ],
			iterator_to_array( $url->childNodes ) // phpcs:ignore WordPress.NamingConventions.ValidVariableName
		);

		// Return final xml string.
		return implode( '', $all );
	}

	/**
	 * Overrides the sitemap url with the front-end url
	 *
	 * @param string $output the robots.txt output
	 *
	 * @return string
	 */
	public function maybe_override_sitemap_robots_url( $output ) {
		if ( $this->should_rewrite_urls() ) {
			return str_replace(
				untrailingslashit( home_url( '', wp_parse_url( get_option( 'home' ), PHP_URL_SCHEME ) ) ),
				untrailingslashit( Plugin::get_react_url() ),
				$output,
			);
		}

		return $output;
	}

	/**
	 * Return list of query vars if the request is /yoast/v1/get_head?url and for search URL based on ?s= parameter.
	 *
	 * @return boolean|array False if it's not a yoast search rest api request. Search $query_vars if otherwise.
	 */
	public function get_yoast_search_query_vars() {

		if ( ! ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
			return false;
		}

		$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_url( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '';

		if ( false === strpos( $request_uri, '/yoast/v1/get_head' ) ) {
			return false;
		}

		$url_param = isset( $_GET['url'] ) ? sanitize_url( wp_unslash( $_GET['url'] ) ) : '';

		if ( filter_var( $url_param, FILTER_VALIDATE_URL ) !== false ) {
			$query = wp_parse_url( $url_param, PHP_URL_QUERY );
			parse_str( $query, $query_vars );

			// Return query vars if search request.
			if ( isset( $query_vars['s'] ) ) {
				return apply_filters( 'tenup_headless_wp_search_request_query_vars', $query_vars );
			}
		}

		return false;
	}

	/**
	 * Custom helper to replace Yoast search title placeholders.
	 * Assuming only some of the basic variables.
	 *
	 * @todo Support for page number.
	 *
	 * @param string $title The search SEO title
	 * @param array  $query_vars The search query vars.
	 *
	 * @return string
	 */
	public function replace_yoast_search_title_placeholders( $title, $query_vars ) {

		$str_replace_mapping = apply_filters(
			'tenup_headless_wp_search_title_variables_replacments',
			array(
				'%%sitename%%'     => get_bloginfo( 'name' ),
				'%%searchphrase%%' => $query_vars['s'] ?? '',
				' %%page%%'        => '',
				'%%sep%%'          => \YoastSEO()->helpers->options->get_title_separator() ?? ' ',
			)
		);

		return str_replace( array_keys( $str_replace_mapping ), array_values( $str_replace_mapping ), $title );
	}

	/**
	 * Set the missing Yoast Search title.
	 *
	 * @param string $title The title.
	 * @return string
	 */
	public function override_search_title( $title ) {

		$search_request_query_vars = $this->get_yoast_search_query_vars();

		if ( ! $search_request_query_vars ) {
			return $title;
		}

		$wpseo_titles = get_option( 'wpseo_titles' );

		$title_search_wpseo = '';

		// Get user setting for search title, fallback to default search from Yoast SEO.
		if ( ! empty( $wpseo_titles ) && ! empty( $wpseo_titles['title-search-wpseo'] ) ) {
			$title_search_wpseo = $wpseo_titles['title-search-wpseo'];
		} else {
			$default_titles = \WPSEO_Option_Titles::get_instance()->get_defaults();
			if ( ! empty( $default_titles['title-search-wpseo'] ) ) {
				$title_search_wpseo = $default_titles['title-search-wpseo'];
			}
		}

		if ( empty( $title_search_wpseo ) ) {
			return $title;
		}

		return $this->replace_yoast_search_title_placeholders( $title_search_wpseo, $search_request_query_vars );
	}

	/**
	 * Yoast doesn't typically have a canonical for search and returns URL as the homepage URL. Generally https://gus.test/?s=test
	 * But with headstartwp nextjs app tipically there is a route for search page.
	 * Default is 'search'.
	 *
	 * @param string $canonical The canonical URL.
	 * @return string
	 */
	public function override_search_canonical( $canonical ) {
		if ( $this->get_yoast_search_query_vars() ) {
				$canonical .= apply_filters( 'tenup_headless_wp_search_route', 'search' );
		}
		return $canonical;
	}
}
