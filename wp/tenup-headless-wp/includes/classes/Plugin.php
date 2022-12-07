<?php
/**
 *  HeadlessWP Plugin Class
 *
 * @package HeadlessWP
 */

namespace HeadlessWP;

use DOMDocument;
use HeadlessWP\CacheFlush\CacheFlush;

/**
 * Nain plugin class
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
		add_filter( 'render_block', [ $this, 'render_block' ], 10, 3 );

		$links = new Links();
		$links->register();

		$rest_api = new API();
		$rest_api->register();

		$preview = new Preview\PreviewLink();
		$preview->register();

		$cache_flush = new CacheFlush();
		$cache_flush->register();
	}

	/**
	 * Filter rendered blocks to include a data-wp-blocks attribute with block's attrs
	 *
	 * @param string    $html Rendered block content.
	 * @param array     $block Block data.
	 * @param \WP_Block $block_instance The block's instance
	 *
	 * @return string
	 */
	public function render_block( $html, $block, $block_instance ) {
		if ( ! trim( $html ) ) {
			return $html;
		}

		libxml_use_internal_errors( true );
		$doc = new DomDocument( '1.0', 'UTF-8' );
		$doc->loadHTML( mb_convert_encoding( $html, 'HTML-ENTITIES', 'UTF-8' ), LIBXML_HTML_NODEFDTD | LIBXML_HTML_NOIMPLIED );

		$root_node = $doc->documentElement; // phpcs:ignore

		if ( is_null( $root_node ) ) {
			return $html;
		}

		$block_attrs = $block_instance->attributes;

		/**
		 * Filter's out the block's attributes before serializing in the block markup.
		 *
		 * @param array $attrs The Block's Attributes
		 * @param array $block The Block's schema
		 * @param \WP_Block $block_instance The block's instance
		 */
		$block_attrs = apply_filters( 'tenup_headless_wp_render_block_attrs', $block_attrs, $block, $block_instance );

		$attrs             = $doc->createAttribute( 'data-wp-block' );
		$attrs->value      = wp_json_encode( $block_attrs );
		$block_name        = $doc->createAttribute( 'data-wp-block-name' );
		$block_name->value = $block['blockName'];

		$root_node->appendChild( $attrs );
		$root_node->appendChild( $block_name );

		/**
		 * Filter the block's DOMElement before rendering
		 *
		 * @param \DOMElement $root_node
		 * @param string $html The original block markup
		 * @param array $block The Block's schema
		 * @param \WP_Block $block_instance The block's instance
		 */
		$root_node = apply_filters( 'tenup_headless_wp_render_block_markup', $root_node, $html, $block, $block_instance );

		return $doc->saveHTML();
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
			array( 'sanitize_callback' => 'intval' )
		);

		add_settings_field(
			'headless_isr_revalidate',
			esc_html__( 'Revalidade Static Pages?', 'headless-wp' ),
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
	 * This is toggled 'on' by default, so only a value of 0 will indicate a redireect. Otherwise, empty is to redirect
	 */
	public static function should_frontend_redirect() {
		$value = get_option( 'site_react_redirect' );

		return '0' !== $value;
	}

	/**
	 * Check the option for revalidating static pages
	 *
	 * This is toggled 'on' by default, so only a value of 0 will indicate a redireect. Otherwise, empty is to redirect
	 */
	public static function should_revalidate_isr() {
		$value = get_option( 'headless_isr_revalidate', '0' );

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

		$setting_url = admin_url( 'options-general.php#site_react_url' );
		$message     = sprintf( __( '<strong>Notice:</strong> Headless Site Address Setting Not Entered. | <a href="%s">Fix setting</a>', 'headless-wp' ), esc_url( $setting_url ) );

		printf( '<div class="notice notice-warning"><p>%1$s</p></div>', wp_kses_post( $message ) );
	}

}
