<?php
namespace HeadlessWP\Preview;

use HeadlessWP\Plugin;

class PreviewLink {

	protected $token = null;

	/**
	 * Set up any hooks
	 */
	public function register() {
		// add_filter( 'preview_post_link', array( $this, 'get_preview_link' ), 10, 2 );
		add_filter( 'template_include', [ $this, 'handle_preview'], 20 );

	}

	public function handle_preview( $template ) {
		if ( is_preview() && is_user_logged_in() && current_user_can( 'edit_post', get_the_ID() ) ) {
			return HEADLESS_WP_PLUGIN_PATH . '/includes/classes/Preview/preview.php';
		}

		return $template;
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

		if ( ! is_a( $preview_post, \WP_Post::class ) ) {
			return $link;
		}

		$is_revision = false;
		$post_id     = $preview_post->ID;
		$post_type   = get_post_type( $preview_post->ID );

		if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			$is_revision = true;
		}

		if ( is_null( $this->token ) ) {
			$this->token = PreviewToken::generate(
				array(
				  'type'      => 'preview',
				  'post_type' => $post_type,
				  'post_id'   => $post_id,
				)
			);

		}

		return sprintf(
			'%sapi/preview?post_id=%d&post_type=%s&is_revision=%s&token=%s',
			trailingslashit( Plugin::get_react_url() ),
			$post_id,
			$post_type,
			$is_revision ? '1' : '0',
			$this->token
		);
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
