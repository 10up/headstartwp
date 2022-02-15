<?php
namespace HeadlessWP\Preview;

class PreviewLink {

	/**
	 * Set up any hooks
	 */
	public function register() {
		add_filter( 'template_include', [ $this, 'handle_preview'], 20 );

	}

	public function handle_preview( $template ) {
		if ( is_preview() && is_user_logged_in() && current_user_can( 'edit_post', get_the_ID() ) ) {
			return HEADLESS_WP_PLUGIN_PATH . '/includes/classes/Preview/preview.php';
		}

		return $template;
	}
}
