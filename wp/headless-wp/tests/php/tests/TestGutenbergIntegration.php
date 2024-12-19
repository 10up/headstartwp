<?php
/**
 * Tests covering the gutenberg integration
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Tests;

use HeadlessWP\Integrations\Gutenberg;
use Yoast\PHPUnitPolyfills\TestCases\TestCase;

use WP_Block;
use WP_HTML_Tag_Processor;

/**
 * Covers the test for the Gutenberg integration
 */
class TestGutenbergIntegration extends TestCase {

	/**
	 * Data for render test processing
	 *
	 * @return array[]
	 */
	public function render_data(): array {
		return [
			'Single Tag Markup'                   => [
				<<<MARKUP
				<!-- wp:heading {"level":3} -->
				<h3 id="hello-world">Hello world</h3>
				<!-- /wp:heading -->
				MARKUP,
				[
					[
						'attributes' => [
							'level' => '3',
						],
						'inner_tags' => [],
						'name'       => 'core/heading',
						'tag'        => 'h3',
					],
				],
			],
			'Inner Blocks Markup'                 => [
				<<<MARKUP
				<!-- wp:media-text {"mediaId":28,"mediaLink":"http://localhost:8888/blocks-test/screenshot-2023-06-16-at-11-09-21/","mediaType":"image"} -->
				<div class="wp-block-media-text alignwide is-stacked-on-mobile">
					<figure class="wp-block-media-text__media"><img src="http://localhost:8888/wp-content/uploads/2023/06/Screenshot-2023-06-16-at-11.09.21-1024x725.png" alt="" class="wp-image-28 size-full"/></figure>
					<div class="wp-block-media-text__content">
					<!-- wp:paragraph {"placeholder":"Content…"} -->
						<p>Text</p>
					<!-- /wp:paragraph -->
					</div>
				</div>
				<!-- /wp:media-text -->
				MARKUP,
				[
					[
						'attributes' => [
							'mediaId'   => '28',
							'mediaLink' => 'http://localhost:8888/blocks-test/screenshot-2023-06-16-at-11-09-21/',
							'mediaType' => 'image',
						],
						'inner_tags' => [ 'figure', 'img', 'div', 'p' ],
						'name'       => 'core/media-text',
						'tag'        => 'div',
					],
				],
			],
			'Image Block Markup'                  => [
				<<<MARKUP
				<!-- wp:image {"id":28,"sizeSlug":"large","linkDestination":"none"} -->
				<figure class="wp-block-image size-large"><img src="http://localhost:8888/wp-content/uploads/2023/06/Screenshot-2023-06-16-at-11.09.21-1024x725.png" alt="" class="wp-image-28"/></figure>
				<!-- /wp:image -->
				MARKUP,
				[
					[
						'attributes' => [
							'id'              => '28',
							'linkDestination' => 'none',
							'sizeSlug'        => 'large',
						],
						'inner_tags' => [ 'img' ],
						'name'       => 'core/image',
						'tag'        => 'figure',
					],
				],
			],
			'Synced Pattern | Multi-Block Markup' => [
				<<<MARKUP
				<!-- wp:heading -->
				<h2 id="heading-anchor">Main Content Heading</h3>
				<!-- /wp:heading -->
				<!-- wp:heading {"level":3} -->
				<h3>Content Sub-heading</h3>
				<!-- /wp:heading -->
				<!-- wp:paragraph -->
				<p>Hello world</p>
				<!-- /wp:paragraph -->
				MARKUP,
				[
					[
						'attributes' => [
							'level' => '2',
						],
						'inner_tags' => [],
						'name'       => 'core/heading',
						'tag'        => 'h2',
					],
					[
						'attributes' => [
							'level' => '3',
						],
						'inner_tags' => [],
						'name'       => 'core/heading',
						'tag'        => 'h3',
					],
					[
						'attributes' => [],
						'inner_tags' => [],
						'name'       => 'core/paragraph',
						'tag'        => 'p',
					],
				],
			],

		];
	}

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
	protected function render_from_block_markup( string $markup ): array {
		$blocks   = parse_blocks( $markup );
		$block    = $blocks[0];
		$instance = new WP_Block( $block );

		return [
			'html'         => apply_filters( 'the_content', $instance->render() ),
			'parsed_block' => $block,
			'instance'     => $instance,
		];
	}

	/**
	 * Tests block's standard rendering
	 *  - Testing the exact order of attributes and spacing of the output HTML is not in the scope of this component
	 *  - Tests correct tags and attributes are created over exact HTML output
	 *
	 * @dataProvider render_data
	 *
	 * @param string $incoming Incoming HTML
	 * @param array  $expected_block_structure Expected block name and attributes
	 * @param string $process_name Assertion message process name
	 *
	 * @return void
	 */
	public function test_render( string $incoming, array $expected_block_structure, string $process_name = 'DOM Document' ) {
		$block          = $this->render_from_block_markup( trim( $incoming ) );
		$enhanced_block = $this->parser->render_block( $block['html'], $block['parsed_block'], $block['instance'] );

		$tag_processor = new WP_HTML_Tag_Processor( $enhanced_block );

		foreach ( $expected_block_structure as $expected_block ) {
			[ 'attributes' => $attributes, 'inner_tags' => $inner_tags, 'name' => $name, 'tag' => $tag ] = $expected_block;

			$this->assertTrue( $tag_processor->next_tag( [ 'tag_closers' => 'skip' ] ), "{$process_name} | Expected next tag {$tag}, none found." );

			$found_tag = strtolower( $tag_processor->get_tag() );
			$this->assertEquals( $tag, $found_tag, "{$process_name} | Expected tag {$tag}, found {$found_tag}." );
			$this->assertEquals( $name, $tag_processor->get_attribute( 'data-wp-block-name' ), "{$process_name} | Expected block {$name}." );

			$parsed_attributes = json_decode( $tag_processor->get_attribute( 'data-wp-block' ), true );

			foreach ( $attributes as $attribute => $value ) {
				$this->assertArrayHasKey( $attribute, $parsed_attributes, "{$process_name} | Expected attribute {$attribute}." );
				$this->assertEquals( $value, $parsed_attributes[ $attribute ], "{$process_name} | Expected attribute '{$attribute}' value of '{$value}'." );
			}

			foreach ( $inner_tags as $tag_name ) {
				$tag_processor->next_tag( [ 'tag_closers' => 'skip' ] );
				$this->assertEquals( $tag_name, strtolower( $tag_processor->get_tag() ), "{$process_name} | Expected internal tag {$tag_name}." );
			}
		}

		$tag_processor->next_tag( [ 'tag_closers' => 'skip' ] );
		$this->assertEmpty( $tag_processor->get_tag(), "{$process_name} | No more tags expected." );
	}

	/**
	 * Tests block's rendering with newer tag processor api
	 *  - Wrapper to run test_render with the HTML Tag API processor enabled
	 *
	 * @dataProvider render_data
	 *
	 * @param string $incoming Incoming HTML
	 * @param array  $block_structure Expected block name and attributes
	 *
	 * @return void
	 */
	public function test_render_tag_api( string $incoming, array $block_structure ) {
		add_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );

		$this->test_render( $incoming, $block_structure, 'HTML Tag API' );

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
		add_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );

		$this->test_render_classic_block();

		remove_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );
	}
}
