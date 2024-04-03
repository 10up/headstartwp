<?php
/**
 * Tests covering the preview functionality
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Tests;

use DateTime;
use HeadlessWP\Preview\PreviewLink;
use HeadlessWP\Preview\PreviewToken;
use WP_UnitTestCase;
use WP_Rewrite;

/**
 * Covers the test for the Preview functionality
 */
class TestPreview extends WP_UnitTestCase {

	/**
	 * The PreviewLink class parser
	 *
	 * @var PreviewLink
	 */
	protected $preview;

	/**
	 * wp_rewrite class
	 *
	 * @var WP_Rewrite
	 */
	protected $wp_rewrite;

	/**
	 * Sets up the Test class
	 *
	 * @return void
	 */
	protected function set_up() {
		parent::set_up();
		$this->preview = new PreviewLink();
		$this->preview->register();

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
	 * Tests if previwes handling can be disable
	 */
	public function test_should_handle_preview(): void {
		$this->assertTrue( $this->preview->should_handle_preview() );

		add_filter( 'tenup_headless_wp_previews_enabled', '__return_false' );

		$this->assertFalse( $this->preview->should_handle_preview() );

		remove_filter( 'tenup_headless_wp_previews_enabled', '__return_false' );
	}

	/**
	 * Tests handle_preview
	 */
	public function test_handle_review(): void {
		// it should not change the template if not in preview context
		$this->assertEquals( $this->preview->handle_preview( 'index.php' ), 'index.php' );

		// todo simulate a preview action
	}


	/**
	 * Tests the preview token generation
	 */
	public function test_preview_token_generation(): void {
		$token = PreviewToken::generate( [ 'type' => 'test_token' ] );

		$payload = (array) PreviewToken::get_payload_from_token( $token );

		$this->assertEquals( $payload['type'], 'test_token' );
	}

	/**
	 * Tests getting the token payload
	 */
	public function test_get_payload_from_token(): void {
		$token = PreviewToken::generate( [ 'type' => 'test_token' ] );

		$_SERVER['HTTP_AUTHORIZATION'] = 'Bearer ' . $token;

		$payload = (array) PreviewToken::get_payload_from_token();

		$this->assertEquals( $payload['type'], 'test_token' );

		unset( $_SERVER['HTTP_AUTHORIZATION'] );

		$_SERVER['REDIRECT_HTTP_AUTHORIZATION'] = 'Bearer ' . $token;

		$payload = (array) PreviewToken::get_payload_from_token();

		$this->assertEquals( $payload['type'], 'test_token' );

		unset( $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] );
	}

	/**
	 * Tests getting the token payload from alternative header
	 */
	public function test_get_payload_from_token_alternative_header(): void {
		$token = PreviewToken::generate( [ 'type' => 'test_token' ] );

		$_SERVER['HTTP_X_HEADSTARTWP_AUTHORIZATION'] = 'Bearer ' . $token;

		$payload = (array) PreviewToken::get_payload_from_token();

		$this->assertEquals( $payload['type'], 'test_token' );

		unset( $_SERVER['HTTP_X_HEADSTARTWP_AUTHORIZATION'] );
	}

	/**
	 * Tests draft posts links are not plain permalinks
	 */
	public function test_draft_posts_permalink(): void {
		$draft = $this->factory()->post->create_and_get(
			[
				'post_title'   => 'Draft Post',
				'post_status'  => 'draft',
				'post_content' => 'draft post',
				'post_type'    => 'post',
			]
		);

		// simulate a REST request
		$token = PreviewToken::generate(
			[
				'type'    => 'preview',
				'post_id' => $draft->ID,
			]
		);

		$_SERVER['HTTP_AUTHORIZATION'] = 'Bearer ' . $token;

		$this->assertEquals( 'http://localhost:8889/draft-post/', $this->preview->get_draft_permalink( $draft ) );

		unset( $_SERVER['HTTP_AUTHORIZATION'] );

		// without authorization it shouldn't modify permalink
		$this->assertEquals(
			'',
			$this->preview->get_draft_permalink( $draft ),
			'without authorization it should return an empty string'
		);
	}

	/**
	 * Tests draft posts links are not plain permalinks
	 */
	public function test_draft_posts_permalink_with_date(): void {
		$this->wp_rewrite->set_permalink_structure( '/%year%/%monthnum%/%day%/%postname%/' );

		$draft = $this->factory()->post->create_and_get(
			[
				'post_title'   => 'Draft Post',
				'post_status'  => 'draft',
				'post_content' => 'draft post',
				'post_type'    => 'post',
			]
		);

		$date = DateTime::createFromFormat( 'Y-m-d H:i:s', $draft->post_date );

		// simulate a REST request
		$token = PreviewToken::generate(
			[
				'type'    => 'preview',
				'post_id' => $draft->ID,
			]
		);

		$_SERVER['HTTP_AUTHORIZATION'] = 'Bearer ' . $token;

		$this->assertEquals( sprintf( 'http://localhost:8889/%s/draft-post/', $date->format( 'Y/m/d' ) ), $this->preview->get_draft_permalink( $draft ) );

		unset( $_SERVER['HTTP_AUTHORIZATION'] );

		$this->wp_rewrite->set_permalink_structure( '/%postname%/' );
	}

	/**
	 * Tests draft pages links are not plain permalinks
	 */
	public function test_draft_pages_permalink(): void {
		$draft = $this->factory()->post->create_and_get(
			[
				'post_title'   => 'Draft Page',
				'post_status'  => 'draft',
				'post_content' => 'draft Page',
				'post_type'    => 'page',
			]
		);

		// simulate a REST request
		$token = PreviewToken::generate(
			[
				'type'    => 'preview',
				'post_id' => $draft->ID,
			]
		);

		$_SERVER['HTTP_AUTHORIZATION'] = 'Bearer ' . $token;

		$this->assertEquals( 'http://localhost:8889/draft-page/', $this->preview->get_draft_permalink( $draft ) );

		unset( $_SERVER['HTTP_AUTHORIZATION'] );

		$this->assertEquals(
			'',
			$this->preview->get_draft_permalink( $draft ),
			'without authorization it should return an empty string'
		);
	}

	/**
	 * Tests draft cpts are not plain permalinks
	 */
	public function test_draft_cpt_permalink(): void {
		register_post_type( 'book', [] );

		$draft = $this->factory()->post->create_and_get(
			[
				'post_title'   => 'Draft Book',
				'post_status'  => 'draft',
				'post_content' => 'draft book',
				'post_type'    => 'book',
			]
		);

		// simulate a REST request
		$token = PreviewToken::generate(
			[
				'type'    => 'preview',
				'post_id' => $draft->ID,
			]
		);

		$_SERVER['HTTP_AUTHORIZATION'] = 'Bearer ' . $token;

		$this->assertEquals( 'http://localhost:8889/book/draft-book/', $this->preview->get_draft_permalink( $draft ) );

		unset( $_SERVER['HTTP_AUTHORIZATION'] );

		$this->assertEquals(
			'',
			$this->preview->get_draft_permalink( $draft ),
			'without authorization it should return an empty string'
		);
	}

	/**
	 * Tests draft cpts with custom rewrite rules are not plain permalinks
	 */
	public function test_draft_cpt_custom_permalink(): void {
		register_post_type( 'news', [] );
		register_taxonomy_for_object_type( 'category', 'news' );

		$category = $this->factory()->term->create_and_get(
			[
				'taxonomy' => 'category',
			]
		);

		$draft = $this->factory()->post->create_and_get(
			[
				'post_title'    => 'Draft new',
				'post_status'   => 'draft',
				'post_content'  => 'draft new',
				'post_type'     => 'news',
				'post_category' => [ $category->term_id ],
			]
		);

		add_filter(
			'post_type_link',
			function ( $post_link, $post ) {
				if ( 'news' !== $post->post_type ) {
					return $post_link;
				}

				$post_name = empty( $post->post_name ) ? '%postname%' : $post->post_name;

				$fallback = esc_url( home_url( sprintf( 'newsroom/%s', $post_name ) ) );

				$news_types = wp_get_post_terms( $post->ID, 'category', [ 'fields' => 'slugs' ] );

				if (
				is_wp_error( $news_types ) ||
				! is_array( $news_types ) ||
				( [] === $news_types ) > 0
				) {
					return $fallback;
				}

				return esc_url( home_url( sprintf( 'newsroom/%s/%s', $news_types[0], $post_name ) ) );
			},
			10,
			2
		);

		// simulate a REST request
		$token = PreviewToken::generate(
			[
				'type'    => 'preview',
				'post_id' => $draft->ID,
			]
		);

		$_SERVER['HTTP_AUTHORIZATION'] = 'Bearer ' . $token;

		$this->assertEquals( sprintf( 'http://localhost:8889/newsroom/%s/draft-new', $category->slug ), $this->preview->get_draft_permalink( $draft ) );

		unset( $_SERVER['HTTP_AUTHORIZATION'] );
	}
}
