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
	 * Key for storing the cache keys
	 *
	 * @var string
	 */
	private static $cache_key_store = 'headless_wp_api_app_cache_key_store';

	/**
	 * Registers all actions and hooks
	 */
	public function register() {
		add_action( 'rest_api_init', [ $this, 'register_endpoints' ] );

		// Clear the cache for this endpoint when posts and options are saved
		add_action( 'save_post', [ $this, 'invalidate_cache' ] );
		add_action( 'update_option', [ $this, 'maybe_invalidate_cache' ] );
	}

	/**
	 * Generates a dynamic key given params
	 *
	 * @param array $params The request params
	 *
	 * @return string
	 */
	public function get_cache_key( $params ) {
		return sprintf( '%s_%s', self::$cache_key, md5( wp_json_encode( $params ) ) );
	}

	/**
	 * Returns all stored cache keys
	 *
	 * @return array
	 */
	public function get_cache_keys() {
		return get_option( self::$cache_key_store, [] );
	}

	/**
	 * Stores the cache key for later invalidation
	 *
	 * @param string $cache_key The cache key to store
	 *
	 * @return void
	 */
	public function store_cache_key( $cache_key ) {
		$cache_keys = $this->get_cache_keys();

		// storing as a dict for faster access
		$cache_keys[ $cache_key ] = true;

		update_option( self::$cache_key_store, $cache_keys );
	}

	/**
	 * Register custom endpoints
	 */
	public function register_endpoints() {

		$args = [
			'methods'             => 'GET',
			'callback'            => [ $this, 'handle_api_endpoint' ],
			'permission_callback' => '__return_true',
		];

		register_rest_route(
			HeadlessWP\API::$namespace,
			'app',
			$args
		);
	}

	/**
	 * Data preparation retrieval for the initial application data via the REST API endpoint tenup/v1/app
	 *
	 * This endpoint is checked on every request to include common site information site as menu data, homepage information, etc to kick off the
	 * front-end website. The data that is returned can be customized through filters to meet the unique needs of your website
	 *
	 * @param \WP_REST_Request $request The Rest Request
	 *
	 * @return \WP_Rest_Response
	 */
	public function handle_api_endpoint( \WP_REST_Request $request ) {
		$cache_key = $this->get_cache_key( $request->get_params() );
		$response  = wp_cache_get( $cache_key );

		if ( empty( $response ) ) {

			$response = [
				'menus'     => [],
				'home'      => [],
				'settings'  => [],
				'redirects' => [],
			];

			/**
			 * Homepage data retrieval. By default the scaffold will set the homepage depending on the settings in the WordPress admin 'Reading' settings.
			 * If a homepage 'page' has not been set, then the most recent posts will be used as homepage data
			 */
			$homepage_id         = (int) get_option( 'page_on_front' );
			$home_page_post_slug = '';
			if ( $homepage_id > 0 ) {
				$homepage_post       = get_post( $homepage_id );
				$home_page_post_slug = $homepage_post->post_name;
			}

			// Specify any data that will be needed to retrieve the homepage
			$response['home'] = apply_filters(
				'headless_wp_api_app_home',
				[
					'id'   => $homepage_id,
					'slug' => $home_page_post_slug,
				]
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

			$this->store_cache_key( $cache_key );

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
			$filtered_menu_item = new stdClass();

			$filtered_menu_item->ID               = $menu_item->ID;
			$filtered_menu_item->title            = html_entity_decode( $menu_item->title );
			$filtered_menu_item->slug             = basename( get_permalink( $menu_item->object_id ) ) === basename( get_home_url() ) ? '' : basename( get_permalink( $menu_item->object_id ) );
			$filtered_menu_item->post_parent      = $menu_item->menu_item_parent;
			$filtered_menu_item->guid             = $menu_item->guid;
			$filtered_menu_item->menu_item_parent = $menu_item->menu_item_parent;
			$filtered_menu_item->object_id        = $menu_item->object;
			$filtered_menu_item->url              = $menu_item->url;
			$filtered_menu_item->target           = $menu_item->target;
			$filtered_menu_item->attr_title       = $menu_item->attr_title;
			$filtered_menu_item->description      = $menu_item->description;
			$filtered_menu_item->classes          = $menu_item->classes;
			$filtered_menu_item->menu_order       = $menu_item->menu_order;
			$filtered_menu_item->post_type        = $menu_item->post_type;
			$filtered_menu_item->post_mime_type   = $menu_item->post_mime_type;
			$filtered_menu_item->object           = $menu_item->object;
			$filtered_menu_item->type             = $menu_item->type;
			$filtered_menu_item->type_label       = $menu_item->type_label;

			$filtered_menu[] = $filtered_menu_item;
		}

		return $filtered_menu;
	}

	/**
	 * Maybe invalidate cache when updating options
	 *
	 * @param string $option_name The option name
	 *
	 * @return void
	 */
	public function maybe_invalidate_cache( $option_name ) {
		if ( self::$cache_key_store !== $option_name ) {
			$this->invalidate_cache();
		}
	}

	/**
	 * Invalidates the cache for this endpoint
	 */
	public function invalidate_cache() {
		$cache_keys = $this->get_cache_keys();

		// cache keys is a dict, and the key is the cache_key
		foreach ( $cache_keys as $cache_key => $val ) {
			wp_cache_delete( $cache_key );
		}

		delete_option( self::$cache_key_store );
	}
}
