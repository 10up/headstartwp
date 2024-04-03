<?php
/**
 * A helper class for writing Polylang Unit tests
 *
 * @package HeadlessWP\Tests\Inc
 */

namespace HeadlessWP\Tests\Inc;

use WP_UnitTestCase;

/**
 * The PLLUnitTestCase Class
 *
 * @package HeadlessWP\Tests\Inc
 */
class PLLUnitTestCase extends WP_UnitTestCase {

	/**
	 * Holds a reference to polylang
	 *
	 * @var mixed
	 */
	protected static $polylang;

	/**
	 * Sets up the test class
	 */
	public static function setUpBeforeClass(): void {
		parent::setUpBeforeClass();
		self::$polylang = new \stdClass();

		self::$polylang->options                 = \PLL_Install::get_default_options();
		self::$polylang->options['hide_default'] = 0; // Force option to pre 2.1.5 value otherwise phpunit tests break on Travis
		self::$polylang->model                   = new \PLL_Admin_Model( self::$polylang->options );
		self::$polylang->links_model             = self::$polylang->model->get_links_model(); // We always need a links model due to PLL_Language::set_home_url()

		$_SERVER['SCRIPT_FILENAME'] = '/index.php'; // To pass the test in PLL_Choose_Lang::init() by default

		require_once POLYLANG_DIR . '/include/api.php';
		$GLOBALS['polylang'] = &self::$polylang;
	}

	/**
	 * Clears up the test class
	 */
	public static function wpTearDownAfterClass(): void {
		self::delete_all_languages();
	}

	/**
	 * Sets up each test
	 */
	protected function setUp(): void {
		parent::setUp();

		add_filter( 'wp_doing_ajax', '__return_false' );
	}

	/**
	 * Clears up each test
	 */
	protected function tearDown(): void {
		parent::tearDown();

		unset( $GLOBALS['wp_settings_errors'] );
		self::$polylang->model->clean_languages_cache(); // We must do it before database ROLLBACK otherwhise it is impossible to delete the transient
	}

	/**
	 * Helper function to create a language
	 *
	 * @param string $locale The locale to create
	 * @param array  $args Arguments for the language
	 *
	 * @return void
	 */
	protected static function create_language( $locale, $args = [] ) {
		$languages = include POLYLANG_DIR . '/settings/languages.php';
		$values    = $languages[ $locale ];

		$values['slug']       = $values['code'];
		$values['rtl']        = (int) ( 'rtl' === $values['dir'] );
		$values['term_group'] = 0; // default term_group

		$args = array_merge( $values, $args );
		self::$polylang->model->add_language( $args );
		unset( $GLOBALS['wp_settings_errors'] ); // Clean "errors"
	}

	/**
	 * A helper function to delete all languages
	 *
	 * @return void
	 */
	protected static function delete_all_languages() {
		$languages = self::$polylang->model->get_languages_list();
		if ( is_array( $languages ) ) {
			// Delete the default categories first
			$tt    = wp_get_object_terms( get_option( 'default_category' ), 'term_translations' );
			$terms = self::$polylang->model->term->get_translations( get_option( 'default_category' ) );

			wp_delete_term( $tt, 'term_translations' );

			foreach ( $terms as $term ) {
				wp_delete_term( $term, 'category' );
			}

			foreach ( $languages as $language ) {
				self::$polylang->model->delete_language( $language->term_id );
				unset( $GLOBALS['wp_settings_errors'] );
			}
		}
	}

	/**
	 * Switches to the given language
	 *
	 * @param string $lang The language to switch to
	 */
	protected static function switch_language( string $lang ): void {
		$language = \PLL()->model->get_language( $lang );

		if ( false !== $language ) {
			\PLL()->curlang = $language;
		}
	}

	/**
	 * Backport assertNotFalse to PHPUnit 3.6.12 which only runs in PHP 5.2.
	 *
	 * @param bool   $condition The candition
	 * @param string $message The message
	 */
	public static function assertNotFalse( $condition, string $message = '' ): void {
		if ( version_compare( phpversion(), '5.3', '<' ) ) {
			self::assertThat( $condition, self::logicalNot( self::isFalse() ), $message );
		} else {
			parent::assertNotFalse( $condition, $message );
		}
	}
}
