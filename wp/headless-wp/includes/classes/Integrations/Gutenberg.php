<?php
/**
 * Gutenberg Integration
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Integrations;

use DOMDocument;

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
	 * Filter rendered blocks to include a data-wp-blocks attribute with block's attrs
	 *
	 * @param string    $html Rendered block content.
	 * @param array     $block Block data.
	 * @param \WP_Block $block_instance The block's instance
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

		libxml_use_internal_errors( true );
		$doc = new DomDocument( '1.0', 'UTF-8' );
		$doc->loadHTML( mb_convert_encoding( $html, 'HTML-ENTITIES', 'UTF-8' ), LIBXML_HTML_NODEFDTD | LIBXML_HTML_NOIMPLIED );

		$root_node = $doc->documentElement; // phpcs:ignore

		if ( is_null( $root_node ) ) {
			return $html;
		}

		$block_attrs = $block_instance->attributes;

		/**
		 * Filter's out the block's attributes before serializing in the block markup.
		 *
		 * @param array $attrs The Block's Attributes
		 * @param array $block The Block's schema
		 * @param \WP_Block $block_instance The block's instance
		 */
		$block_attrs = apply_filters( 'tenup_headless_wp_render_block_attrs', $block_attrs, $block, $block_instance );
		$attrs       = $doc->createAttribute( 'data-wp-block' );

		/**
		 * Filter's out the block's attributes after serialization
		 *
		 * @param string $encoded_attrs The serialized block's Attributes
		 * @param array $attrs The Block's Attributes
		 * @param array $block The Block's schema
		 * @param \WP_Block $block_instance The block's instance
		 */
		$attrs->value = apply_filters(
			'tenup_headless_wp_render_blocks_attrs_serialized',
			esc_attr( wp_json_encode( $block_attrs ) ),
			$block_attrs,
			$block,
			$block_instance
		);

		$block_name        = $doc->createAttribute( 'data-wp-block-name' );
		$block_name->value = esc_attr( $block['blockName'] );

		$root_node->appendChild( $attrs );
		$root_node->appendChild( $block_name );

		/**
		 * Filter the block's DOMElement before rendering
		 *
		 * @param \DOMElement $root_node
		 * @param string $html The original block markup
		 * @param array $block The Block's schema
		 * @param \WP_Block $block_instance The block's instance
		 */
		$root_node = apply_filters( 'tenup_headless_wp_render_block_markup', $root_node, $html, $block, $block_instance );

		return $doc->saveHTML();
	}

}
