<?php
/**
 * Tests covering the preview functionality
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Tests;

use HeadlessWP\Preview\PreviewLink;
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
	 */
	protected function set_up(): void {
		$this->preview = new PreviewLink();
	}

	/**
	 * Tests if previews handling can be disable
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
}
