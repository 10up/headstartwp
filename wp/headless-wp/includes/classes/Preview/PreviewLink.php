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
	public function register(): void {
		add_filter( 'template_include', [ $this, 'handle_preview' ], 20 );
	}

	/**
	 * Method to check if previews are to be handled
	 */
	public function should_handle_preview(): bool {
		/**
		 * Whether the plugin should handle previews or not
		 */
		return apply_filters( 'tenup_headless_wp_previews_enabled', true );
	}

	/**
	 * Method for handling preview
	 *
	 * @param string $template The template path.
	 */
	public function handle_preview( string $template ): string {
		if ( $this->should_handle_preview() && is_preview() && is_user_logged_in() && current_user_can( 'edit_post', get_the_ID() ) ) {
			return HEADLESS_WP_PLUGIN_PATH . '/includes/classes/Preview/preview.php';
		}

		return $template;
	}
}
