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
			<p data-wp-block-name="core/paragraph" data-wp-block='{"dropCap":false}'>The temperature is 23&deg;C &#9728;&#65039; (sun emoji) and &copy; (copyright symbol). HTML entity for Degrees: &deg;.</p>
			RESULT;
		$html_tag_api_expected = <<<RESULT
			<p data-wp-block-name="core/paragraph" data-wp-block="{&quot;dropCap&quot;:false}">The temperature is 23&deg;C &#9728;&#65039; (sun emoji) and &copy; (copyright symbol). HTML entity for Degrees: &deg;.</p>
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
	 * Tests that all uploaded images have width and height attributes when rendered
	 *
	 * @return void
	 */
	public function test_ensure_image_width_height() {
		$post          = $this->factory()->post->create_and_get();
		$attachment_id = $this->factory()->attachment->create_upload_object( __DIR__ . '/assets/dummy-image.png', $post->ID );
		$src           = wp_get_attachment_image_url( $attachment_id, 'full' );

		// Test with filter disabled (default)
		$block          = $this->core_render_block_from_markup( "<!-- wp:image {} --> <figure class=\"wp-block-image\"><img src=\"$src\" alt=\"\"/></figure> <!-- /wp:image -->" );
		$enhanced_block = $this->parser->ensure_image_has_dimensions( $block['html'], $block['parsed_block'] );

		$doc = new WP_HTML_Tag_Processor( $enhanced_block );
		$doc->next_tag( 'img' );

		$this->assertNull( $doc->get_attribute( 'width' ) );
		$this->assertNull( $doc->get_attribute( 'height' ) );

		// Test with filter enabled
		add_filter( 'tenup_headless_wp_ensure_image_dimensions', '__return_true' );

		$block          = $this->core_render_block_from_markup( "<!-- wp:image {} --> <figure class=\"wp-block-image\"><img src=\"$src\" alt=\"\"/></figure> <!-- /wp:image -->" );
		$enhanced_block = $this->parser->ensure_image_has_dimensions( $block['html'], $block['parsed_block'] );

		$doc = new WP_HTML_Tag_Processor( $enhanced_block );
		$doc->next_tag( 'img' );

		$this->assertEquals( $doc->get_attribute( 'width' ), 213 );
		$this->assertEquals( $doc->get_attribute( 'height' ), 237 );

		// Clean up
		remove_filter( 'tenup_headless_wp_ensure_image_dimensions', '__return_true' );

		// simulate an image with dimensions
		$block = $this->core_render_block_from_markup( "<!-- wp:image {\"id\":$attachment_id} --> <figure class=\"wp-block-image\"><img class=\"wp-image-$attachment_id\" src=\"$src\" alt=\"\"/></figure> <!-- /wp:image -->" );
		$doc   = new WP_HTML_Tag_Processor( $block['html'] );
		$doc->next_tag( 'img' );

		$this->assertEquals( $doc->get_attribute( 'width' ), 213 );
		$this->assertEquals( $doc->get_attribute( 'height' ), 237 );

		// simulate an image with hardcoded width and height
		$block          = $this->core_render_block_from_markup( "<!-- wp:image {} --> <figure class=\"wp-block-image\"><img src=\"$src\" alt=\"\" width=\"215\" height=\"235\"/></figure> <!-- /wp:image -->" );
		$enhanced_block = $this->parser->ensure_image_has_dimensions( $block['html'], $block['parsed_block'] );

		$doc = new WP_HTML_Tag_Processor( $enhanced_block );
		$doc->next_tag( 'img' );

		$this->assertEquals( $doc->get_attribute( 'width' ), 215 );
		$this->assertEquals( $doc->get_attribute( 'height' ), 235 );

		// simulate an external image
		$block          = $this->core_render_block_from_markup( '<!-- wp:image {} --> <figure class="wp-block-image"><img src="https://example.com/image.png" alt=""/></figure> <!-- /wp:image -->' );
		$enhanced_block = $this->parser->ensure_image_has_dimensions( $block['html'], $block['parsed_block'] );

		$doc = new WP_HTML_Tag_Processor( $enhanced_block );
		$doc->next_tag( 'img' );

		$this->assertNull( $doc->get_attribute( 'width' ) );
		$this->assertNull( $doc->get_attribute( 'height' ) );
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
	 * Tests that HTML entities in block attributes are preserved correctly with tag processor
	 *
	 * @return void
	 */
	public function test_html_entities_are_double_encoded() {
		// Test with content containing HTML entities
		// (and a ' to ensure that it is not serialized as a single-quote string
		// by WP_HTML_Tag_Processor)
		$markup         = '<!-- wp:heading {"content":"&lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;\'","level":2} -->content<!-- /wp:heading -->';
		$block          = $this->core_render_block_from_markup( $markup );
		$enhanced_block = $this->parser->render_block( $block['html'], $block['parsed_block'], $block['instance'] );

		// Any HTML entities in JSON strings should be double-encoded
		$this->assertStringContainsString(
			'data-wp-block="{&quot;content&quot;:&quot;&amp;lt;script&amp;gt;alert(&amp;#039;xss&amp;#039;)&amp;lt;\/script&amp;gt;',
			$enhanced_block
		);
	}

	/**
	 * Tests that HTML entities in block attributes are preserved correctly with tag processor
	 *
	 * @return void
	 */
	public function test_html_entities_are_double_encoded_using_WP_HTML_Tag_Processor() {
		add_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );
		$this->test_html_entities_are_double_encoded();
		remove_filter( 'tenup_headless_wp_render_block_use_tag_processor', '__return_true' );
	}

	/**
	 * Data provider for block roundtrip tests
	 *
	 * @return array
	 */
	public function block_roundtrip_data_provider() {
		$test_cases                               = [
			'block value containing no special characters' => [
				'core/heading',
				[
					'x'     => 'hi',
					'level' => 2,
				],
				'<!-- wp:heading {"x":"hi"} --> <h2></h2> <!-- /wp:heading -->',
			],
			'block value containing named character reference &apos;' => [
				'core/heading',
				[
					'x'     => '&apos;',
					'level' => 2,
				],
				'<!-- wp:heading {"x":"&apos;"} --> <h2></h2> <!-- /wp:heading -->',
			],
			'block value containing lone apostrophe \' (from ENT_HTML5)' => [
				'core/heading',
				[
					'x'     => '\'',
					'level' => 2,
				],
				'<!-- wp:heading {"x":"\'"} --> <h2></h2> <!-- /wp:heading -->',
			],
			'block value containing lone quote " (from ENT_COMPAT)' => [
				'core/heading',
				[
					'x'     => '"',
					'level' => 2,
				],
				'<!-- wp:heading {"x":"\\""} --> <h2></h2> <!-- /wp:heading -->',
			],
			'block value containing named character reference &quot;' => [
				'core/heading',
				[
					'x'     => '&quot;',
					'level' => 2,
				],
				'<!-- wp:heading {"x":"&quot;"} --> <h2></h2> <!-- /wp:heading -->',
			],
			'block value containing lone ampersand &'      => [
				'core/heading',
				[
					'x'     => '&',
					'level' => 2,
				],
				'<!-- wp:heading {"x":"&"} --> <h2></h2> <!-- /wp:heading -->',
			],
			'block value containing named character reference &amp;' => [
				'core/heading',
				[
					'x'     => '&amp;',
					'level' => 2,
				],
				'<!-- wp:heading {"x":"&amp;"} --> <h2></h2> <!-- /wp:heading -->',
			],
			'block value containing hexadecimal numeric character reference &#x26; (should not be converted to &amp;)' => [
				'core/heading',
				[
					'x'     => '&#x26;',
					'level' => 2,
				],
				'<!-- wp:heading {"x":"&#x26;"} --> <h2></h2> <!-- /wp:heading -->',
			],
			'block value containing leading zero hexadecimal numeric character reference &#x026; (should not be converted to &amp;)' => [
				'core/heading',
				[
					'x'     => '&#x026;',
					'level' => 2,
				],
				'<!-- wp:heading {"x":"&#x026;"} --> <h2></h2> <!-- /wp:heading -->',
			],
			'block value containing decimal numeric character reference &#38; (should not be converted to &amp;)' => [
				'core/heading',
				[
					'x'     => '&#38;',
					'level' => 2,
				],
				'<!-- wp:heading {"x":"&#38;"} --> <h2></h2> <!-- /wp:heading -->',
			],
			'block value containing leading zero decimal numeric character reference &#038; (should not be converted to &amp;)' => [
				'core/heading',
				[
					'x'     => '&#038;',
					'level' => 2,
				],
				'<!-- wp:heading {"x":"&#038;"} --> <h2></h2> <!-- /wp:heading -->',
			],
			'html_entities'                                => [
				'core/heading',
				[
					'content' => '&lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;',
					'level'   => 2,
				],
				'<!-- wp:heading {"content":"&lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;","level":2} --> <h2>&lt;script&gt;alert(\'xss\')&lt;/script&gt;</h2><!-- /wp:heading -->',
			],
			'complex_attributes'                           => [
				'core/image',
				[
					'id'              => 28,
					'sizeSlug'        => 'large',
					'linkDestination' => 'none',
					'alt'             => '',
				],
				'<!-- wp:image {"id":28,"sizeSlug":"large","linkDestination":"none"} --> <figure class="wp-block-image size-large"><img src="http://example.com/image.jpg" alt="" class="wp-image-28"/></figure><!-- /wp:image -->',
			],
			'special_characters'                           => [
				'core/quote',
				[
					'citation' => 'Author "Name" & Co.',
					'value'    => '<p>Quote with "quotes" & ampersands</p>',
				],
				'<!-- wp:quote {"citation":"Author \"Name\" & Co.","value":"<p>Quote with \"quotes\" & ampersands</p>"} --> <blockquote><p>Quote with "quotes" & ampersands</p><cite>Author "Name" & Co.</cite></blockquote><!-- /wp:quote -->',
			],
		];
		$test_cases_with_or_without_tag_processor = [];
		foreach ( $test_cases as $name => $case ) {
			$test_cases_with_or_without_tag_processor[ "$name with WP_HTML_Tag_Processor" ] = array_merge( $case, [ true ] );
			$test_cases_with_or_without_tag_processor[ "$name with DomDocument" ]           = array_merge( $case, [ false ] );
		}
		return $test_cases_with_or_without_tag_processor;
	}

	/**
	 * Tests that block attributes can be round-tripped correctly
	 *
	 * @dataProvider block_roundtrip_data_provider
	 *
	 * @param string $expected_block_name The expected block name
	 * @param array  $expected_attributes The expected block attributes
	 * @param string $markup The block markup to test
	 * @param bool   $use_tag_processor Whether to use the tag processor
	 * @return void
	 */
	public function test_block_attributes_roundtrip( $expected_block_name, $expected_attributes, $markup, $use_tag_processor ) {
		$block                  = $this->core_render_block_from_markup( $markup );
		$tag_processor_function = $use_tag_processor ? '__return_true' : '__return_false';
		add_filter( 'tenup_headless_wp_render_block_use_tag_processor', $tag_processor_function );
		try {
			$enhanced_block = $this->parser->render_block( $block['html'], $block['parsed_block'], $block['instance'] );
		} finally {
			remove_filter( 'tenup_headless_wp_render_block_use_tag_processor', $tag_processor_function );
		}

		// Parse the enhanced block using DOMDocument to extract data-wp-block and data-wp-block-name
		$doc     = new \DOMDocument();
		$success = $doc->loadHTML( $enhanced_block, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );

		$this->assertTrue( $success, 'DOMDocument should successfully parse the enhanced block HTML' );

		// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		$root_element = $doc->documentElement;
		$this->assertNotNull( $root_element, 'Should have a root element' );

		$block_name_attr = $root_element->getAttribute( 'data-wp-block-name' );
		$block_data_attr = $root_element->getAttribute( 'data-wp-block' );

		$this->assertNotEmpty( $block_name_attr, 'data-wp-block-name attribute should be present' );
		$this->assertNotEmpty( $block_data_attr, 'data-wp-block attribute should be present' );

		// Parse JSON - DOMDocument should have already handled HTML entity decoding
		$parsed_attributes = json_decode( $block_data_attr, true );

		$this->assertIsArray( $parsed_attributes, 'Block data should decode to valid JSON array' );
		$this->assertEquals( $expected_block_name, $block_name_attr, 'Block name should match expected' );
		$this->assertEquals( $expected_attributes, $parsed_attributes, 'Block attributes should match expected (encoded: ' . $enhanced_block . ')' );
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

	/**
	 * Test extend_post_content method returns early when content field doesn't exist
	 *
	 * @return void
	 */
	public function test_extend_post_content_returns_early_when_no_content_field() {
		$response       = new \WP_REST_Response();
		$response->data = [ 'title' => 'Test Post' ]; // No content field

		$post_id = self::factory()->post->create(
			[
				'post_content' => '<!-- wp:paragraph --><p>Test content</p><!-- /wp:paragraph -->',
			]
		);
		$post    = get_post( $post_id );

		$request = new \WP_REST_Request( 'GET', '/wp/v2/posts/' . $post_id );

		$result = $this->parser->extend_post_content( $response, $post, $request );

		$this->assertSame( $response, $result );
		$this->assertArrayNotHasKey( 'content', $response->data );
	}

	/**
	 * Test extend_post_content method returns early when rendered content doesn't exist
	 *
	 * @return void
	 */
	public function test_extend_post_content_returns_early_when_no_rendered_content() {
		$response       = new \WP_REST_Response();
		$response->data = [
			'title'   => 'Test Post',
			'content' => [ 'raw' => 'Test content' ], // No rendered field
		];

		$post_id = self::factory()->post->create(
			[
				'post_content' => '<!-- wp:paragraph --><p>Test content</p><!-- /wp:paragraph -->',
			]
		);
		$post    = get_post( $post_id );

		$request = new \WP_REST_Request( 'GET', '/wp/v2/posts/' . $post_id );

		$result = $this->parser->extend_post_content( $response, $post, $request );

		$this->assertSame( $response, $result );
		$this->assertArrayNotHasKey( 'block_styles', $response->data['content'] );
	}

	/**
	 * Test extend_post_content method successfully adds block_styles field
	 *
	 * @return void
	 */
	public function test_extend_post_content_adds_block_styles() {
		$response       = new \WP_REST_Response();
		$response->data = [
			'title'   => 'Test Post',
			'content' => [
				'raw'      => '<!-- wp:paragraph --><p>Test content</p><!-- /wp:paragraph -->',
				'rendered' => '<p>Test content</p>',
			],
		];

		$post_id = self::factory()->post->create( [ 'post_content' => '<!-- wp:paragraph --><p>Test content</p><!-- /wp:paragraph -->' ] ); // phpcs:ignore Generic.Files.LineLength.TooLong
		$post    = get_post( $post_id );

		$request = new \WP_REST_Request( 'GET', '/wp/v2/posts/' . $post_id );
		$request->set_param( 'context', 'view' );
		$request->set_param( 'id', $post_id );

		$result = $this->parser->extend_post_content( $response, $post, $request );

		$this->assertSame( $response, $result );
		$this->assertArrayHasKey( 'block_styles', $response->data['content'] );
		$this->assertIsString( $response->data['content']['block_styles'] );
	}

	/**
	 * Test extend_post_content method preserves existing content fields
	 *
	 * @return void
	 */
	public function test_extend_post_content_preserves_existing_content_fields() {
		$response       = new \WP_REST_Response();
		$response->data = [
			'title'   => 'Test Post',
			'content' => [
				'raw'       => '<!-- wp:paragraph --><p>Test content</p><!-- /wp:paragraph -->',
				'rendered'  => '<p>Test content</p>',
				'protected' => false,
			],
		];

		$post_id = self::factory()->post->create( [ 'post_content' => '<!-- wp:paragraph --><p>Test content</p><!-- /wp:paragraph -->' ] ); // phpcs:ignore Generic.Files.LineLength.TooLong
		$post    = get_post( $post_id );

		$request = new \WP_REST_Request( 'GET', '/wp/v2/posts/' . $post_id );
		$request->set_param( 'context', 'view' );
		$request->set_param( 'id', $post_id );

		$result = $this->parser->extend_post_content( $response, $post, $request );

		$this->assertSame( $response, $result );

		// Check that existing fields are preserved
		$this->assertArrayHasKey( 'raw', $response->data['content'] );
		$this->assertArrayHasKey( 'rendered', $response->data['content'] );
		$this->assertArrayHasKey( 'protected', $response->data['content'] );

		// Check that new field is added
		$this->assertArrayHasKey( 'block_styles', $response->data['content'] );
		$this->assertIsString( $response->data['content']['block_styles'] );
	}

	/**
	 * Test extend_post_content method outputs actual block styles for grid layout
	 *
	 * @return void
	 */
	public function test_extend_post_content_outputs_grid_block_styles() {
		$grid_content = '<!-- wp:group {"layout":{"type":"grid","minimumColumnWidth":"12rem"}} -->'
			. '<div class="wp-block-group">'
			. '<!-- wp:paragraph --><p>Grid item 1</p><!-- /wp:paragraph -->'
			. '<!-- wp:paragraph --><p>Grid item 2</p><!-- /wp:paragraph -->'
			. '</div>'
			. '<!-- /wp:group -->';

		$post_id = self::factory()->post->create( [ 'post_content' => $grid_content ] ); // phpcs:ignore Generic.Files.LineLength.TooLong
		$post    = get_post( $post_id );

		$request = new \WP_REST_Request( 'GET', '/wp/v2/posts/' . $post_id );
		$request->set_param( 'context', 'view' );
		$request->set_param( 'id', $post_id );

		$response       = new \WP_REST_Response();
		$response->data = [
			'title'   => 'Test Post with Grid',
			'content' => [
				'raw'      => $post->post_content,
				'rendered' => apply_filters( 'the_content', $post->post_content ),
			],
		];

		$response = $this->parser->extend_post_content( $response, $post, $request );

		$this->assertArrayHasKey( 'block_styles', $response->data['content'] );
		$this->assertIsString( $response->data['content']['block_styles'] );
		$this->assertNotEmpty( $response->data['content']['block_styles'] );
	}

	/**
	 * Test extend_post_content method outputs block styles for columns layout
	 *
	 * @return void
	 */
	public function test_extend_post_content_outputs_columns_block_styles() {
		$columns_content = '<!-- wp:columns -->'
			. '<div class="wp-block-columns">'
			. '<!-- wp:column --><div class="wp-block-column"><!-- wp:paragraph --><p>Column 1</p><!-- /wp:paragraph --></div><!-- /wp:column -->'
			. '<!-- wp:column --><div class="wp-block-column"><!-- wp:paragraph --><p>Column 2</p><!-- /wp:paragraph --></div><!-- /wp:column -->'
			. '</div>'
			. '<!-- /wp:columns -->';

		$post_id = self::factory()->post->create( [ 'post_content' => $columns_content ] ); // phpcs:ignore Generic.Files.LineLength.TooLong
		$post    = get_post( $post_id );

		$request = new \WP_REST_Request( 'GET', '/wp/v2/posts/' . $post_id );
		$request->set_param( 'context', 'view' );
		$request->set_param( 'id', $post_id );

		$response       = new \WP_REST_Response();
		$response->data = [
			'title'   => 'Test Post with Columns',
			'content' => [
				'raw'      => $post->post_content,
				'rendered' => apply_filters( 'the_content', $post->post_content ),
			],
		];

		$response = $this->parser->extend_post_content( $response, $post, $request );

		$this->assertArrayHasKey( 'block_styles', $response->data['content'] );
		$this->assertIsString( $response->data['content']['block_styles'] );
		$this->assertNotEmpty( $response->data['content']['block_styles'] );
	}

	/**
	 * Test extend_content_for_all_post_types method registers filters for public post types
	 *
	 * @return void
	 */
	public function test_extend_content_for_all_post_types_registers_filters() {
		// Register a custom post type for testing
		register_post_type(
			'test_post_type',
			[
				'public'       => true,
				'show_in_rest' => true,
			]
		);

		$parser = new Gutenberg();
		$parser->extend_content_for_all_post_types();

		// Check that filters are registered for public post types
		$this->assertTrue( has_filter( 'rest_prepare_post', [ $parser, 'extend_post_content' ] ) !== false );
		$this->assertTrue( has_filter( 'rest_prepare_page', [ $parser, 'extend_post_content' ] ) !== false );
		$this->assertTrue( has_filter( 'rest_prepare_test_post_type', [ $parser, 'extend_post_content' ] ) !== false );

		// Clean up
		unregister_post_type( 'test_post_type' );
	}

	/**
	 * Test that get_inline_block_styles method processes blocks correctly
	 *
	 * @return void
	 */
	public function test_get_inline_block_styles_processes_blocks() {
		$post_content = '<!-- wp:group {"layout":{"type":"grid"}} -->'
			. '<div class="wp-block-group">'
			. '<!-- wp:paragraph --><p>Test content</p><!-- /wp:paragraph -->'
			. '</div>'
			. '<!-- /wp:group -->';

		$post_id = self::factory()->post->create( [ 'post_content' => $post_content ] ); // phpcs:ignore Generic.Files.LineLength.TooLong
		$post    = get_post( $post_id );

		// Test the method directly with just the post object
		$result = $this->parser->get_inline_block_styles( $post );

		// Should return a string (even if empty in test environment)
		$this->assertIsString( $result );
	}

	/**
	 * Test that extend_post_content validates request parameters before adding block_styles
	 *
	 * @return void
	 */
	public function test_extend_post_content_validates_request_parameters() {
		$response       = new \WP_REST_Response();
		$response->data = [
			'title'   => 'Test Post',
			'content' => [
				'raw'      => '<!-- wp:paragraph --><p>Test content</p><!-- /wp:paragraph -->',
				'rendered' => '<p>Test content</p>',
			],
		];

		$post_id = self::factory()->post->create( [ 'post_content' => '<!-- wp:paragraph --><p>Test content</p><!-- /wp:paragraph -->' ] ); // phpcs:ignore Generic.Files.LineLength.TooLong
		$post    = get_post( $post_id );

		// Test with wrong context - should not add block_styles
		$request_wrong_context = new \WP_REST_Request( 'GET', '/wp/v2/posts/' . $post_id );
		$request_wrong_context->set_param( 'context', 'edit' );
		$request_wrong_context->set_param( 'id', $post_id );

		$result_wrong_context = $this->parser->extend_post_content( $response, $post, $request_wrong_context );
		$this->assertSame( $response, $result_wrong_context );
		$this->assertArrayNotHasKey( 'block_styles', $response->data['content'] );

		// Test with no id/slug - should not add block_styles
		$request_no_params = new \WP_REST_Request( 'GET', '/wp/v2/posts' );
		$request_no_params->set_param( 'context', 'view' );
		// Note: no id or slug parameter set

		$result_no_params = $this->parser->extend_post_content( $response, $post, $request_no_params );
		$this->assertSame( $response, $result_no_params );
		$this->assertArrayNotHasKey( 'block_styles', $response->data['content'] );

		// Test with correct parameters - should add block_styles
		$request_correct = new \WP_REST_Request( 'GET', '/wp/v2/posts/' . $post_id );
		$request_correct->set_param( 'context', 'view' );
		$request_correct->set_param( 'id', $post_id );

		$result_correct = $this->parser->extend_post_content( $response, $post, $request_correct );
		$this->assertSame( $response, $result_correct );
		$this->assertArrayHasKey( 'block_styles', $response->data['content'] );
		$this->assertIsString( $response->data['content']['block_styles'] );

		// Test with slug parameter instead of id - should also add block_styles
		$request_with_slug = new \WP_REST_Request( 'GET', '/wp/v2/posts/' . $post_id );
		$request_with_slug->set_param( 'context', 'view' );
		$request_with_slug->set_param( 'slug', get_post_field( 'post_name', $post_id ) );

		$result_with_slug = $this->parser->extend_post_content( $response, $post, $request_with_slug );
		$this->assertSame( $response, $result_with_slug );
		$this->assertArrayHasKey( 'block_styles', $response->data['content'] );
		$this->assertIsString( $response->data['content']['block_styles'] );
	}

	/**
	 * Test that the tenup_headless_wp_enable_block_styles filter controls block_styles addition
	 *
	 * @return void
	 */
	public function test_extend_post_content_respects_enable_block_styles_filter() {
		$response       = new \WP_REST_Response();
		$response->data = [
			'title'   => 'Test Post',
			'content' => [
				'raw'      => '<!-- wp:paragraph --><p>Test content</p><!-- /wp:paragraph -->',
				'rendered' => '<p>Test content</p>',
			],
		];

		$post_id = self::factory()->post->create( [ 'post_content' => '<!-- wp:paragraph --><p>Test content</p><!-- /wp:paragraph -->' ] ); // phpcs:ignore Generic.Files.LineLength.TooLong
		$post    = get_post( $post_id );

		$request = new \WP_REST_Request( 'GET', '/wp/v2/posts/' . $post_id );
		$request->set_param( 'context', 'view' );
		$request->set_param( 'id', $post_id );

		// Test with filter returning false - should not add block_styles
		add_filter( 'tenup_headless_wp_enable_block_styles', '__return_false' );

		$response = $this->parser->extend_post_content( $response, $post, $request );
		$this->assertArrayNotHasKey( 'block_styles', $response->data['content'] );

		remove_filter( 'tenup_headless_wp_enable_block_styles', '__return_false' );

		// Test with filter returning true (default) - should add block_styles
		$response = $this->parser->extend_post_content( $response, $post, $request );
		$this->assertArrayHasKey( 'block_styles', $response->data['content'] );
		$this->assertIsString( $response->data['content']['block_styles'] );
	}
}
