<?php
/**
 * Gutenberg Integration
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Integrations;

use DOMDocument;
use DOMElement;
use Exception;
use WP_Block;
use WP_HTML_Tag_Processor;

/**
 * The Gutenberg integration class
 */
class Gutenberg {
	/**
	 * Register Hooks
	 */
	public function register() {
		add_filter( 'render_block', [ $this, 'render_block' ], 10, 3 );
		add_filter( 'render_block_core/image', [ $this, 'ensure_image_has_dimensions' ], 9999, 2 );
		add_action( 'rest_api_init', [ $this, 'extend_content_for_all_post_types' ] );
	}

	/**
	 * Extend content field for all public post types using REST API filters.
	 */
	public function extend_content_for_all_post_types() {
		$post_types = get_post_types( [ 'public' => true ], 'names' );

		foreach ( $post_types as $post_type ) {
			add_filter( "rest_prepare_{$post_type}", [ $this, 'extend_post_content' ], 10, 3 );
		}
	}

	/**
	 * Get inline block styles.
	 *
	 * @param \WP_Post $post    The post.
	 *
	 * @return string
	 */
	public function get_inline_block_styles( \WP_Post $post ): string {
		/**
		 * Filter whether to load the global stylesheet.
		 *
		 * @param bool $should_load_global_stylesheet Whether to load the global stylesheet.
		 */
		$should_load_global_stylesheet = apply_filters( 'tenup_headless_wp_load_global_stylesheet', function_exists( 'wp_get_global_stylesheet' ) );
		$css                           = $should_load_global_stylesheet ? wp_get_global_stylesheet() : '';

		if ( function_exists( 'wp_enqueue_stored_styles' ) ) {
			wp_enqueue_stored_styles();
		}
		if ( isset( wp_styles()->registered['core-block-supports']->extra['after'] ) ) {
			$css = $css . end( wp_styles()->registered['core-block-supports']->extra['after'] );
		}

		$blocks = parse_blocks( $post->post_content );
		$done   = [];

		return $css . $this->get_blocks_styles( $blocks, $done );
	}

	/**
	 * Extend the content field with additional data.
	 *
	 * @param \WP_REST_Response $data    The response object.
	 * @param \WP_Post          $post    The post object.
	 * @param \WP_REST_Request  $request The request object.
	 *
	 * @return \WP_REST_Response
	 */
	public function extend_post_content( \WP_REST_Response $data, \WP_Post $post, \WP_REST_Request $request ) {
		// Only extend if content field exists
		if ( ! isset( $data->data['content'] ) ) {
			return $data;
		}

		if ( ! isset( $data->data['content']['rendered'] ) ) {
			return $data;
		}

		$params = $request->get_params();

		if ( 'view' !== ( $params['context'] ?? '' ) ) {
			return $data;
		}

		$should_enable_block_styles = isset( $params['slug'] ) || isset( $params['id'] );

		/**
		 * Filter whether to enable block styles in the REST API response.
		 *
		 * @param bool                 $should_enable_block_styles Whether to enable block styles. Default to requests filtered by slug or id.
		 * @param \WP_REST_Response    $data   The response object.
		 * @param \WP_Post             $post   The post object.
		 * @param \WP_REST_Request     $request The request object.
		 */
		if ( ! apply_filters( 'tenup_headless_wp_enable_block_styles', $should_enable_block_styles, $data, $post, $request ) ) {
			return $data;
		}

		$data->data['content']['block_styles'] = $this->get_inline_block_styles( $post );

		return $data;
	}

	/**
	 * Parse blocks for block styles
	 *
	 * @param array         $blocks The blocks.
	 * @param array<string> $done The done styles.
	 */
	public function get_blocks_styles( array $blocks, array &$done ): string {
		$css = '';

		foreach ( $blocks as $block ) {
			if ( $block['innerBlocks'] ) {
				$css .= $this->get_blocks_styles( $block['innerBlocks'], $done );
			}

			/**
			 * Filter whether to process a block for styles.
			 *
			 * @param bool   $should_process Whether to process the block. Default true for core blocks.
			 * @param array  $block         The block data.
			 */
			$should_process = apply_filters(
				'tenup_headless_wp_process_block_styles',
				str_starts_with( $block['blockName'] ?? '', 'core/' ),
				$block
			);

			if ( ! $should_process ) {
				continue;
			}

			/**
			 * Filter the block style handle.
			 *
			 * @param string $handle     The block style handle.
			 * @param array  $block      The block data.
			 */
			$handle    = apply_filters(
				'tenup_headless_wp_block_style_handle',
				str_replace( 'core/', 'wp-block-', (string) $block['blockName'] ),
				$block
			);
			$wp_styles = wp_styles();
			$path      = wp_styles()->get_data( $handle, 'path' );

			if ( in_array( $handle, $done, true ) ) {
				continue;
			}

			if ( ! isset( $wp_styles->registered[ $handle ] ) ) {
				continue;
			}

			if ( ! is_string( $path ) ) {
				continue;
			}

			$css .= file_get_contents( $path ); // phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown

			$done[] = $handle;
		}

		return $css;
	}

	/**
	 * Get the image ID by URL
	 *
	 * @param string $url The image URL
	 *
	 * @return int
	 */
	protected function get_image_by_url( $url ) {
		if ( function_exists( '\wpcom_vip_attachment_url_to_postid' ) ) {
			return \wpcom_vip_attachment_url_to_postid( $url );
		}

		$cache_key = sprintf( 'get_image_by_%s', md5( $url ) );
		$url       = esc_url_raw( $url );
		$id        = wp_cache_get( $cache_key, 'headstartwp', false );

		if ( false === $id ) {
			$id = attachment_url_to_postid( $url );

			/**
			 * If no ID was found, maybe we're dealing with a scaled big image. So, let's try that.
			 *
			 * @see https://core.trac.wordpress.org/ticket/51058
			 */
			if ( empty( $id ) ) {
				$path_parts = pathinfo( $url );

				if ( isset( $path_parts['dirname'], $path_parts['filename'], $path_parts['extension'] ) ) {
					$scaled_url = trailingslashit( $path_parts['dirname'] ) . $path_parts['filename'] . '-scaled.' . $path_parts['extension'];
					$id         = attachment_url_to_postid( $scaled_url );
				}
			}

			wp_cache_set( $cache_key, $id, 'headstartwp', 3 * HOUR_IN_SECONDS );
		}

		return $id;
	}

	/**
	 * Ensure that images have dimensions set
	 *
	 * @param string $block_content the html for the block
	 * @param array  $block the block's schema
	 *
	 * @return string
	 */
	public function ensure_image_has_dimensions( $block_content, $block ) {
		/**
		 * Filter whether to bypass adding dimensions to images
		 *
		 * @param bool   $bypass          Whether to bypass adding dimensions, defaults to false
		 * @param string $block_content   The block content
		 * @param array  $block          The block schema
		 */
		if ( ! apply_filters( 'tenup_headless_wp_ensure_image_dimensions', false, $block_content, $block ) ) {
			return $block_content;
		}

		$doc = new \WP_HTML_Tag_Processor( $block_content );

		if ( $doc->next_tag( 'img' ) ) {
			$src = $doc->get_attribute( 'src' );

			if ( $doc->get_attribute( 'width' ) && $doc->get_attribute( 'height' ) ) {
				return $block_content;
			}

			$src_check = str_replace( 'http://', 'https://', $src );
			$site_url  = str_replace( 'http://', 'https://', get_site_url() );

			// check if $src is a image hosted in the current wp install and block has no ID
			if ( str_contains( $src_check, $site_url ) && empty( $block['attrs']['id'] ) ) {
				$image_id = $this->get_image_by_url( $src );

				if ( $image_id ) {
					$img = wp_img_tag_add_width_and_height_attr( $block_content, 'the_content', $image_id );
					$img = wp_img_tag_add_srcset_and_sizes_attr( $img, 'the_content', $image_id );

					return $img;
				}
			}
		}

		return $block_content;
	}

	/**
	 * Check if the current block will bypass block attribute processing
	 *
	 * @param string   $block_name     The block name
	 * @param WP_Block $block_instance The block instance
	 *
	 * @return bool
	 */
	protected function bypass_block_attributes( string $block_name, WP_Block $block_instance ): bool {
		$is_synced_pattern = 'core/block' === $block_name;

		/**
		 * Filter whether to bypass adding block attributes to the current blocks HTML
		 *  - Defaults to match Synced Pattern (core/block) blocks
		 *
		 * @param bool     $is_synced_pattern Whether the block is a synced pattern block
		 * @param string   $block_name        The blocks name
		 * @param WP_Block $block_instance    The blocks instance
		 */
		return apply_filters( 'tenup_headless_wp_render_block_bypass_block_attributes', $is_synced_pattern, $block_name, $block_instance );
	}

	/**
	 * Process the block with the DOMDocument api
	 *
	 * @param string   $html                   The block Markup
	 * @param string   $block_name             The name of the block
	 * @param string   $block_attrs_serialized The serialized block attributes
	 * @param array    $block                  The block array
	 * @param WP_Block $block_instance         The block instance
	 *
	 * @return string The processed html
	 */
	public function process_block_with_dom_document_api( $html, $block_name, $block_attrs_serialized, $block, $block_instance ) {
		try {
			return $this->bypass_block_attributes( $block_name, $block_instance )
				? $this->process_dom_document_bypassed_block( $html )
				: $this->process_dom_document_block( $html, $block_name, $block_attrs_serialized, $block, $block_instance );
		} catch ( Exception $e ) {
			return $html;
		}
	}

	/**
	 * Set the block attributes in the HTML
	 *
	 * This is a workaround to avoid the issue with the HTML_Tag_Processor API not handling JSON with HTML in attributes.
	 *
	 * @see https://github.com/10up/headstartwp/pull/921
	 *
	 * @param string $placeholder The placeholder for the block attributes
	 * @param string $html The block markup
	 * @param string $block_attrs_serialized The block attributes serialized to a JSON string
	 *
	 * @return string The processed html
	 */
	public function set_block_attributes_tag_api( $placeholder, $html, $block_attrs_serialized ) {
		$search  = sprintf( '/data-wp-block="%s"/', preg_quote( $placeholder, '/' ) );
		$replace = sprintf( 'data-wp-block="%s"', htmlspecialchars( $block_attrs_serialized ) );
		// Escape backslashes and dollar signs for the replacement string
		$replace = str_replace( [ '\\', '$' ], [ '\\\\', '\\$' ], $replace );
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		return preg_replace(
			$search,
			$replace,
			$html
		);
	}

	/**
	 * Process the block with the WP_HTML_Tag_Processor
	 *
	 * @param string   $html                   The block markup
	 * @param string   $block_name             The block name
	 * @param string   $block_attrs_serialized The block attributes serialized to a JSON string
	 * @param array    $block                  The block schema
	 * @param WP_Block $block_instance         The block instance
	 *
	 * @return string The processed html
	 */
	public function process_block_with_html_tag_api( $html, $block_name, $block_attrs_serialized, $block, $block_instance ) {
		try {
			$doc = new WP_HTML_Tag_Processor( $html );

			if ( ! $this->bypass_block_attributes( $block_name, $block_instance ) && $doc->next_tag() ) {
				$doc->set_attribute( 'data-wp-block-name', $block_name );
				$placeholder = '___HEADSTARTWP_BLOCK_ATTRS___';
				$doc->set_attribute( 'data-wp-block', $placeholder );

				$intermediate_html = $doc->get_updated_html();
				$intermediate_html = $this->set_block_attributes_tag_api( $placeholder, $intermediate_html, $block_attrs_serialized );

				$doc = new WP_HTML_Tag_Processor( $intermediate_html );
				$doc->next_tag();

				/**
				 * Filter the block before rendering
				 *
				 * @param WP_HTML_Tag_Processor $doc
				 * @param string                $html           The block markup
				 * @param array                 $block          The block schema
				 * @param WP_Block              $block_instance The block instance
				 */
				$doc = apply_filters( 'tenup_headless_wp_render_html_tag_processor_block_markup', $doc, $html, $block, $block_instance );

				return $doc->get_updated_html();
			}
		} catch ( Exception $e ) {
			return $html;
		}

		return $html;
	}

	/**
	 * Process Standard blocks into output HTML
	 *
	 * @param string   $html                  The block markup
	 * @param string   $block_name            The block name
	 * @param string   $serialized_attributes The block attributes serialized to a JSON string
	 * @param array    $block                 The block array
	 * @param WP_Block $block_instance        The block instance
	 *
	 * @return string
	 */
	public function process_dom_document_block(
		string $html,
		string $block_name,
		string $serialized_attributes,
		array $block,
		WP_Block $block_instance
	): string {
		$document = $this->read_converted_dom_document( $html );

		// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		$root_node = $document->documentElement;

		$root_node->setAttribute( 'data-wp-block-name', $block_name );
		$root_node->setAttribute( 'data-wp-block', $serialized_attributes );

		/**
		 * Filter the block's DOMElement before rendering
		 *
		 * @param DOMElement $root_node      Root node of the DOM document
		 * @param string     $html           The original block markup
		 * @param array      $block          The block schema
		 * @param WP_Block   $block_instance The block instance
		 */
		$root_node = apply_filters( 'tenup_headless_wp_render_block_markup', $root_node, $html, $block, $block_instance );

		return $document->saveHTML();
	}

	/**
	 * Process block as direct, multiple HTML nodes without adding block attributes
	 *  - Useful for Synced Block Patterns which return a set of already processed blocks with attributes
	 *
	 * @param string $html The block markup
	 *
	 * @return string
	 */
	public function process_dom_document_bypassed_block( string $html ): string {
		$document  = $this->read_converted_dom_document( "<body>{$html}</body>" );
		$body      = $document->getElementsByTagName( 'body' )->item( 0 );
		$node_html = [];

		// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		foreach ( $body->childNodes as $child ) {
			$block = new DOMDocument( '1.0', 'UTF-8' );
			$block->appendChild( $block->importNode( $child, true ) );

			$child_html   = $block->saveHTML();
			$process_html = is_string( $child_html ) ? trim( $child_html ) : '';

			if ( ! empty( $process_html ) ) {
				$node_html[] = $process_html;
			}
		}

		return implode( '', $node_html );
	}

	/**
	 * Read an HTML Entity Decoded DOM Document which allows multi-byte characters
	 *
	 * @param string $html HTML markup to process
	 *
	 * @throws Exception Empty DOM exception
	 *
	 * @return DOMDocument
	 */
	protected function read_converted_dom_document( string $html ) {
		// Yes this is cryptic, but the previous way using mb_convert_encoding( $html, 'HTML-ENTITIES', 'UTF-8' ) has been deprecated
		// @see https://www.drupal.org/project/smart_trim/issues/3342481#comment-14982548
		$converted_html = mb_encode_numericentity( $html, [ 0x80, 0x10FFFF, 0, ~0 ], 'UTF-8' );
		$document       = new DomDocument( '1.0', 'UTF-8' );

		libxml_use_internal_errors( true );
		$document->loadHTML( $converted_html, LIBXML_HTML_NODEFDTD | LIBXML_HTML_NOIMPLIED );
		libxml_clear_errors();

		// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		if ( null === $document->documentElement ) {
			throw new Exception( 'Empty DOM document, fallback to use provided HTML.' );
		}

		return $document;
	}

	/**
	 * Filter rendered blocks to include data-wp-blocks and data-wp-block-name attributes within the block attributes
	 *
	 * @param string   $html           Rendered block content
	 * @param array    $block          The block schema
	 * @param WP_Block $block_instance The block instance
	 *
	 * @return string
	 */
	public function render_block( $html, $block, $block_instance ) {
		// do not process blocks without a blockName
		if ( empty( $block['blockName'] ) ) {
			return $html;
		}

		if ( ! trim( $html ) ) {
			return $html;
		}

		$block_attrs = $block_instance->attributes;

		/**
		 * Filter out any of the block attributes before serializing in the block markup
		 *
		 * @param array    $attrs          The block attributes
		 * @param array    $block          The block schema
		 * @param WP_Block $block_instance The block instance
		 */
		$block_attrs = apply_filters( 'tenup_headless_wp_render_block_attrs', $block_attrs, $block, $block_instance );

		/**
		 * Filter out the block attributes after serialization
		 *
		 * @param string   $encoded_attrs  The block attributes serialized to a JSON string
		 * @param array    $attrs          The block attributes
		 * @param array    $block          The block schema
		 * @param WP_Block $block_instance The block instance
		 */
		$block_attrs_serialized = apply_filters(
			'tenup_headless_wp_render_blocks_attrs_serialized',
			wp_json_encode( $block_attrs ),
			$block_attrs,
			$block,
			$block_instance
		);

		$block_name = esc_attr( $block['blockName'] );

		/**
		 * Filter for enabling the use of the new HTML_Tag_Processor API
		 *
		 * @param boolean $enable Whether enable the new HTML Tag API, defaults to off/false
		 */
		$use_html_tag_api = apply_filters( 'tenup_headless_wp_render_block_use_tag_processor', false );

		if ( class_exists( WP_HTML_Tag_Processor::class ) && $use_html_tag_api ) {
			return $this->process_block_with_html_tag_api(
				$html,
				$block_name,
				$block_attrs_serialized,
				$block,
				$block_instance
			);
		}

		return $this->process_block_with_dom_document_api(
			$html,
			$block_name,
			$block_attrs_serialized,
			$block,
			$block_instance
		);
	}
}
