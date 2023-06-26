<?php
/**
 * PHPUnit bootstrap file
 *
 * @package HeadstartWP
 */

use Yoast\WPTestUtils\WPIntegration;

define( 'TESTS_PLUGIN_DIR', dirname( dirname( __DIR__ ) ) );

define( 'PROJECT_ROOT', dirname( dirname( __DIR__ ) ) );

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
	 * @return void
	 */
	function tests_add_filter( ...$args ) {}

	throw new Exception( 'Unable to load the WP test suite.' );
}

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
	require_once dirname( __DIR__, 2 ) . '/plugin.php';
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

// Require all files in the fixtures directory.
foreach ( glob( __DIR__ . '/fixtures/*.php' ) as $file ) {
	require_once $file;
}

WPIntegration\bootstrap_it();
