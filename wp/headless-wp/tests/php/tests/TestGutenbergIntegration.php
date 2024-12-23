<?php
/**
 * Tests covering the gutenberg integration
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Tests;

use HeadlessWP\Integrations\Gutenberg;

use WP_Block;
use WP_Error;
use WP_HTML_Tag_Processor;
use WP_UnitTestCase;

/**
 * Covers the test for the Gutenberg integration
 */
class TestGutenbergIntegration extends WP_UnitTestCase {

	/**
	 * The Gutenberg parser
	 *
	 * @var Gutenberg
	 */
	public Gutenberg $parser;

	/**
	 * Sets up the Test class
	 *
	 * @return void
	 */
	public function set_up() {
		$this->parser = new Gutenberg();
	}

	/**
	 * Data for render_block test processing
	 *
	 * @return array[]
	 */
	public function render_block_data(): array {
		return [
			'Single Tag Markup'   => [
				$this->core_render_block_from_markup(
					<<<MARKUP
					<!-- wp:heading {"level":3} -->
					<h3 id="hello-world">Hello world</h3>
					<!-- /wp:heading -->
					MARKUP
				),
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
			'Inner Blocks Markup' => [
				$this->core_render_block_from_markup(
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
					MARKUP
				),
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
			'Image Block Markup'  => [
				$this->core_render_block_from_markup(
					<<<MARKUP
					<!-- wp:image {"id":28,"sizeSlug":"large","linkDestination":"none"} -->
					<figure class="wp-block-image size-large"><img src="http://localhost:8888/wp-content/uploads/2023/06/Screenshot-2023-06-16-at-11.09.21-1024x725.png" alt="" class="wp-image-28"/></figure>
					<!-- /wp:image -->
					MARKUP
				),
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
		];
	}

	/**
	 * Uses WP Core to parse and render a block from block markup
	 *
	 * @param string $markup The block markup
	 * @return array
	 */
	protected function core_render_block_from_markup( string $markup ): array {
		$blocks   = parse_blocks( $markup );
		$block    = $blocks[0];
		$instance = new WP_Block( $block );

		return [
			'html'         => apply_filters( 'the_content', render_block( $block ) ),
			'parsed_block' => $block,
			'instance'     => $instance,
		];
	}

	/**
	 * Tests rendering classic block
	 *  - Classic blocks contain raw HTML without attributes
	 *
	 * @return void
	 */
	public function test_render_classic_block() {
		$block          = $this->core_render_block_from_markup( '<h1><span style="font-weight: 400;">Introduction</span></h1><span style="font-weight: 400;">If you have read our previous article, </span>' );
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
	 * Test to ensure the parser handles both HTML and Multi-byte encodings properly
	 *
	 * @return void
	 */
	public function test_handle_multi_byte_html_encoding() {
		[ 'html' => $html, 'parsed_block' => $block, 'instance' => $instance ] =
			$this->core_render_block_from_markup(
				<<<MARKUP
				<!-- wp:paragraph -->
				<p>The temperature is 23°C ☀️ (sun emoji) and © (copyright symbol). HTML entity for Degrees: &#176;.</p>
				<!-- /wp:paragraph -->
				MARKUP
			);
		$dom_expected          = <<<RESULT
			<p data-wp-block='{"dropCap":false}' data-wp-block-name="core/paragraph">The temperature is 23&deg;C &#9728;&#65039; (sun emoji) and &copy; (copyright symbol). HTML entity for Degrees: &deg;.</p>
			RESULT;
		$html_tag_api_expected = <<<RESULT
			<p data-wp-block="{&quot;dropCap&quot;:false}" data-wp-block-name="core/paragraph">The temperature is 23&deg;C &#9728;&#65039; (sun emoji) and &copy; (copyright symbol). HTML entity for Degrees: &deg;.</p>
			RESULT;

		$dom_output = $this->parser->render_block( $html, $block, $instance );

		$this->assertSame( trim( $dom_expected ), trim( $dom_output ), 'Gutenberg | DOM Document | Test HTML Encoding' );

		add_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );

		$html_api_output = $this->parser->render_block( $html, $block, $instance );

		remove_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );

		$this->assertSame( trim( $html_tag_api_expected ), trim( $html_api_output ), 'Gutenberg | HTML Tag API | Test HTML Encoding' );
	}

	/**
	 * Tests rendering classic block with the HTML tag api
	 *
	 * @return void
	 */
	public function test_render_classic_block_html_tag_api() {
		add_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );

		$this->test_render_classic_block();

		remove_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );
	}

	/**
	 * Tests block's rendering with newer tag processor api
	 *  - Wrapper to run test_render with the HTML Tag API processor enabled
	 *
	 * @dataProvider render_block_data
	 *
	 * @param array $incoming Incoming HTML
	 * @param array $block_structure Expected block name and attributes
	 *
	 * @return void
	 */
	public function test_render_dom_document_api( array $incoming, array $block_structure ) {
		add_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_false' );

		$this->validate_processed_blocks(
			$this->parser->render_block( $incoming['html'], $incoming['parsed_block'], $incoming['instance'] ),
			$block_structure,
			'DOM Document'
		);

		remove_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_false' );
	}

	/**
	 * Tests block's rendering with newer tag processor api
	 *  - Wrapper to run test_render with the HTML Tag API processor enabled
	 *
	 * @dataProvider render_block_data
	 *
	 * @param array $incoming Incoming HTML
	 * @param array $block_structure Expected block name and attributes
	 *
	 * @return void
	 */
	public function test_render_html_tag_api( array $incoming, array $block_structure ) {
		add_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );

		$this->validate_processed_blocks(
			$this->parser->render_block( $incoming['html'], $incoming['parsed_block'], $incoming['instance'] ),
			$block_structure,
			'HTML Tag API'
		);

		remove_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );
	}

	/**
	 * Tests block's rendering Synced Patterns which use another post to store the patterns content
	 *  - Run separate to hook the Parser filter on all render_block processing, required for nested blocks
	 *
	 * @return void
	 */
	public function test_render_synced_patterns() {
		$pattern_post_id = self::factory()->post->create(
			[
				'post_author'  => 1,
				'post_type'    => 'wp_block',
				'post_status'  => 'publish',
				'post_title'   => 'Synced Pattern Test',
				'post_content' =>
					<<<MARKUP
					<!-- wp:heading -->
					<h2 id="heading-anchor">Main Content Heading</h2>
					<!-- /wp:heading -->
					<!-- wp:heading {"level":3} -->
					<h3>Content Sub-heading</h3>
					<!-- /wp:heading -->
					<!-- wp:paragraph -->
					<p>Hello world</p>
					<!-- /wp:paragraph -->
					MARKUP,
			]
		);

		$this->assertNotInstanceOf( WP_Error::class, $pattern_post_id, 'Could not create Synced Pattern post' );

		add_filter( 'render_block', [ $this->parser, 'render_block' ], 10, 3 );

		$block = $this->core_render_block_from_markup(
			<<<MARKUP
			<!-- wp:block {"ref": {$pattern_post_id}} -->
			MARKUP
		);

		$block_structure = [
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
		];

		$this->validate_processed_blocks( $block['html'], $block_structure, 'DOM Document Synced Pattern' );

		add_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );

		$html_api_block = $this->core_render_block_from_markup(
			<<<MARKUP
			<!-- wp:block {"ref": {$pattern_post_id}} -->
			MARKUP
		);

		$this->validate_processed_blocks( $html_api_block['html'], $block_structure, 'HTML Tag API Synced Pattern' );

		remove_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );

		remove_filter( 'render_block', [ $this->parser, 'render_block' ], 10 );
	}

	/**
	 * Validate the processed blocks output
	 *  - Testing the exact order of attributes and spacing of the output HTML is not in the scope of this component, and creates fragile tests
	 *  - Tests correct tags and attributes are created over exact HTML output
	 *
	 * @param string $processed_blocks Incoming HTML
	 * @param array  $expected_block_structure Expected block name and attributes
	 * @param string $process_name Assertion message process name
	 *
	 * @return void
	 */
	public function validate_processed_blocks( string $processed_blocks, array $expected_block_structure, string $process_name ) {
		$tag_processor = new WP_HTML_Tag_Processor( $processed_blocks );

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
}
