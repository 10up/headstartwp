<?php
/**
 * Tests covering the gutenberg integration
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Tests;

use HeadlessWP\Tests\Inc\PLLUnitTestCase;
use WP_REST_Request;
use WP_Rewrite;

/**
 * Tests our polylang integration
 */
class TestPolylangIntegration extends PLLUnitTestCase {
	/**
	 * A refenrece to the WP Rewrite object
	 *
	 * @var WP_Rewrite
	 */
	protected \WP_Rewrite $wp_rewrite;

	/**
	 * Setup any pre-test data.
	 *
	 * @return void
	 */
	public static function setUpBeforeClass(): void {
		$plugins = [ 'polylang/polylang.php', 'wordpress-seo/wp-seo.php' ];

		foreach ( $plugins as $plugin ) {
			if ( ! is_plugin_active( $plugin ) ) {
				activate_plugin( $plugin );
			}
		}

		// Make sure these are all active.
		foreach ( $plugins as $plugin ) {
			self::assertTrue( is_plugin_active( $plugin ) );
		}

		parent::setUpBeforeClass();

		self::create_language( 'en_US' );
		self::create_language( 'pt_BR' );

		self::$polylang = new \PLL_Frontend( self::$polylang->links_model );
		self::$polylang->init();
	}

	/**
	 * Sets up the tests
	 *
	 * @return void
	 */
	public function set_up() {
		parent::set_up();

		/**
		 * The rewrite class
		 *
		 * @var \WP_Rewrite $wp_rewrite
		 */
		global $wp_rewrite;

		$this->wp_rewrite = $wp_rewrite;

		/**
		 * Change the permalink structure
		 */
		$this->wp_rewrite->init();
		$this->wp_rewrite->set_permalink_structure( '/%postname%/' );
	}

	/**
	 * Returns the yoast head for a post
	 *
	 * @param integer $post_id The post id
	 *
	 * @return string
	 */
	protected function getYoastHeadForPost( int $post_id ): string {
		$request  = new WP_REST_Request( 'GET', "/wp/v2/posts/$post_id" );
		$response = rest_do_request( $request );
		$server   = rest_get_server();
		$data     = $server->response_to_data( $response, false );

		return $data['yoast_head'] ?? '';
	}

	/**
	 * Test hreflang on single posts
	 *
	 * @return void
	 */
	public function test_hreflang_on_single_posts() {
		$english_post = $this->factory()->post->create_and_get(
			[
				'post_title'   => '[EN] Post',
				'post_status'  => 'publish',
				'post_content' => 'english post',
				'post_type'    => 'post',
			]
		);

		\pll_set_post_language( $english_post->ID, 'en' );

		$portuguese_post = $this->factory()->post->create_and_get(
			[
				'post_title'   => '[PT_BR] Post',
				'post_status'  => 'publish',
				'post_content' => 'portugese post',
				'post_type'    => 'post',
			]
		);

		\pll_set_post_language( $portuguese_post->ID, 'pt' );

		\pll_save_post_translations(
			[
				'en' => $english_post->ID,
				'pt' => $portuguese_post->ID,
			]
		);

		$yoast_head = $this->getYoastHeadForPost( $english_post->ID );

		$this->assertNotFalse( strpos( $yoast_head, '<link rel="alternate" href="http://localhost:8889/en-post/" hreflang="en" />' ), 'hreflang was not found' );
		$this->assertNotFalse( strpos( $yoast_head, '<link rel="alternate" href="http://localhost:8889/pt_br-post/" hreflang="pt" />' ), 'hreflang was not found' );

		$yoast_head = $this->getYoastHeadForPost( $portuguese_post->ID );

		$this->assertNotFalse( strpos( $yoast_head, '<link rel="alternate" href="http://localhost:8889/pt_br-post/" hreflang="pt" />' ), 'hreflang was not found' );
		$this->assertNotFalse( strpos( $yoast_head, '<link rel="alternate" href="http://localhost:8889/en-post/" hreflang="en" />' ), 'hreflang was not found' );
	}
}
