<?php
/**
 * PHPUnit bootstrap file
 *
 * @package HeadstartWP
 */

use Yoast\WPTestUtils\WPIntegration;

define( 'TESTS_PLUGIN_DIR', dirname( __DIR__, 2 ) );

define( 'PROJECT_ROOT', dirname( __DIR__, 2 ) );

if ( ! defined( 'WP_TESTS_CONFIG_FILE_PATH' ) && false !== getenv( 'WP_PHPUNIT__TESTS_CONFIG' ) ) {
	define( 'WP_TESTS_CONFIG_FILE_PATH', getenv( 'WP_PHPUNIT__TESTS_CONFIG' ) );
}

require_once PROJECT_ROOT . '/vendor/autoload.php';
require_once PROJECT_ROOT . '/vendor/yoast/wp-test-utils/src/WPIntegration/bootstrap-functions.php';


$_tests_dir = WPIntegration\get_path_to_wp_test_dir();

require_once $_tests_dir . '/includes/functions.php';

if ( ! function_exists( 'tests_add_filter' ) ) {
	/**
	 * Dummy function to test if everything was loaded properly
	 *
	 * @param mixed ...$args Arguments
	 */
	function tests_add_filter( mixed ...$args ): void {}

	throw new Exception( 'Unable to load the WP test suite.' );
}

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin(): void {
	require_once WP_PLUGIN_DIR . '/polylang/polylang.php';
	require_once WP_PLUGIN_DIR . '/wordpress-seo/wp-seo.php';
	require_once dirname( __DIR__, 2 ) . '/plugin.php';
}

tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

// Require all files in the fixtures directory.
foreach ( glob( __DIR__ . '/fixtures/*.php' ) as $file ) {
	require_once $file;
}

WPIntegration\bootstrap_it();

require_once PROJECT_ROOT . '/tests/php/includes/PLLUnitTestCase.php';
