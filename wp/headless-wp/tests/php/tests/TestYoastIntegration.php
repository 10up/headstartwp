<?php
/**
 * Tests covering the Yoast integration
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Tests;

use HeadlessWP\Integrations\YoastSEO;
use WP_Test_REST_TestCase;
use WP_REST_Request;
use WP_REST_Server;

/**
 * Covers the test for the Yoast integration
 */
class TestYoastIntegration extends WP_Test_REST_TestCase {
	/**
	 * The YoastSEO instance
	 *
	 * @var YoastSEO
	 */
	protected $yoast_seo;

	/**
	 * The rest server
	 *
	 * @var WP_REST_Server
	 */
	protected static $rest_server;

	/**
	 * Test data IDs
	 *
	 * @var array
	 */
	protected $test_data = [];

	/**
	 * Sets up the Test class
	 *
	 * @return void
	 */
	public function set_up() {
		parent::set_up();

		// Set the correct HeadstartWP REST API access option to 'none' ( publicly accessible )
		update_option( 'tenup_restrict_rest_api', 'none' );

		$this->yoast_seo = new YoastSEO();
		$this->yoast_seo->register();
		self::$rest_server = rest_get_server();

		$this->test_data = [];
		$this->set_test_data();
	}

	/**
	 * Set test data for all scenarios.
	 * Using string IDs to match real REST API responses.
	 */
	protected function set_test_data() {
		$this->test_data = [
			'jane_author'    => '6',
			'other_author'   => '7',
			'news_category'  => '8',
			'other_category' => '9',
			'post_1'         => '29',
			'post_2'         => '30',
			'post_3'         => '31',
		];
	}

	/**
	 * Manually construct REST API response format for testing Yoast optimization
	 *
	 * @return array
	 */
	protected function create_manual_rest_api_data() {
		return [
			[
				'id'              => $this->test_data['post_1'],
				'title'           => [ 'rendered' => 'First Post by Jane' ],
				'author'          => $this->test_data['jane_author'],
				'yoast_head'      => '<title>First Post by Jane</title>',
				'yoast_head_json' => [ 'title' => 'First Post by Jane' ],
				'_embedded'       => [
					'author'  => [
						[
							'id'              => $this->test_data['jane_author'],
							'name'            => 'Jane Author',
							'slug'            => 'jane-author',
							'yoast_head'      => '<title>Jane Author</title>',
							'yoast_head_json' => [ 'title' => 'Jane Author' ],
						],
					],
					'wp:term' => [
						[
							[
								'id'              => $this->test_data['news_category'],
								'name'            => 'News Category',
								'slug'            => 'news-category',
								'taxonomy'        => 'category',
								'yoast_head'      => '<title>News Category</title>',
								'yoast_head_json' => [ 'title' => 'News Category' ],
							],
						],
					],
				],
			],
			[
				'id'              => $this->test_data['post_2'],
				'title'           => [ 'rendered' => 'Second Post by Jane' ],
				'author'          => $this->test_data['jane_author'],
				'yoast_head'      => '<title>Second Post by Jane</title>',
				'yoast_head_json' => [ 'title' => 'Second Post by Jane' ],
				'_embedded'       => [
					'author'  => [
						[
							'id'              => $this->test_data['jane_author'],
							'name'            => 'Jane Author',
							'slug'            => 'jane-author',
							'yoast_head'      => '<title>Jane Author</title>',
							'yoast_head_json' => [ 'title' => 'Jane Author' ],
						],
					],
					'wp:term' => [
						[
							[
								'id'              => $this->test_data['news_category'],
								'name'            => 'News Category',
								'slug'            => 'news-category',
								'taxonomy'        => 'category',
								'yoast_head'      => '<title>News Category</title>',
								'yoast_head_json' => [ 'title' => 'News Category' ],
							],
						],
					],
				],
			],
		];
	}

	/**
	 * Single post query
	 * Only the queried post should have yoast metadata
	 */
	public function test_single_post_query() {
		$request = new WP_REST_Request( 'GET', '/wp/v2/posts/' . $this->test_data['post_1'] );
		$request->set_param( 'optimizeYoastPayload', true );
		$request->set_param( '_embed', true );

		$manual_data           = $this->create_manual_rest_api_data();
		$data_for_optimization = [ $manual_data[0] ];

		$optimized_data = $this->yoast_seo->optimise_yoast_payload( $data_for_optimization, self::$rest_server, $request, true );
		$optimized_post = $optimized_data[0];

		// The single post should have yoast_head
		$this->assertArrayHasKey( 'yoast_head', $optimized_post, 'Single queried post should have yoast_head' );

		// Embedded terms and authors should NOT have yoast_head since no specific term/author was queried
		if ( isset( $optimized_post['_embedded'] ) ) {
			$this->assert_no_yoast_in_embedded( $optimized_post['_embedded'], 'No embedded items should have yoast_head for single post query' );
		}
	}

	/**
	 * Posts by category
	 * Only first post and queried category should have yoast metadata
	 */
	public function test_posts_by_category() {
		$request = new WP_REST_Request( 'GET', '/wp/v2/posts' );
		$request->set_param( 'categories', $this->test_data['news_category'] );
		$request->set_param( 'per_page', 10 );
		$request->set_param( 'optimizeYoastPayload', true );
		$request->set_param( '_embed', true );

		$data           = $this->create_manual_rest_api_data();
		$optimized_data = $this->yoast_seo->optimise_yoast_payload( $data, self::$rest_server, $request, true );

		$this->assertGreaterThanOrEqual( 2, count( $optimized_data ), 'Should return at least 2 posts' );

		// First post should have yoast_head
		$this->assertArrayHasKey( 'yoast_head', $optimized_data[0], 'First post should have yoast_head' );

		// Subsequent posts should NOT have yoast_head
		$post_count = count( $optimized_data );
		for ( $i = 1; $i < $post_count; $i++ ) {
			$this->assertArrayNotHasKey( 'yoast_head', $optimized_data[ $i ], "Post {$i} should not have yoast_head" );
		}

		// Check embedded terms - only the queried category should have yoast_head
		if ( isset( $optimized_data[0]['_embedded']['wp:term'] ) ) {
			$this->assert_yoast_in_term( $optimized_data[0]['_embedded']['wp:term'], $this->test_data['news_category'], 'category' );
		}
	}

	/**
	 * Posts by author
	 * Only first post and queried author should have yoast metadata
	 */
	public function test_posts_by_author() {
		$request = new WP_REST_Request( 'GET', '/wp/v2/posts' );
		$request->set_param( 'author', $this->test_data['jane_author'] );
		$request->set_param( 'per_page', 10 );
		$request->set_param( 'optimizeYoastPayload', true );
		$request->set_param( '_embed', true );

		$data           = $this->create_manual_rest_api_data();
		$optimized_data = $this->yoast_seo->optimise_yoast_payload( $data, self::$rest_server, $request, true );

		$this->assertGreaterThanOrEqual( 2, count( $optimized_data ), 'Should return at least 2 posts' );

		// First post should have yoast_head
		$this->assertArrayHasKey( 'yoast_head', $optimized_data[0], 'First post should have yoast_head' );

		// Subsequent posts should NOT have yoast_head
		$post_count = count( $optimized_data );
		for ( $i = 1; $i < $post_count; $i++ ) {
			$this->assertArrayNotHasKey( 'yoast_head', $optimized_data[ $i ], "Post {$i} should not have yoast_head" );
		}

		// Check embedded authors - only the queried author should have yoast_head
		if ( isset( $optimized_data[0]['_embedded']['author'] ) ) {
			$author = $optimized_data[0]['_embedded']['author'][0];
			if ( $author['id'] === $this->test_data['jane_author'] ) {
				$this->assertArrayHasKey( 'yoast_head', $author, 'Queried author should have yoast_head' );
			} else {
				$this->assertArrayNotHasKey( 'yoast_head', $author, 'Non-queried author should not have yoast_head' );
			}
		}
	}

	/**
	 * Posts by category and author
	 * Only first post, queried category, and queried author should have yoast metadata
	 */
	public function test_posts_by_category_and_author() {
		$request = new WP_REST_Request( 'GET', '/wp/v2/posts' );
		$request->set_param( 'categories', $this->test_data['news_category'] );
		$request->set_param( 'author', $this->test_data['jane_author'] );
		$request->set_param( 'per_page', 10 );
		$request->set_param( 'optimizeYoastPayload', true );
		$request->set_param( '_embed', true );

		$data           = $this->create_manual_rest_api_data();
		$optimized_data = $this->yoast_seo->optimise_yoast_payload( $data, self::$rest_server, $request, true );

		$this->assertGreaterThanOrEqual( 1, count( $optimized_data ), 'Should return at least 1 post' );

		// First post should have yoast_head
		$this->assertArrayHasKey( 'yoast_head', $optimized_data[0], 'First post should have yoast_head' );

		// Subsequent posts should NOT have yoast_head
		$post_count = count( $optimized_data );
		for ( $i = 1; $i < $post_count; $i++ ) {
			$this->assertArrayNotHasKey( 'yoast_head', $optimized_data[ $i ], "Post {$i} should not have yoast_head" );
		}

		// Check embedded terms - only the queried category should have yoast_head
		if ( isset( $optimized_data[0]['_embedded']['wp:term'] ) ) {
			$this->assert_yoast_in_term( $optimized_data[0]['_embedded']['wp:term'], $this->test_data['news_category'], 'category' );
		}

		// Check embedded authors - only the queried author should have yoast_head
		if ( isset( $optimized_data[0]['_embedded']['author'] ) ) {
			$author = $optimized_data[0]['_embedded']['author'][0];
			if ( $author['id'] === $this->test_data['jane_author'] ) {
				$this->assertArrayHasKey( 'yoast_head', $author, 'Queried author should have yoast_head' );
			} else {
				$this->assertArrayNotHasKey( 'yoast_head', $author, 'Non-queried author should not have yoast_head' );
			}
		}
	}

	/**
	 * Test that optimization only runs when optimizeYoastPayload parameter is true
	 */
	public function test_optimization_only_runs_when_parameter_is_set() {
		$request = new WP_REST_Request( 'GET', '/wp/v2/posts' );
		$request->set_param( 'categories', $this->test_data['news_category'] );
		$request->set_param( 'per_page', 10 );
		$request->set_param( '_embed', true );

		$data           = $this->create_manual_rest_api_data();
		$optimized_data = $this->yoast_seo->optimise_yoast_payload( $data, self::$rest_server, $request, true );

		$this->assertEquals( $data, $optimized_data, 'Data should remain unchanged when optimizeYoastPayload is not set' );
	}

	/**
	 * Helper method to assert no yoast_head in any embedded items
	 *
	 * @param array  $embedded The embedded data
	 * @param string $message  The assertion message
	 */
	protected function assert_no_yoast_in_embedded( $embedded, $message ) {
		foreach ( $embedded as $embed_type => $embed_data ) {
			if ( is_array( $embed_data ) ) {
				foreach ( $embed_data as $item_group ) {
					$items = is_array( $item_group ) && isset( $item_group[0] ) ? $item_group : [ $item_group ];
					foreach ( $items as $item ) {
						if ( is_array( $item ) ) {
							$this->assertArrayNotHasKey( 'yoast_head', $item, $message . " (in {$embed_type})" );
						}
					}
				}
			}
		}
	}

	/**
	 * Helper method to assert yoast_head exists only in specific term
	 *
	 * @param array  $terms     The terms data
	 * @param int    $target_id The ID of the term that should have yoast_head
	 * @param string $taxonomy  The taxonomy name
	 */
	protected function assert_yoast_in_term( $terms, $target_id, $taxonomy ) {
		foreach ( $terms as $term_group ) {
			if ( is_array( $term_group ) ) {
				foreach ( $term_group as $term ) {
					if ( isset( $term['id'] ) && isset( $term['taxonomy'] ) ) {
						if ( $term['id'] === $target_id && $term['taxonomy'] === $taxonomy ) {
							$this->assertArrayHasKey( 'yoast_head', $term, "Queried {$taxonomy} should have yoast_head" );
						} else {
							$this->assertArrayNotHasKey( 'yoast_head', $term, "Non-queried {$taxonomy} should not have yoast_head" );
						}
					}
				}
			}
		}
	}
}
