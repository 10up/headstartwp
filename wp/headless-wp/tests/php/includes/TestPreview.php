<?php
/**
 * Tests covering the preview functionality
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Tests;

use Exception;
use DomainException;
use HeadlessWP\Preview\PreviewLink;
use HeadlessWP\Preview\PreviewToken;
use SebastianBergmann\RecursionContext\InvalidArgumentException;
use PHPUnit\Framework\ExpectationFailedException;
use Yoast\PHPUnitPolyfills\TestCases\TestCase;

/**
 * Covers the test for the Preview functionality
 */
class TestPreview extends TestCase {

	/**
	 * The PreviewLink class parser
	 *
	 * @var PreviewLink
	 */
	protected $preview;

	/**
	 * Sets up the Test class
	 *
	 * @return void
	 */
	public function set_up() {
		$this->preview = new PreviewLink();
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
}
