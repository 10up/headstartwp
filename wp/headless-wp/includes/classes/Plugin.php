<?php
/**
 *  HeadlessWP Plugin Class
 *
 * @package HeadlessWP
 */

namespace HeadlessWP;

use HeadlessWP\CacheFlush\CacheFlush;
use HeadlessWP\Integrations\Gutenberg;
use HeadlessWP\Integrations\YoastSEO;

/**
 * Main plugin class
 */
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

		$cache_flush = new CacheFlush();
		$cache_flush->register();

		$feed = new Feed();
		$feed->register();

		// Integrations
		$yoast_seo = new YoastSEO();
		$yoast_seo->register();

		$gutenberg = new Gutenberg();
		$gutenberg->register();

		$search = new Search\Search();
		$search->register();

		$redirect = new Redirect();
		$redirect->register();
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
			[ 'sanitize_callback' => 'esc_url_raw' ]
		);

		// Register the settings
		add_settings_field(
			'site_react_url',
			esc_html__( 'Headless Frontend URL', 'headless-wp' ),
			function () { ?>
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

		register_setting(
			'general',
			'headless_site_locale',
			[ 'sanitize_callback' => 'esc_attr' ]
		);

		add_settings_field(
			'headless_site_locale',
			esc_html__( 'Headless Multisite Locale (optional)', 'headless-wp' ),
			function () {
				?>
				<input
					type="text"
					name="headless_site_locale"
					id="headless_site_locale"
					class="regular-text"
					value="<?php echo esc_attr( $this->get_site_locale() ); ?>"
				>
				<p class="description"><?php esc_html_e( 'Set the site locale if this site is using Multisite with locale.', 'headless-wp' ); ?></p>
				<?php
			},
			'general'
		);

		// Redirect frontend to React website
		register_setting(
			'general',
			'site_react_redirect',
			[ 'sanitize_callback' => 'intval' ]
		);

		// Register the settings
		add_settings_field(
			'site_react_redirect',
			esc_html__( 'Redirect to Headless Site?', 'headless-wp' ),
			function () {
				?>
				<input
					type="checkbox"
					name="site_react_redirect"
					id="site_react_redirect"
					value="1"
					<?php checked( $this->should_frontend_redirect(), 1, true ); ?>
				>
				<p class="description">
					<?php esc_html_e( 'Should the front-end of the website automatically redirect to the React website?', 'headless-wp' ); ?><br />
					<?php esc_html_e( '(/wp-json and /wp-admin requests excluded)', 'headless-wp' ); ?><br />
					</p>
				<?php
			},
			'general'
		);

		register_setting(
			'general',
			'headless_isr_revalidate',
			[ 'sanitize_callback' => 'intval' ]
		);

		add_settings_field(
			'headless_isr_revalidate',
			esc_html__( 'Revalidate Static Pages?', 'headless-wp' ),
			function () {
				?>
				<input
					type="checkbox"
					name="headless_isr_revalidate"
					id="headless_isr_revalidate"
					value="1"
					<?php checked( $this->should_revalidate_isr(), 1, true ); ?>
				>
				<p class="description">
					<?php esc_html_e( 'Should the WordPress automatically revalidate static pages?', 'headless-wp' ); ?><br />
					</p>
				<?php
			},
			'general'
		);
	}

	/**
	 * Check the option for redirecting the frontend.
	 *
	 * This is toggled 'on' by default, so only a value of 0 will indicate a redirect. Otherwise, empty is to redirect
	 */
	public static function should_frontend_redirect() {
		$value = get_option( 'site_react_redirect' );

		return '0' !== $value;
	}

	/**
	 * Check the option for revalidating static pages
	 *
	 * This is toggled 'on' by default, so only a value of 0 will indicate a redirect. Otherwise, empty is to redirect
	 */
	public static function should_revalidate_isr() {
		$value = get_option( 'headless_isr_revalidate', '0' );

		return '0' !== $value;
	}

	/**
	 * Retrieves the site React URL
	 */
	public static function get_react_url() {
		return get_option( 'site_react_url' );
	}

	/**
	 * Retrieves the site React URL
	 */
	public static function get_site_locale() {
		return get_option( 'headless_site_locale' );
	}

	/**
	 * Returns the non-localized site url.
	 *
	 * @return string
	 */
	public static function get_non_localized_headless_url() {
		$site_url = untrailingslashit( self::get_react_url() );
		$locale   = self::get_site_locale();

		if ( $locale && str_ends_with( $site_url, $locale ) ) {
			$parsed_url = wp_parse_url( $site_url );
			$path       = explode( '/', $parsed_url['path'] );
			if ( is_array( $path ) && count( $path ) > 0 ) {
				unset( $path[ count( $path ) - 1 ] );
			}

			$base_url = sprintf(
				'%s://%s',
				$parsed_url['scheme'],
				$parsed_url['host']
			);

			if ( isset( $parsed_url['port'] ) ) {
				$base_url = sprintf( '%s:%s', $base_url, $parsed_url['port'] );
			}

			return untrailingslashit(
				sprintf(
					'%s%s',
					$base_url,
					implode( '/', $path )
				)
			);
		}

		return $site_url;
	}

	/**
	 * Checks to see if the front-end react URL setting has been set and if not, prompt the user to fill it in
	 */
	public function maybe_output_setting_notification() {
		$react_url = self::get_react_url();

		if ( ! empty( trim( $react_url ) ) ) {
			return;
		}

		printf(
			'<div class="notice notice-warning"><p><strong>%s:</strong> %s <a href="%s">%s</a></p></div>',
			esc_html__( 'Notice', 'headless-wp' ),
			esc_html__( 'Headless Site Address is not entered.', 'headless-wp' ),
			esc_url( admin_url( 'options-general.php#site_react_url' ) ),
			esc_html__( 'Fix the setting.', 'headless-wp' )
		);
	}
}
