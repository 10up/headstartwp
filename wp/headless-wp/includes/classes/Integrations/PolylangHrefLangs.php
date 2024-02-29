<?php
/**
 * HeadlessWP PolylangHrefLangs Class.
 * Adds hreflangs to Yoast head
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Integrations;

use Yoast\WP\SEO\Presenters\Abstract_Indexable_Presenter;
use HeadlessWP\Utils\Rest;
use HeadlessWP\Utils\Langs;

/**
 * The PolylangHrefLangs integration class
 */
class PolylangHrefLangs extends Abstract_Indexable_Presenter {

	/**
	 * Output the hreflang tags if they exist.
	 */
	public function present() {
		if ( function_exists( 'pll_languages_list' ) ) {
			$hreflangs = $this->get();

			if ( ! empty( $hreflangs ) ) {
				return $hreflangs;
			}
		}

		return '';
	}

	/**
	 * Get hreflang tags for the current post.
	 * https://polylang.pro/hreflang-tag-attributes-and-polylang-everything-you-need-to-know
	 *
	 * @return string Hreflang tags or empty string.
	 */
	public function get() {

		$languages = pll_languages_list();

		if ( 2 > count( $languages ) ) {
			return '';
		}

		$hreflangs_output = '';
		$hreflangs_urls   = [];

		$post_id      = get_the_ID();
		$translations = [];
		$is_taxonomy  = false;
		$is_homepage  = false;
		$term         = null;

		$paged = filter_input( INPUT_GET, 'page', FILTER_SANITIZE_NUMBER_INT );

		// Don't output anything on paged archives: see https://wordpress.org/support/topic/hreflang-on-page2
		// Don't output anything on paged pages and paged posts
		if ( 1 < $paged ) {
			return '';
		}

		// Get Term or Post translations.
		if ( empty( $post_id ) ) {
			$term = Rest\is_taxonomy_rest_request();
			if ( $term instanceof \WP_term && pll_is_translated_taxonomy( $term->taxonomy ) ) {
				$translations = pll_get_term_translations( $term->term_id );
				$is_taxonomy  = true;
			}
		} else {
			$translations = pll_get_post_translations( $post_id );
		}

		if ( empty( $translations ) ) {
			return '';
		}

		// Herflangs for archive first pages.
		if ( $is_taxonomy ) {
			foreach ( $translations as $language => $translated_id ) {
				// Get term object for translations and only include hreflang tags if term has posts.
				$term_obj = $translated_id === $term->term_id ? $term : get_term( $translated_id, $term->taxonomy );
				if ( 0 === $term_obj->count ) {
					continue;
				}

				$hreflangs_urls[ $language ] = get_term_link( $translated_id );
			}
		} else {
			$homepages = $this->get_homepage_post_ids();

			// Herflangs for single posts.
			foreach ( $translations as $language => $translated_id ) {

				if ( in_array( $translated_id, $homepages, true ) ) {
					$is_homepage = true;
				}

				// Only add hreflang tags for published posts.
				if ( 'publish' !== get_post_status( $translated_id ) ) {
					continue;
				}

				$hreflangs_urls[ $language ] = get_the_permalink( $translated_id );
			}
		}

		// Do not add hreflang tags if page has no translations, count is 1 as it includes the existing post.
		if ( empty( $hreflangs_urls ) || ( is_array( $hreflangs_urls ) && count( $hreflangs_urls ) <= 1 ) ) {
			return '';
		}

		// Polylang generates an x-default hreflang only for the homepage only as recommended by Google.
		$polylang_settings = get_option( 'polylang' );
		if ( $is_homepage && ! $polylang_settings['hide_default'] && $polylang_settings['force_lang'] < 3 ) {
			$hreflangs_urls['x-default'] = home_url( '/' );
		}

		/**
		 * Filters the list of rel hreflang attributes
		 *
		 * @param array $hreflangs_urls Array of urls with language codes as keys
		 */
		$hreflangs_urls = apply_filters( 'tenup_headless_wp_hreflang_attributes', $hreflangs_urls );

		// Build the hreflang tags if we have translations.
		foreach ( $hreflangs_urls as $lang => $url ) {
			$hreflangs_output .= sprintf( '<link rel="alternate" href="%s" hreflang="%s" />' . "\n", esc_url( $url ), esc_attr( $lang ) );
		}

		return $hreflangs_output;
	}

	/**
	 * Return list of homepage IDs for default lang and translated homepages.
	 *
	 * @return array List of homepage IDs.
	 */
	public function get_homepage_post_ids() {
		$home_id = get_option( 'page_on_front' );
		if ( empty( $home_id ) ) {
			return [];
		}

		$result = [ $home_id ];

		if ( function_exists( 'pll_get_post_translations' ) ) {
			$result = pll_get_post_translations( $home_id ); // includes the default homepage lang.
		}

		return $result;
	}
}
