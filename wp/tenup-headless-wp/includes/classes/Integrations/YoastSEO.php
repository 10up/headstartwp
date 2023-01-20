<?php
/**
 * HeadlessWP YoastSEO Class
 *
 * @package HeadlessWP
 */
namespace HeadlessWP\Integrations;

use HeadlessWP\Plugin;

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
		if ( ! $this->should_rewrite_urls()) {
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
					home_url( '', wp_parse_url( get_option( 'home' ), PHP_URL_SCHEME ) ),
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
}
