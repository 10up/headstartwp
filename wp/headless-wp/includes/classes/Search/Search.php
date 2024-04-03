<?php
/**
 * Search Class
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Search;

/**
 * Search Class
 */
class Search {

	/**
	 * Set up any hooks
	 */
	public function register(): void {
		add_filter( 'wp_rest_search_handlers', [ $this, 'override_rest_search_handlers' ], 10, 1 );
	}

	/**
	 * Override \WP_REST_Post_Search_Handler to include posts _embed data in search results.
	 *
	 * @param array $search_handlers List of search handlers to use in WP_REST_Search_Controller.
	 * @return array
	 */
	public function override_rest_search_handlers( $search_handlers ) {

		foreach ( $search_handlers as &$search_handler ) {
			if ( $search_handler instanceof \WP_REST_Post_Search_Handler ) {
				$search_handler = new PostSearchHandler();
				break;
			}
		}

		return $search_handlers;
	}
}
