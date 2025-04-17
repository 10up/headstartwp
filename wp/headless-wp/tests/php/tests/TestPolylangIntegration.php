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
	 * Clear Yoast's memoized data
	 *
	 * @return void
	 */
	protected function clearYoastMemoizedData(): void {
		// this seems to be a bug with yoast seo, these two memoizers are not working as they should
		// they are indexed by $indetaxble->id but only $indexable->object_id exists
		$memoizer = \YoastSEO()->classes->get( \Yoast\WP\SEO\Memoizers\Meta_Tags_Context_Memoizer::class );
		$memoizer->clear();
		$presenter_memoizer = \YoastSEO()->classes->get( \Yoast\WP\SEO\Memoizers\Presentation_Memoizer::class );
		$presenter_memoizer->clear();
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

		$this->clearYoastMemoizedData();
		$yoast_head = \YoastSEO()->meta->for_post( $english_post->ID )->get_head()->html;

		$this->assertNotFalse( strpos( $yoast_head, '<link rel="alternate" href="http://localhost:8889/en-post/" hreflang="en" />' ), 'hreflang was not found' );
		$this->assertNotFalse( strpos( $yoast_head, '<link rel="alternate" href="http://localhost:8889/pt_br-post/" hreflang="pt" />' ), 'hreflang was not found' );

		$this->clearYoastMemoizedData();
		$yoast_head = \YoastSEO()->meta->for_post( $portuguese_post->ID )->get_head()->html;

		$this->assertNotFalse( strpos( $yoast_head, '<link rel="alternate" href="http://localhost:8889/pt_br-post/" hreflang="pt" />' ), 'hreflang was not found' );
		$this->assertNotFalse( strpos( $yoast_head, '<link rel="alternate" href="http://localhost:8889/en-post/" hreflang="en" />' ), 'hreflang was not found' );
	}

	/**
	 * Test hreflang on homepage
	 *
	 * @return void
	 */
	public function test_hreflang_on_homepage() {
		$english_page = $this->factory()->post->create_and_get(
			[
				'post_title'   => '[EN] home page',
				'post_status'  => 'publish',
				'post_content' => 'english page',
				'post_type'    => 'page',
			]
		);

		\pll_set_post_language( $english_page->ID, 'en' );

		$portuguese_page = $this->factory()->post->create_and_get(
			[
				'post_title'   => '[PT_BR] home Page',
				'post_status'  => 'publish',
				'post_content' => 'portugese page',
				'post_type'    => 'page',
			]
		);

		\pll_set_post_language( $portuguese_page->ID, 'pt' );

		\pll_save_post_translations(
			[
				'en' => $english_page->ID,
				'pt' => $portuguese_page->ID,
			]
		);

		update_option( 'page_on_front', $english_page->ID );

		$this->clearYoastMemoizedData();
		$yoast_head = \YoastSEO()->meta->for_post( $english_page->ID )->get_head()->html;

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
				'name'     => '[EN] Category',
				'taxonomy' => 'category',
			]
		);

		$cat_en_id = $cat_en->term_id;

		\pll_set_term_language( $cat_en_id, 'en' );

		$cat_pt = $this->factory()->term->create_and_get(
			[
				'name'     => '[PT_BR] Category',
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

		\pll_save_term_translations(
			[
				'en' => $cat_en_id,
				'pt' => $cat_pt_id,
			]
		);

		$this->clearYoastMemoizedData();
		$yoast_head = \YoastSEO()->meta->for_term( $cat_pt_id )->get_head()->html;

		$this->assertNotFalse( strpos( $yoast_head, sprintf( '<link rel="alternate" href="http://localhost:8889/?cat=%s&#038;lang=en" hreflang="en" />', $cat_en_id ) ), 'hreflang was not found' );
		$this->assertNotFalse( strpos( $yoast_head, sprintf( '<link rel="alternate" href="http://localhost:8889/?cat=%s&#038;lang=en" hreflang="pt" />', $cat_pt_id ) ), 'hreflang was not found' );
	}
}
