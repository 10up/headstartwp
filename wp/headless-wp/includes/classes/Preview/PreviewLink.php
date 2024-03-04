<?php
/**
 * Preview Link Class
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Preview;

/**
 * Preview Link Class
 */
class PreviewLink {

	/**
	 * Set up any hooks
	 */
	public function register() {
		add_filter( 'template_include', [ $this, 'handle_preview' ], 20 );

		add_filter( 'post_link', [ $this, 'force_posts_drafts_to_have_permalinks' ], 10, 2 );
		add_filter( 'post_permalink', [ $this, 'force_cpts_drafts_to_have_permalinks' ], 10, 2 );
		add_action( 'page_link', [ $this, 'force_page_drafts_to_have_permalinks' ], 10, 2 );
	}

	/**
	 * Force drafts to have permalinks
	 *
	 * @param string   $permalink   The post's permalink.
	 * @param \WP_Post $post        The post in question.
	 *
	 * @return string
	 */
	protected function force_drafts_to_have_permalinks( string $permalink, \WP_Post $post ) : string {
		// If this isn't a rest request do nothing
		if ( ! ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
			return $permalink;
		}

		if ( 'draft' !== $post->post_status ) {
			return $permalink;
		}

		try {
			$payload = PreviewToken::get_payload_from_token();

			if ( ! $payload ) {
				return $permalink;
			}

			if ( 'preview' === $payload->type && $post->ID === $payload->post_id ) {
				if( ! function_exists( 'get_sample_permalink' ) ) {
					include_once( ABSPATH . 'wp-admin/includes/post.php' );
				}

				[$permastruct, $post_name] = \get_sample_permalink( $post->ID );
				$link =  str_replace( '%postname%', $post_name, $permastruct );
				$link =  str_replace( '%pagename%', $post_name, $permastruct );

				return $link;
			}

			return $permalink;
		} catch ( \Exception $e ) {
			return $permalink;
		}
	}

	/**
	 * Force posts drafts to have permalinks
	 *
	 * @param string   $permalink   The post's permalink.
	 * @param \WP_Post $post        The post in question.
	 *
	 * @return string
	 */
	public function force_posts_drafts_to_have_permalinks( string $permalink, \WP_Post $post ) : string {
		remove_filter( 'post_link', [ $this, 'force_posts_drafts_to_have_permalinks' ], 10, 2 );
		$link = $this->force_drafts_to_have_permalinks( $permalink, $post );
		add_filter( 'post_link', [ $this, 'force_posts_drafts_to_have_permalinks' ], 10, 2 );

		return $link;
	}

	/**
	 * Force cpts drafts to have permalinks
	 *
	 * @param string   $permalink   The post's permalink.
	 * @param \WP_Post $post        The post in question.
	 *
	 * @return string
	 */
	public function force_cpts_drafts_to_have_permalinks( string $permalink, \WP_Post $post ) : string {
		remove_filter( 'post_permalink', [ $this, 'force_cpts_drafts_to_have_permalinks' ], 10, 2 );
		$link = $this->force_drafts_to_have_permalinks( $permalink, $post );
		add_filter( 'post_permalink', [ $this, 'force_cpts_drafts_to_have_permalinks' ], 10, 2 );

		return $link;
	}

	/**
	 * Force page drafts to have permalinks
	 *
	 * @param string	$permalink   The post's permalink.
	 * @param int		$page_id     The page_id
	 *
	 * @return string
	 */
	public function force_page_drafts_to_have_permalinks( string $permalink, int $page_id ) : string {
		remove_filter( 'page_link', [ $this, 'force_page_drafts_to_have_permalinks' ], 10, 2 );
		$link = $this->force_drafts_to_have_permalinks( $permalink, get_post( $page_id ) );
		add_filter( 'page_link', [ $this, 'force_page_drafts_to_have_permalinks' ], 10, 2 );

		return $link;
	}

	/**
	 * Method to check if previews are to be handled
	 *
	 * @return boolean
	 */
	public function should_handle_preview() {
		/**
		 * Whether the plugin should handle previews or not
		 */
		return apply_filters( 'tenup_headless_wp_previews_enabled', true );
	}

	/**
	 * Method for handling preview
	 *
	 * @param string $template The template path
	 * @return string
	 */
	public function handle_preview( $template ) {
		if ( $this->should_handle_preview() && is_preview() && is_user_logged_in() && current_user_can( 'edit_post', get_the_ID() ) ) {
			return HEADLESS_WP_PLUGIN_PATH . '/includes/classes/Preview/preview.php';
		}

		return $template;
	}
}
