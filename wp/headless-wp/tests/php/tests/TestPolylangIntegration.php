<?php
/**
 * Tests covering the gutenberg integration
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Tests;

use HeadlessWP\Integrations\YoastSEO;
use HeadlessWP\Tests\Inc\PLLUnitTestCase;
use WP_REST_Request;
use WP_REST_Server;
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
	 * The rest server
	 *
	 * @var WP_REST_Server
	 */
	protected static \WP_REST_Server $rest_server;

	/**
	 * Setup any pre-test data.
	 *
	 * @return void
	 */
	public static function setUpBeforeClass(): void {
		parent::setUpBeforeClass();

		self::create_language( 'en_US' );
		self::create_language( 'pt_BR' );

		self::$polylang = new \PLL_Frontend( self::$polylang->links_model );
		self::$polylang->init();

		self::$rest_server = rest_get_server();
	}

	/**
	 * Sets up the tests
	 *
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();

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
	 * @param string  $post_type The post type
	 *
	 * @return string
	 */
	protected function getYoastHeadForPost( int $post_id, string $post_type = 'post' ): string {
		$post_type = get_post_type_object( $post_type );
		$request   = new WP_REST_Request( 'GET', "/wp/v2/$post_type->rest_base/$post_id" );
		$response  = rest_do_request( $request );
		$data      = self::$rest_server->response_to_data( $response, false );

		return $data['yoast_head'] ?? '';
	}

	/**
	 * Returns the yoast head for a term
	 *
	 * @param string $post_type The post type we're fetching from
	 * @param int    $term_id The term id
	 *
	 * @return string
	 */
	protected function getYoastHeadForTerm( string $post_type, int $term_id ): string {
		$post_type = get_post_type_object( $post_type );
		$request   = new WP_REST_Request( 'GET', "/wp/v2/$post_type->rest_base", [ 'categories' => $term_id ] );
		$response  = rest_do_request( $request );
		$data      = self::$rest_server->response_to_data( $response, true );

		return $data[0]['_embedded']['wp:term'][0][0]['yoast_head'] ?? '';
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

	/**
	 * Test hreflang on homepage
	 *
	 * @return void
	 */
	public function test_hreflang_on_homepage() {
		$english_page = $this->factory()->post->create(
			[
				'post_title'   => '[EN] home page',
				'post_status'  => 'publish',
				'post_content' => 'english page',
				'post_type'    => 'page',
			]
		);

		\pll_set_post_language( $english_page, 'en' );

		$portuguese_page = $this->factory()->post->create(
			[
				'post_title'   => '[PT_BR] home Page',
				'post_status'  => 'publish',
				'post_content' => 'portugese page',
				'post_type'    => 'page',
			]
		);

		\pll_set_post_language( $portuguese_page, 'pt' );

		\pll_save_post_translations(
			[
				'en' => $english_page,
				'pt' => $portuguese_page,
			]
		);

		update_option( 'page_on_front', $english_page );

		$yoast_head = $this->getYoastHeadForPost( $english_page, 'page' );

		$this->assertNotFalse( strpos( $yoast_head, '<link rel="alternate" href="http://localhost:8889/en-home-page/" hreflang="en" />' ), 'hreflang was not found' );
		$this->assertNotFalse( strpos( $yoast_head, '<link rel="alternate" href="http://localhost:8889/pt_br-home-page/" hreflang="pt" />' ), 'hreflang was not found' );
		$this->assertNotFalse( strpos( $yoast_head, '<link rel="alternate" href="http://localhost:8889/" hreflang="x-default" />' ), 'hreflang was not found' );
	}

	/**
	 * Tests hrelang on taxonomy archives
	 *
	 * @return void
	 */
	public function test_hreflang_on_taxonomy_archive() {
		$cat_en = $this->factory()->term->create_and_get(
			[
				'taxonomy' => 'category',
			]
		);

		$cat_en_id = $cat_en->term_id;

		\pll_set_term_language( $cat_en_id, 'en' );

		$cat_pt = $this->factory()->term->create_and_get(
			[
				'taxonomy' => 'category',
			]
		);

		$cat_pt_id = $cat_pt->term_id;

		\pll_set_term_language( $cat_pt_id, 'pt' );

		$posts_en = $this->factory()->post->create_many(
			5,
			[
				'post_category' => [ $cat_en_id ],
			]
		);

		foreach ( $posts_en as $post_en ) {
			\pll_set_post_language( $post_en, 'en' );
		}

		$posts_pt = $this->factory()->post->create_many(
			5,
			[
				'post_category' => [ $cat_pt_id ],
			]
		);

		foreach ( $posts_pt as $post_pt ) {
			\pll_set_post_language( $post_pt, 'pt' );
		}

		$yoast_head = $this->getYoastHeadForTerm( 'post', $cat_pt_id );

		$this->assertNotFalse( strpos( $yoast_head, '<link rel="alternate" href="http://localhost:8889/category/english" hreflang="en" />' ), 'hreflang was not found' );
	}
}
