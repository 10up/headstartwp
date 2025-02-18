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
	 * Process the block with the WP_HTML_Tag_Processor
	 *
	 * @param string   $html                   The block markup
	 * @param string   $block_name             The block name
	 * @param string   $block_attrs_serialized The serialized block attributes
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
				$doc->set_attribute( 'data-wp-block', $block_attrs_serialized );

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
	 * @param string   $serialized_attributes Serialized attributes
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

		$attrs        = $document->createAttribute( 'data-wp-block' );
		$attrs->value = $serialized_attributes;

		$block_name_obj        = $document->createAttribute( 'data-wp-block-name' );
		$block_name_obj->value = $block_name;

		$root_node->appendChild( $attrs );
		$root_node->appendChild( $block_name_obj );

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
		$converted_html = htmlspecialchars_decode( htmlentities( mb_convert_encoding( $html, 'HTML-ENTITIES', 'UTF-8' ) ) );
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
		 * @param string   $encoded_attrs  The serialized block attributes
		 * @param array    $attrs          The block attributes
		 * @param array    $block          The block schema
		 * @param WP_Block $block_instance The block instance
		 */
		$block_attrs_serialized = apply_filters(
			'tenup_headless_wp_render_blocks_attrs_serialized',
			esc_attr( wp_json_encode( $block_attrs ) ),
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
