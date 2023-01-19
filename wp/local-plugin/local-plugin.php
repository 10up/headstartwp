<?php
/**
 * Plugin Name: 10up Headless WordPress - Local Dev Plugin
 * Plugin URI:  false
 * Description: This plugin is supossed to be used whithin the headless framework monorepo.
 * Version:     1.0.0
 * Author:      10up
 * Author URI:  https://10up.com
 *
 * @package HeadlessWPLocalDev
 */

namespace HeadlessWPLocalDev;

register_activation_hook( 
	__FILE__,
	__NAMESPACE__ . '\\bootstrap'
);

function bootstrap() {
	global $wp_rewrite;
	$wp_rewrite->set_permalink_structure( '/%postname%/' );
	flush_rewrite_rules();
}

