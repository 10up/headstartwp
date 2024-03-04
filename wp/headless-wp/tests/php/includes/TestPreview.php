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
	 * @var \WP_Rewrite
	 */
	protected $wp_rewrite;

	/**
	 * Sets up the Test class
	 *
	 * @return void
	 */
	public function set_up() {
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
	 *
	 * @return void
	 */
	public function test_should_handle_preview() {
		$this->assertTrue( $this->preview->should_handle_preview() );

		add_filter( 'tenup_headless_wp_previews_enabled', '__return_false' );

		$this->assertFalse( $this->preview->should_handle_preview() );

		remove_filter( 'tenup_headless_wp_previews_enabled', '__return_false' );
	}

	/**
	 * Tests handle_preview
	 *
	 * @return void
	 */
	public function test_handle_review() {
		// it should not change the template if not in preview context
		$this->assertEquals( $this->preview->handle_preview( 'index.php' ), 'index.php' );

		// todo simulate a preview action
	}


	/**
	 * Tests the preview token generation
	 *
	 * @return void
	 */
	public function test_preview_token_generation() {
		$token = PreviewToken::generate( [ 'type' => 'test_token' ] );

		$payload = (array) PreviewToken::get_payload_from_token( $token );

		$this->assertEquals( $payload['type'], 'test_token' );
	}

	/**
	 * Tests getting the token payload
	 *
	 * @return void
	 */
	public function test_get_payload_from_token() {
		$token = PreviewToken::generate( [ 'type' => 'test_token' ] );

		$_SERVER['HTTP_AUTHORIZATION'] = "Bearer $token";

		$payload = (array) PreviewToken::get_payload_from_token();

		$this->assertEquals( $payload['type'], 'test_token' );

		unset( $_SERVER['HTTP_AUTHORIZATION'] );

		$_SERVER['REDIRECT_HTTP_AUTHORIZATION'] = "Bearer $token";

		$payload = (array) PreviewToken::get_payload_from_token();

		$this->assertEquals( $payload['type'], 'test_token' );

		unset( $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] );
	}

	/**
	 * Tests getting the token payload from alternative header
	 *
	 * @return void
	 */
	public function test_get_payload_from_token_alternative_header() {
		$token = PreviewToken::generate( [ 'type' => 'test_token' ] );

		$_SERVER['HTTP_X_HEADSTARTWP_AUTHORIZATION'] = "Bearer $token";

		$payload = (array) PreviewToken::get_payload_from_token();

		$this->assertEquals( $payload['type'], 'test_token' );

		unset( $_SERVER['HTTP_X_HEADSTARTWP_AUTHORIZATION'] );
	}

	/**
	 * Tests draft posts links are not plain permalinks
	 *
	 * @return void
	 */
	public function test_draft_posts_permalink() {
		$draft = $this->factory()->post->create_and_get(
			[
				'post_title'   => 'Draft Post',
				'post_status'  => 'draft',
				'post_content' => 'draf post',
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

		$_SERVER['HTTP_AUTHORIZATION'] = "Bearer $token";

		$this->assertEquals( 'http://localhost:8889/draft-post/', get_permalink( $draft ) );

		unset( $_SERVER['HTTP_AUTHORIZATION'] );

		// without authorization it shouldn't modify permalink
		$this->assertEquals(
			"http://localhost:8889/?p=$draft->ID",
			get_permalink( $draft ),
			"without authorization it shouldn't modify permalink"
		);
	}

	/**
	 * Tests draft posts links are not plain permalinks
	 *
	 * @return void
	 */
	public function test_draft_posts_permalink_with_date() {
		$this->wp_rewrite->set_permalink_structure( '/%year%/%monthnum%/%day%/%postname%/' );

		$draft = $this->factory()->post->create_and_get(
			[
				'post_title'   => 'Draft Post',
				'post_status'  => 'draft',
				'post_content' => 'draf post',
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

		$_SERVER['HTTP_AUTHORIZATION'] = "Bearer $token";

		$this->assertEquals( "http://localhost:8889/{$date->format('Y/m/d')}/draft-post/", get_permalink( $draft ) );

		unset( $_SERVER['HTTP_AUTHORIZATION'] );

		$this->wp_rewrite->set_permalink_structure( '/%postname%/' );
	}

	/**
	 * Tests draft pages links are not plain permalinks
	 *
	 * @return void
	 */
	public function test_draft_pages_permalink() {
		$draft = $this->factory()->post->create_and_get(
			[
				'post_title'   => 'Draft Page',
				'post_status'  => 'draft',
				'post_content' => 'draf Page',
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

		$_SERVER['HTTP_AUTHORIZATION'] = "Bearer $token";

		$this->assertEquals( 'http://localhost:8889/draft-page/', get_permalink( $draft ) );

		unset( $_SERVER['HTTP_AUTHORIZATION'] );

		$this->assertEquals( "http://localhost:8889/?page_id=$draft->ID", get_permalink( $draft ) );
	}

	/**
	 * Tests draft cpts are not plain permalinks
	 *
	 * @return void
	 */
	public function test_draft_cpt_permalink() {
		register_post_type( 'book', [] );

		$draft = $this->factory()->post->create_and_get(
			[
				'post_title'   => 'Draft Book',
				'post_status'  => 'draft',
				'post_content' => 'draf book',
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

		$_SERVER['HTTP_AUTHORIZATION'] = "Bearer $token";

		$this->assertEquals( 'http://localhost:8889/book/draft-book/', get_permalink( $draft ) );

		unset( $_SERVER['HTTP_AUTHORIZATION'] );

		$this->assertEquals( "http://localhost:8889/?post_type=book&p=$draft->ID", get_permalink( $draft ) );
	}
}
