<?php
/**
 * Helper function for languages (Polylang).
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Utils\Langs;

/**
 * Return the default site locale.
 *
 * @return string
 */
function get_default_locale_slug() {
	if ( function_exists( 'pll_default_language' ) ) {
		return pll_default_language( 'slug' );
	}

	$wp_locale = explode( '_', get_locale() );
	return $wp_locale[0];
}
