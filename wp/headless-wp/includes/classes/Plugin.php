<?php
/**
 *  HeadlessWP Plugin Class
 *
 * @package HeadlessWP
 */

namespace HeadlessWP;

class Plugin {

	/**
	 * Set up any hooks
	 */
	public function register() {
		add_action( 'admin_init', [ $this, 'register_settings' ] );
		add_action( 'admin_notices', [ $this, 'maybe_output_setting_notification' ] );
		add_action( 'admin_menu', [ $this, 'clean_up_menus' ] );
		add_action( 'admin_bar_menu', [ $this, 'clean_up_toolbar' ], 999 );

		add_action( 'init', [ $this, 'i18n' ] );

		$links = new Links();
		$links->register();

		$rest_api = new API();
		$rest_api->register();

		$preview = new Preview\PreviewLink();
		$preview->register();
	}

	/**
	 * Clean up admin toolbar
	 *
	 * @param object $wp_admin_bar Admin bar object
	 */
	public function clean_up_toolbar( $wp_admin_bar ) {
		$wp_admin_bar->remove_node( 'comments' );
	}

	/**
	 * Clean up admin menus
	 */
	public function clean_up_menus() {
		remove_submenu_page( 'options-general.php', 'options-permalink.php' );
		remove_submenu_page( 'options-general.php', 'options-discussion.php' );
		remove_submenu_page( 'themes.php', 'customize.php?return=%2Fwp-admin%2Foptions-reading.php' );
		remove_menu_page( 'edit-comments.php' );
	}

	/**
	 * Registers the default textdomain.
	 *
	 * @return void
	 */
	public function i18n() {
		$locale = apply_filters( 'plugin_locale', get_locale(), 'headless-wp' );
		load_textdomain( 'headless-wp', WP_LANG_DIR . '/headless-wp/headless-wp-' . $locale . '.mo' );
		load_plugin_textdomain( 'headless-wp', false, plugin_basename( HEADLESS_WP_PLUGIN_PATH ) . '/languages/' );
	}


	/**
	 * Registers settings fields
	 */
	public function register_settings() {

		// Headless frontend site URL
		register_setting(
			'general',
			'site_react_url',
			array( 'sanitize_callback' => 'esc_url_raw' )
		);

		// Register the settings
		add_settings_field(
			'site_react_url',
			esc_html__( 'Headless Frontend URL', 'headless-wp' ),
			function() { ?>
				<input
					type = "url"
					placeholder = "https://"
					name = "site_react_url"
					id = "site_react_url"
					class = "regular-text"
					value = "<?php echo esc_url( $this->get_react_url() ); ?>"
				>
				<p class="description"><?php esc_html_e( 'Enter the URL for the headless front-end. All links will point to this address.', 'headless-wp' ); ?></p>
				<?php
			},
			'general'
		);

		// Redirect frontend to React website
		register_setting(
			'general',
			'site_react_redirect',
			array( 'sanitize_callback' => 'intval' )
		);

		$value = $this->should_frontend_redirect();

		// Register the settings
		add_settings_field(
			'site_react_redirect',
			esc_html__( 'Redirect to Headless Site?', 'headless-wp' ),
			function () use ( $value ) {
				?>
				<input
					type = "checkbox"
					name = "site_react_redirect"
					id = "site_react_redirect"
					value = "1"
					<?php checked( $value, 1, true ); ?>
				>
				<p class="description">
					<?php esc_html_e( 'Should the front-end of the website automatically redirect to the React website?', 'headless-wp' ); ?><br />
					<?php esc_html_e( '(/wp-json and /wp-admin requests excluded)', 'headless-wp' ); ?><br />
					</p>
				<?php
			},
			'general'
		);

		return;
	}

	/**
	 * Check the option for redirecting the frontend.
	 *
	 * This is toggled 'on' by default, so only a value of 0 will indicate a redireect. Otherwise, empty is to redirect
	 */
	public static function should_frontend_redirect() {
		$value = get_option( 'site_react_redirect' );

		return '0' !== $value;
	}

	/**
	 * Retrieves the site React URL
	 */
	public static function get_react_url() {

		$site_react_url = get_option( 'site_react_url' );

		return $site_react_url;

	}

	/**
	 * Checks to see if the front-end react URL setting has been set and if not, prompt the user to fill it in
	 */
	public function maybe_output_setting_notification() {
		$react_url = self::get_react_url();

		if ( ! empty( trim( $react_url ) ) ) {
			return;
		}

		$setting_url     = admin_url( 'options-general.php#site_react_url' );
		$settings_string = '<strong>Notice:</strong> Headless Site Address Setting Not Entered. | <a href="' . esc_url( $setting_url ) . '">Fix setting</a>';
		$message         = __( $settings_string, 'headless-wp' );

		printf( '<div class="notice notice-warning"><p>%1$s</p></div>', wp_kses_post( $message ) );

		return;

	}

}
