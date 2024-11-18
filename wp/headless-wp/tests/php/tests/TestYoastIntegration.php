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
	 * The category id
	 *
	 * @var int
	 */
	protected $category_id;

	/**
	 * The tag id
	 *
	 * @var int
	 */
	protected $tag_id;

	/**
	 * The author id
	 *
	 * @var int
	 */
	protected $author_id;

	/**
	 * Sets up the Test class
	 *
	 * @return void
	 */
	public function set_up() {
		parent::set_up();

		$this->yoast_seo = new YoastSEO();
		$this->yoast_seo->register();
		self::$rest_server = rest_get_server();

		$this->create_posts();
	}

	/**
	 * Create posts for testing
	 */
	protected function create_posts() {
		$this->category_id = $this->factory()->term->create(
			[
				'taxonomy' => 'category',
				'slug'     => 'test-category',
			]
		);
		$this->tag_id      = $this->factory()->term->create(
			[
				'taxonomy' => 'post_tag',
				'slug'     => 'test-post-tag',
			]
		);
		$this->author_id   = $this->factory()->user->create(
			[
				'role'         => 'editor',
				'user_login'   => 'test_author',
				'user_pass'    => 'password',
				'user_email'   => 'testauthor@example.com',
				'display_name' => 'Test Author',
			]
		);

		$random_category_id = $this->factory()->term->create(
			[
				'taxonomy' => 'category',
				'slug'     => 'random-category',
			]
		);
		$random_tag_id      = $this->factory()->term->create(
			[
				'taxonomy' => 'post_tag',
				'slug'     => 'random-post-tag',
			]
		);

		$post_1 = $this->factory()->post->create_and_get(
			[
				'post_type'   => 'post',
				'post_status' => 'publish',
				'post_author' => $this->author_id,
			]
		);

		$post_2 = $this->factory()->post->create_and_get(
			[
				'post_type'   => 'post',
				'post_status' => 'publish',
				'post_author' => $this->author_id,
			]
		);

		wp_set_post_terms( $post_1->ID, [ $this->category_id, $random_category_id ], 'category' );
		wp_set_post_terms( $post_2->ID, [ $this->category_id, $random_category_id ], 'category' );
		wp_set_post_terms( $post_1->ID, [ $this->tag_id, $random_tag_id ], 'post_tag' );
		wp_set_post_terms( $post_2->ID, [ $this->tag_id, $random_tag_id ], 'post_tag' );
	}

	/**
	 * Tests optimising the Yoast SEO payload in REST API responses.
	 *
	 * @return void
	 */
	public function test_optimise_yoast_payload() {

		// Perform a REST API request for the posts by category.
		$result_category = $this->get_posts_by_with_optimised_response( 'categories', $this->category_id );
		$this->assert_yoast_head_in_response( $result_category );

		// Perform a REST API request for the posts by tag.
		// $result_tag = $this->get_posts_by_with_optimised_response( 'tags', $this->tag_id );
		// $this->assert_yoast_head_in_response( $result_tag );

		// Perform a REST API request for the posts by author.
		// $result_author = $this->get_posts_by_with_optimised_response( 'author', $this->author_id );
		// $this->assert_yoast_head_in_response( $$result_author );
	}

	/**
	 * Get the optimised response from headstartwp Yoast integration by param. (category, author)
	 *
	 * @param string     $param The param to filter by (category, author)
	 * @param int|string $value The value of the param
	 *
	 * @return \WP_REST_Response
	 */
	protected function get_posts_by_with_optimised_response( $param, $value ) {

		$request = new WP_REST_Request( 'GET', '/wp/v2/posts' );
		$request->set_param( $param, $value );
		$request->set_param( 'optimizeYoastPayload', true );
		$request->set_param( '_embed', true );

		$response = rest_do_request( $request );
		$data     = self::$rest_server->response_to_data( $response, true );

		$this->assertGreaterThanOrEqual( 2, count( $data ), 'There should be at least two posts returned.' );

		return $this->yoast_seo->optimise_yoast_payload( $data, self::$rest_server, $request, true );
	}

	/**
	 * Asserts the presence of yoast_head in the response for each post.
	 *
	 * @param array $result The response data containing posts.
	 * @return void
	 */
	protected function assert_yoast_head_in_response( $result ) {
		$first_post = true;

		foreach ( $result as $post ) {

			$this->assertArrayHasKey( '_embedded', $post, 'The _embedded key should exist in the response.' );
			$this->assertArrayHasKey( 'wp:term', $post['_embedded'], 'The wp:term in _embedded key should exist in the response.' );
			$this->assertArrayHasKey( 'author', $post['_embedded'], 'The author in _embedded key should exist in the response.' );

			$this->assert_embedded_item( $post['_embedded'], 'wp:term', $first_post, $this->category_id );
			$this->assert_embedded_item( $post['_embedded'], 'author', $first_post, null );

			$first_post = false;
		}
	}

	/**
	 * Asserts the presence of yoast_head of the expected embedded item in the response.
	 *
	 * @param array  $embedded_obj The embedded object containing the items.
	 * @param string $type         The type of embedded item to check.
	 * @param bool   $first_post   Whether it is the first post in the response.
	 * @param int    $id           The ID of the item to check
	 * @return void
	 */
	protected function assert_embedded_item( $embedded_obj, $type, $first_post, $id = null ) {

		foreach ( $embedded_obj[ $type ] as $group ) {

			$items = 'wp:term' !== $type ? [ $group ] : $group;

			foreach ( $items as $item ) {

				if ( $first_post && $item['id'] === $id ) {
					$this->assertArrayHasKey( 'yoast_head', $item, 'The requested ' . $type . ' should have yoast_head in the response for the first post.' );
				} else {
					$this->assertArrayNotHasKey( 'yoast_head', $item, 'yoast_head in ' . $type . ' should not be present for posts other than the first post and if not requested.' );
				}
			}
		}
	}
}
