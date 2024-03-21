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
		add_filter( 'wpseo_stylesheet_url', [ $this, 'override_wpseo_stylesheet_url' ] );

		// Override url in sitemap at root/index.
		add_filter( 'wpseo_sitemap_index_links', [ $this, 'maybe_override_sitemap_index_links' ] );

		// Override url in sitemap for posts, pages, taxonomy archives, authors etc.
		add_filter( 'wpseo_sitemap_url', [ $this, 'maybe_override_sitemap_url' ], 10, 1 );

		add_filter( 'robots_txt', [ $this, 'maybe_override_sitemap_robots_url' ], 999999 );

		// Override Search results yoast head, get_head endpoint currently does't detect search page.
		add_filter( 'wpseo_canonical', [ $this, 'override_search_canonical' ], 10, 1 );
		add_filter( 'wpseo_title', [ $this, 'override_search_title' ], 10, 1 );
		add_filter( 'wpseo_opengraph_title', [ $this, 'override_search_title' ], 10, 1 );
		add_filter( 'wpseo_opengraph_url', [ $this, 'override_search_canonical' ], 10, 1 );

		// Introduce hereflangs presenter to Yoast list of presenters.
		add_action( 'rest_api_init', [ $this, 'wpseo_rest_api_hreflang_presenter' ], 10, 0 );

		// Modify API response to optimise payload by removing the yoast_head and yoast_json_head where not needed.
		// Embedded data is not added yet on rest_prepare_{$this->post_type}.
		add_filter( 'rest_pre_echo_response' , [ $this, 'optimise_yoast_payload' ], 10, 3 );
	}

	/**
	 * Optimises the Yoast SEO payload in REST API responses.
	 *
	 * This method modifies the API response to reduce the payload size by removing
	 * the 'yoast_head' and 'yoast_json_head' fields from the response when they are
	 * not needed for the nextjs app.
	 * See https://github.com/10up/headstartwp/issues/563
	 *
	 * @param array           $result The response data to be served, typically an array.
	 * @param \WP_REST_Server  $server Server instance.
	 * @param \WP_REST_Request $request Request used to generate the response.
	 *
	 * @return array Modified response data.
	 */
	public function optimise_yoast_payload( $result, $server, $request ) {

		$embed  = isset( $_GET['_embed'] ) ? rest_parse_embed_param( $_GET['_embed'] ) : false;

		if ( ! $embed ) {
			return $result;
		}

		$first_post = true;

		foreach ( $result as &$post_obj ) {

			if ( ! empty( $post_obj['_embedded']['wp:term'] ) ) {
				$this->optimise_yoast_payload_for_taxonomy( $post_obj['_embedded']['wp:term'], $request, $first_post );
			}

			if ( ! empty( $post_obj['_embedded']['author'] ) ) {
				$this->optimise_yoast_payload_for_author( $post_obj['_embedded']['author'], $request, $first_post );
			}

			if ( ! $first_post ) {
				unset( $post_obj['yoast_head'], $post_obj['yoast_head_json'] );
			}

			$first_post = false;
		}

		unset( $post_obj );

		return $result;
	}

	/**
	 * Optimises the Yoast SEO payload for taxonomies.
	 * Removes yoast head from _embed terms for any term that is not in the queried params.
	 * Logic runs for the first post, yoast head metadata is removed completely for other posts.
	 *
	 * @param array            $taxonomy_groups The _embedded wp:term collections.
	 * @param \WP_REST_Request $request         Request used to generate the response.
	 * @param boolean          $first_post      Whether this is the first post in the response.
	 *
	 * @return void
	 */
	protected function optimise_yoast_payload_for_taxonomy( &$taxonomy_groups, $request, $first_post ) {

		foreach ( $taxonomy_groups as &$taxonomy_group ) {

			foreach ( $taxonomy_group as &$term_obj ) {

				$param = null;

				if ( $first_post ) {
					// Get the queried terms for the taxonomy.
					$param = $term_obj['taxonomy'] === 'category' ?
						$request->get_param('category') ?? $request->get_param('categories') :
						$request->get_param( $term_obj['taxonomy']  );
				}

				if ( $first_post && ! empty( $param ) ) {
					$param = is_array( $param ) ? $param : explode( ',', $param );

					// If the term slug is not in param array, unset yoast heads.
					if ( ! in_array( $term_obj['slug'], $param, true ) && ! in_array( $term_obj['id'], $param, true ) ) {
						unset( $term_obj['yoast_head'], $term_obj['yoast_head_json'] );
					}
				} else {
					unset( $term_obj['yoast_head'], $term_obj['yoast_head_json'] );
				}
			}

			unset( $term_obj );
		}

		unset( $taxonomy_group );
	}

	/**
	 * Optimises the Yoast SEO payload for author.
	 * Removes yoast head from _embed author for any author that is not in the queried params.
	 * Logic runs for the first post, yoast head metadata is removed completely for other posts.
	 *
	 * @param array            $authors     The _embedded author collections.
	 * @param \WP_REST_Request $request     Request used to generate the response.
	 * @param boolean          $first_post  Whether this is the first post in the response.
	 *
	 * @return void
	 */
	protected function optimise_yoast_payload_for_author( &$authors, $request, $first_post ) {

		foreach ( $authors as &$author ) {

			$param = $first_post ? $request->get_param( 'author' ) : null;

			if ( $first_post && ! empty( $param ) ) {
				$param = is_array( $param ) ? $param : explode( ',', $param );

				// If the term slug is not in param array, unset yoast heads.
				if ( ! in_array( $author['slug'], $param, true ) && ! in_array( $author['id'], $param, true )  ) {
					unset( $author['yoast_head'], $author['yoast_head_json'] );
				}
			} else {
				unset( $author['yoast_head'], $author['yoast_head_json'] );
			}
		}

		unset( $author );
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
	public function maybe_override_sitemap_index_links( array $links ): array {
		if ( ! $this->should_rewrite_urls() ) {
			return $links;
		}

		return array_map(
			function ( $link ) {
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
	 * @return string       Modified XML markup for url for the given link in sitemap.
	 */
	public function maybe_override_sitemap_url( string $xml ): string {
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

		$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? esc_url( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : ''; // phpcs:ignore

		if ( false === strpos( $request_uri, '/yoast/v1/get_head' ) ) {
			return false;
		}

		$url_param = isset( $_GET['url'] ) ? esc_url( wp_unslash( $_GET['url'] ) ) : ''; // phpcs:ignore

		if ( filter_var( $url_param, FILTER_VALIDATE_URL ) !== false ) {
			$query = wp_parse_url( $url_param, PHP_URL_QUERY );
			parse_str( $query, $query_vars );

			// Return query vars if search request.
			if ( isset( $query_vars['s'] ) ) {
				// Get page number into the query vars to build the title.
				preg_match( '/\/page\/(\d+)/', $url_param, $matches );
				if ( ! empty( $matches ) ) {
					$query_vars['page'] = (int) $matches[1];
				}

				return apply_filters( 'tenup_headless_wp_search_request_query_vars', $query_vars );
			}
		}

		return false;
	}

	/**
	 * Custom helper to replace Yoast search title placeholders.
	 * Assuming only some of the basic variables.
	 *
	 * @param string $title The search SEO title
	 * @param array  $query_vars The search query vars.
	 *
	 * @return string
	 */
	public function replace_yoast_search_title_placeholders( $title, $query_vars ) {
		$separator = \YoastSEO()->helpers->options->get_title_separator();

		$str_replace_mapping = apply_filters(
			'tenup_headless_wp_search_title_variables_replacments',
			[
				'%%sitename%%'     => get_bloginfo( 'name' ),
				'%%searchphrase%%' => $query_vars['s'] ?? '',
				'%%page%%'         => ! empty( $query_vars['page'] ) ? sprintf( '%s %d', __( 'Page', 'headless-wp' ), $query_vars['page'] ) : '',
				'%%sep%%'          => $separator ?? ' ',
			]
		);

		$title = str_replace( array_keys( $str_replace_mapping ), array_values( $str_replace_mapping ), $title );

		// Cleanup extra separators from possible missing values, we don't want to end up with 'You searched for - - - - '.
		$escaped_sep = preg_quote( $separator, '/' );
		$pattern     = '/\s*' . $escaped_sep . '\s*' . $escaped_sep . '+/';

		return preg_replace( $pattern, ' ' . $separator, $title );
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
	 * Yoast doesn't  have a canonical for search and returns URL as the homepage URL. Generally https://gus.test/?s=test
	 * But with headstartwp nextjs app usually there is a route for search page.
	 * Default is 'search'.
	 *
	 * @param string $canonical The canonical URL.
	 * @return string
	 */
	public function override_search_canonical( $canonical ) {
		if ( $this->get_yoast_search_query_vars() ) {
			$search_route = apply_filters( 'tenup_headless_wp_search_route', 'search' );
			$canonical    = rtrim( $canonical, '/' ) . '/' . $search_route;
		}

		return $canonical;
	}

	/**
	 * Register custom presenter to handle hreflang tags in Yoast REST response.
	 * Called on rest_api_init
	 *
	 * Polylang adds hreflang tags by hooking into wp_head which only runs on the front end on a
	 * traditional WordPress setup.
	 *
	 * @return array
	 */
	public function wpseo_rest_api_hreflang_presenter() {

		$enable_hreflang = apply_filters( 'tenup_headless_wp_enable_hreflangs', true );

		if ( ! $enable_hreflang ) {
			return;
		}

		add_filter(
			'wpseo_frontend_presenters',
			function ( $presenters ) {
				if ( ! class_exists( '\HeadlessWP\Integrations\Polylang\PolylangYoastPresenter' ) ) {
					return $presenters;
				}

				$presenters[] = new \HeadlessWP\Integrations\Polylang\PolylangYoastPresenter();

				return $presenters;
			}
		);
	}
}
