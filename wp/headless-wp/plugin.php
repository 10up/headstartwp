<?php
/**
 * Plugin Name: HeadstartWP
 * Plugin URI:  https://github.com/10up/headstartwp-plugin
 * Description: Adds functionality to the WordPress admin and REST API for 10up's headless framework.
 * Version: 1.1.5
 * Author:      10up
 * Author URI:  https://10up.com
 * Text Domain: headstartwp
 * Domain Path: /languages
 *
 * @package HeadlessWP
 */

namespace HeadlessWP;

use HeadlessWP\Preview\PreviewToken;

// Useful global constants.
define( 'HEADLESS_WP_PLUGIN_VERSION', '1.1.5' );
define( 'HEADLESS_WP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'HEADLESS_WP_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'HEADLESS_WP_PLUGIN_INC', HEADLESS_WP_PLUGIN_PATH . 'includes/' );

// Load php-jwt classes.
$jwt_files = [
	'BeforeValidException.php',
	'ExpiredException.php',
	'JWK.php',
	'JWT.php',
	'SignatureInvalidException.php',
];

foreach ( $jwt_files as $filename ) {
	require_once HEADLESS_WP_PLUGIN_PATH . '/includes/classes/php-jwt/' . $filename;
}

// Require Composer autoloader if it exists.
if ( file_exists( HEADLESS_WP_PLUGIN_PATH . '/vendor/autoload.php' ) ) {
	require_once HEADLESS_WP_PLUGIN_PATH . 'vendor/autoload.php';
} else {
	spl_autoload_register(
		function ( $the_class ) {
				// Project-specific namespace prefix.
				$prefix = 'HeadlessWP\\';
				// Base directory for the namespace prefix.
				$base_dir = __DIR__ . '/includes/classes/';
				// Does the class use the namespace prefix?
				$len = strlen( $prefix );
			if ( strncmp( $prefix, $the_class, $len ) !== 0 ) {
				return;
			}
				$relative_class = substr( $the_class, $len );
				$file           = $base_dir . str_replace( '\\', '/', $relative_class ) . '.php';
				// If the file exists, require it.
			if ( file_exists( $file ) ) {
				require $file;
			}
		}
	);
}

// Setup plugin
$plugin = new Plugin();
$plugin->register();

add_action(
	'rest_api_init',
	function () {
		PreviewToken::setup();
	}
);
