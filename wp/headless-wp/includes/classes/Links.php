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
			add_action( 'init', array( $this, 'hook_home_url_filter' ) );
			add_action( 'rest_api_init', array( $this, 'hook_home_url_filter' ) );
			add_action( 'admin_init', array( $this, 'hook_home_url_filter' ) );
		}

		add_filter( 'post_link', array( $this, 'maybe_prepend_posts' ), 10, 3 );
		add_filter( 'term_link', array( $this, 'maybe_prepend_posts' ), 10, 3 );
		add_filter( 'rewrite_rules_array', array( $this, 'create_taxonomy_rewrites' ) );
		add_filter( 'preview_post_link', array( $this, 'get_preview_link' ) );
		add_filter( 'rest_api_init', array( $this, 'add_preview_link_to_public_post_type_rest_responses' ) );

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

			// Posts resolve to /posts in the front-end
			if ( 'post' === $post_type ) {
				$post_slug = 'posts';
			}

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
	 * Prepends '/posts' to the default post post type
	 *
	 * @param $link - String of link
	 * @param $post - WP_Post object to prepend to link
	 * @param $test - true/false
	 */
	public function maybe_prepend_posts( $link, $post, $test ) {

		if ( empty( $link ) || ( \is_a( $post, 'WP_Post' ) && 'publish' !== $post->post_status ) ) {
			return $link;
		}

		if ( 'post' === $post->post_type || \is_a( $post, 'WP_Term' ) ) {
			$home_url = get_home_url();
			$link     = str_ireplace( $home_url, $home_url . '/posts', $link );
		}

		return $link;
	}

	/**
	 * To prevent loops, only apply the filter if the home_url filter has not yet already been set
	 */
	public function hook_home_url_filter() {
		if ( ! has_filter( 'home_url', array( $this, 'filter_home_url' ) ) ) {
			add_filter( 'home_url', array( $this, 'filter_home_url' ), 10, 3 );
		}

		return;
	}

	/**
	 * Replace WordPress URLs with React URLs (if React URL set)
	 *
	 * @param string $home_url
	 * @param string $path
	 * @param string $orig_scheme
	 * @return string
	 */
	public function filter_home_url( $home_url, $path, $orig_scheme ) {

		global $wp;

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

		if ( is_admin() ) {
			return;
		}

		if ( ! empty( $site_url = \get_option( 'site_react_url' ) ) &&
			 true === Plugin::should_frontend_redirect() ) {

				$url_request = $wp->request;

				// Redirect the frontend WordPress request to the React website URL.
				\wp_redirect( trailingslashit( esc_url_raw( $site_url ) ) . $url_request, 301 );
		}

		return;
	}

	/**
	 * Provides a post type's slug in REST.
	 *
	 * @param object $post_type_object The post type object.
	 * @return string.
	 */
	public function get_post_type_object_rest_slug( $post_type_object ) {
		return empty( $post_type_object->rest_base ) ? $post_type_object->name : $post_type_object->rest_base;
	}

	/**
	 * Overrides the preview link URL to one following the Next.js route pattern.
	 *
	 * @param string  $link The unfiltered link.
	 * @param WP_Post $preview_post The current post.
	 * @param bool    $draft Whether the post is a draft.
	 * @return string Preview link.
	 *
	 * @filter preview_post_link in wp-includes/link-template.php.
	 */
	public function get_preview_link( $link, $preview_post = null, $draft = false ) {

		if ( is_null( $preview_post ) ) {
			$preview_post = get_post( get_the_ID() );
		}

		if ( ! is_a( $preview_post, WP_Post::class ) ) {
			return $link;
		}

		$revision_post_type_object = null;

		if ( wp_is_post_autosave( $preview_post->ID ) || wp_is_post_revision( $preview_post->ID ) ) {
			$revision_post_type_object = get_post_type_object( get_post_type( $preview_post->ID ) );
			$post_type_object          = get_post_type_object( get_post_type( $preview_post->post_parent ) );
		} else {
			$post_type_object = get_post_type_object( get_post_type( $preview_post->ID ) );
		}

		$revision_subpath = is_null( $revision_post_type_object )
			? ''
			: sprintf(
				'%s/%d/',
				$this->get_post_type_object_rest_slug( $revision_post_type_object ),
				intval( $preview_post->ID )
			);

		return sprintf(
			'%sapi/preview?post_type=%s&id=%d&token=%s',
			trailingslashit( Plugin::get_react_url() ),
			$this->get_post_type_object_rest_slug( $post_type_object ),
			intval( is_null( $revision_post_type_object ) ? $preview_post->ID : $preview_post->post_parent ),
			wp_create_nonce( 'wp_rest' )
		);
	}

	/**
	 * Adds a filter to each public post type's REST response to include a preview_link in the response.
	 *
	 * @return void
	 */
	public function add_preview_link_to_public_post_type_rest_responses() {
		$get_post_type_args = array(
			'public'       => true,
			'show_in_rest' => true,
		);

		foreach ( get_post_types( $get_post_type_args ) as $post_type ) {
			add_filter( sprintf( 'rest_prepare_%s', $post_type ), array( $this, 'add_preview_link_to_rest_response' ), 10, 2 );
		}
	}

	/**
	 * Adds a Next.js-style preview link to the REST response for an unsaved draft post.
	 *
	 * When generating the preview link for an unsaved draft post, the Gutenberg JS first checks for `preview_link` in
	 * the post's REST data and falls back to the `?p=56&preview=true`-style link, which won't work in the React
	 * application because it doesn't include a nonce.

	 * @see https://github.com/WordPress/gutenberg/blob/master/packages/editor/src/store/reducer.js#L762-L770
	 *
	 * @param WP_REST_Response $response Unfiltered REST response.
	 * @param WP_Post          $post The post.
	 * @return WP_REST_Response The filtered REST response.
	 *
	 * @filter rest_prepare_post
	 */
	public function add_preview_link_to_rest_response( $response, $post ) {
		if ( ! isset( $response->data['preview_link'] ) ) {
			$response->data['preview_link'] = $this->get_preview_link( '', $post, true );
		}

		return $response;
	}

}
