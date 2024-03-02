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
		add_filter( 'get_post_status', [ $this, 'force_drafts_to_have_permalinks' ], 10, 2 );
	}

	/**
	 * Force drafts to have permalinks
	 *
	 * @param string   $post_status The post's permalink.
	 * @param \WP_Post $post        The post in question.
	 *
	 * @return string
	 */
	public function force_drafts_to_have_permalinks( string $post_status, \WP_Post $post ) : string {
		// If this isn't a rest request do nothing
		if ( ! ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
			return $post_status;
		}

		if ( 'draft' !== $post_status ) {
			return $post_status;
		}

		try {
			$payload = PreviewToken::get_payload_from_token();

			if ( ! $payload ) {
				return $post_status;
			}

			if ( 'preview' === $payload->type && $post->ID === $payload->post_id ) {
				return 'publish';
			}
			return $post_status;
		} catch ( \Exception $e ) {
			return $post_status;
		}
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
