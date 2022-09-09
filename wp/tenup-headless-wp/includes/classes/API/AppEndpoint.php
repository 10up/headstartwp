<?php
/**
 * Custom endpoint tenup/v1/app to return relevant site information that is needed for
 * kicking off the site front-end
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\API;

use HeadlessWP;
use stdClass;

/**
 * AppEndpoint class
 */
class AppEndpoint {

	/**
	 * Cache key for storing the endpoint cache
	 *
	 * @var string
	 */
	public static $cache_key = 'headless_wp_api_app';

	/**
	 * Registers all actions and hooks
	 */
	public function register() {

		add_action( 'rest_api_init', array( $this, 'register_endpoints' ) );
		add_action( 'save_post', array( $this, 'invalidate_cache' ) ); // Clear the cache for this endpoint when posts are saved

	}

	/**
	 * Register custom endpoints
	 */
	public function register_endpoints() {
		register_rest_route(
			HeadlessWP\API::$namespace,
			'app',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'handle_api_endpoint' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Data preparation retrieval for the initial application data via the REST API endpoint tenup/v1/app
	 *
	 * This endpoint is checked on every request to include common site information site as menu data, homepage information, etc to kick off the
	 * front-end website. The data that is returned can be customized through filters to meet the unique needs of your website
	 */
	public function handle_api_endpoint() {

		$cache_key = self::$cache_key;
		$response  = wp_cache_get( $cache_key );

		if ( empty( $response ) ) {

			$response = [
				'menus'     => [],
				'home'      => [],
				'settings'  => [],
				'redirects' => [],
			];

			// Support safe redirect manager redirects
			if ( function_exists( '\srm_get_redirects' ) ) {
				$response['redirects'] = \srm_get_redirects(
					[
						'posts_per_page' => 300,
					]
				);
			}

			/**
			 * Homepage data retrieval. By default the scaffold will set the homepage depending on the settings in the WordPress admin 'Reading' settings.
			 * If a homepage 'page' has not been set, then the most recent posts will be used as homepage data
			 */
			$homepage_id = (int) get_option( 'page_on_front' );

			if ( $homepage_id > 0 ) {
				$homepage_post = get_post( $homepage_id );
			}

			// Specify any data that will be needed to retrieve the homepage
			$response['home'] = apply_filters(
				'headless_wp_api_app_home',
				array(
					'id'   => $homepage_id,
					'slug' => $homepage_post->post_name,

				)
			);

			// Set up menu data to return for REST API
			$menu_locations = get_nav_menu_locations();

			foreach ( $menu_locations as $menu_name => $menu_id ) {
				if ( ! apply_filters( 'headless_wp_api_app_show_menu_' . $menu_name, true, $menu_id ) ) {
					continue;
				}

				$response['menus'][ $menu_name ] = $this->prepare_menus( wp_get_nav_menu_items( $menu_id ) );
			}

			// Set up common metadata. Add any additional metadata below
			$response['settings']['site_name']          = get_bloginfo( 'name' );
			$response['settings']['site_desc']          = get_bloginfo( 'description' );
			$response['settings']['site_wp_url']        = get_bloginfo( 'url' );
			$response['settings']['site_rss_url']       = get_bloginfo( 'rss2_url' );
			$response['settings']['posts_per_page']     = get_option( 'posts_per_page' );
			$response['settings']['privacy_policy_url'] = get_privacy_policy_url();

			$global_styles = wp_get_global_styles();

			$response['theme.json'] = [
				'settings' => wp_get_global_settings(),
				'styles'   => [
					'spacing' => $global_styles['spacing'],
				],
			];

			// Add any customizations or overrides for the endpoint data
			$response = apply_filters( 'headless_wp_api_app_response', $response );

			// Since this endpoint is hit on every page, cache the data to help speed the site
			\wp_cache_set( $cache_key, $response, '', 15 * MINUTE_IN_SECONDS );

		}

		return rest_ensure_response( $response );
	}

	/**
	 * Prepare the menu data that will be returned via the REST API
	 *
	 * @param array $menu Menu object
	 *
	 * @return array
	 */
	public function prepare_menus( $menu ) {
		if ( ! is_array( $menu ) ) {
			return $menu;
		}

		$filtered_menu = [];

		foreach ( $menu as $menu_item ) {
			$fitered_menu_item = new stdClass();

			$fitered_menu_item->ID               = $menu_item->ID;
			$fitered_menu_item->title            = html_entity_decode( $menu_item->title );
			$fitered_menu_item->slug             = basename( get_permalink( $menu_item->object_id ) ) === basename( get_home_url() ) ? '' : basename( get_permalink( $menu_item->object_id ) );
			$fitered_menu_item->post_parent      = $menu_item->menu_item_parent;
			$fitered_menu_item->guid             = $menu_item->guid;
			$fitered_menu_item->menu_item_parent = $menu_item->menu_item_parent;
			$fitered_menu_item->object_id        = $menu_item->object;
			$fitered_menu_item->url              = $menu_item->url;
			$fitered_menu_item->target           = $menu_item->target;
			$fitered_menu_item->attr_title       = $menu_item->attr_title;
			$fitered_menu_item->description      = $menu_item->description;
			$fitered_menu_item->classes          = $menu_item->classes;

			$filtered_menu[] = $fitered_menu_item;
		}

		return $filtered_menu;

	}

	/**
	 * Invalidates the cache for this endpoint
	 */
	public function invalidate_cache() {
		$cache_key = self::$cache_key;

		wp_cache_delete( $cache_key );
	}
}
