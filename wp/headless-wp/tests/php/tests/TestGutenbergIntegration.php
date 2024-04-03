<?php
/**
 * Tests covering the gutenberg integration
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Tests;

use HeadlessWP\Integrations\Gutenberg;
use Yoast\PHPUnitPolyfills\TestCases\TestCase;

/**
 * Covers the test for the Gutenberg integration
 */
class TestGutenbergIntegration extends TestCase {

	/**
	 * The Gutenberg parser
	 *
	 * @var Gutenberg
	 */
	protected $parser;

	/**
	 * Sets up the Test class
	 *
	 * @return void
	 */
	public function set_up() {
		$this->parser = new Gutenberg();
	}

	/**
	 * Renders a block from block markup
	 *
	 * @param string $markup The block markup
	 * @return array
	 */
	protected function render_from_block_markup( $markup ) {
		$blocks = parse_blocks( $markup );
		$block  = $blocks[0];

		return [
			'html'         => apply_filters( 'the_content', render_block( $block ) ),
			'parsed_block' => $block,
			'instance'     => new \WP_Block( $block ),
		];
	}

	/**
	 * Tests block's rendering
	 *
	 * @return void
	 */
	public function test_render() {
		$block          = $this->render_from_block_markup( '<!-- wp:heading {"level":3} --> <h3 id="hello-world">Hello world</h3><!-- /wp:heading -->' );
		$enhanced_block = $this->parser->render_block( $block['html'], $block['parsed_block'], $block['instance'] );

		$this->assertEquals(
			trim( $enhanced_block ),
			'<h3 class="wp-block-heading" id="hello-world" data-wp-block=\'{"level":3}\' data-wp-block-name="core/heading">Hello world</h3>'
		);

		$markup = <<<MARKUP
		<!-- wp:image {"id":28,"sizeSlug":"large","linkDestination":"none"} -->
		<figure class="wp-block-image size-large"><img src="http://localhost:8888/wp-content/uploads/2023/06/Screenshot-2023-06-16-at-11.09.21-1024x725.png" alt="" class="wp-image-28"/></figure>
		<!-- /wp:image -->
MARKUP;

		$block          = $this->render_from_block_markup( trim( $markup ) );
		$enhanced_block = $this->parser->render_block( $block['html'], $block['parsed_block'], $block['instance'] );

		$result = <<<MARKUP
		<figure class="wp-block-image size-large" data-wp-block='{"id":28,"sizeSlug":"large","linkDestination":"none","alt":""}' data-wp-block-name="core/image"><img decoding="async" src="http://localhost:8888/wp-content/uploads/2023/06/Screenshot-2023-06-16-at-11.09.21-1024x725.png" alt="" class="wp-image-28"></figure>
MARKUP;

		$this->assertEquals(
			trim( $enhanced_block ),
			trim( $result )
		);

		$markup = <<<MARKUP
		<!-- wp:media-text {"mediaId":28,"mediaLink":"http://localhost:8888/blocks-test/screenshot-2023-06-16-at-11-09-21/","mediaType":"image"} -->
		<div class="wp-block-media-text alignwide is-stacked-on-mobile">
			<figure class="wp-block-media-text__media">
				<img src="http://localhost:8888/wp-content/uploads/2023/06/Screenshot-2023-06-16-at-11.09.21-1024x725.png" alt="" class="wp-image-28 size-full"/>
			</figure>
			<div class="wp-block-media-text__content">
			<!-- wp:paragraph {"placeholder":"Content…"} -->
				<p>Text</p>
			<!-- /wp:paragraph -->
			</div>
		</div>
		<!-- /wp:media-text -->
MARKUP;

		$block          = $this->render_from_block_markup( trim( $markup ) );
		$enhanced_block = $this->parser->render_block( $block['html'], $block['parsed_block'], $block['instance'] );

		$enhanced_block_doc = new \WP_HTML_Tag_Processor( $enhanced_block );

		$this->assertTrue( $enhanced_block_doc->next_tag() );
		$this->assertEquals( $enhanced_block_doc->get_attribute( 'data-wp-block-name' ), 'core/media-text' );
		$this->assertArrayHasKey( 'mediaId', json_decode( $enhanced_block_doc->get_attribute( 'data-wp-block' ), true ) );
	}

	/**
	 * Tests block's rendering with tag api
	 *
	 * @return void
	 */
	public function test_render_tag_api() {
		apply_filters( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );

		$this->test_render();

		remove_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );
	}

	/**
	 * Tests rendering classic block
	 *
	 * @return void
	 */
	public function test_render_classic_block() {
		$block          = $this->render_from_block_markup( '<h1><span style="font-weight: 400;">Introduction</span></h1><span style="font-weight: 400;">If you have read our previous article, </span>' );
		$enhanced_block = $this->parser->render_block( $block['html'], $block['parsed_block'], $block['instance'] );

		$result = <<<RESULT
		<h1><span style="font-weight: 400;">Introduction</span></h1>
<p><span style="font-weight: 400;">If you have read our previous article, </span></p>
RESULT;

		$this->assertEquals(
			trim( $enhanced_block ),
			trim( $result )
		);
	}

	/**
	 * Tests rendering classic block with tag api
	 *
	 * @return void
	 */
	public function test_render_classic_block_tag_api() {
		apply_filters( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );

		$this->test_render_classic_block();

		remove_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );
	}
}
