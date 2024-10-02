<?php
/**
 * Gutenberg Integration
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Integrations;

use DOMDocument;
use Exception;

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
	}

	/**
	 * Get the image ID by URL
	 *
	 * @param string $url The image URL
	 *
	 * @return int
	 */
	protected function get_image_by_url( $url ) {
		if ( function_exists( '\wpcom_vip_url_to_postid' ) ) {
			return \wpcom_vip_url_to_postid( $url );
		}

		$cache_key = sprintf( 'get_image_by_%s', md5( $url ) );
		$url = esc_url_raw( $url );
		$id  = wp_cache_get( $cache_key, 'headstartwp', false );

		if ( $id === false ) {
			$id  = attachment_url_to_postid( $url );

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
	 * @param array $block\ the block's schema
	 *
	 * @return string
	 */
	public function ensure_image_has_dimensions( $block_content, $block ) {
		$doc = new \WP_HTML_Tag_Processor( $block_content );

		if ( $doc->next_tag( 'img' ) ) {
			$src = $doc->get_attribute( 'src' );
			// check if $src is a image hosted in the current wp install
			if ( strpos( $src, get_site_url() ) !== false  && empty( $block['attrs']['id'] ) ) {
				$image_id = $this->get_image_by_url( $src );

				if ( $image_id ) {
					$img = wp_img_tag_add_width_and_height_attr( $block_content, 'headstartwp', $image_id );
					$img = wp_img_tag_add_srcset_and_sizes_attr( $img, 'headstartwp', $image_id );

					return $img;
				}
			}
		}

		return $block_content;
	}

	/**
	 * Process the block with the WP_HTML_Tag_Processor
	 *
	 * @param string    $html The Block's Markup
	 * @param string    $block_name The name of the block
	 * @param string    $block_attrs_serialized The serialized block attributes
	 * @param array     $block The block's array
	 * @param \WP_Block $block_instance The block instance
	 *
	 * @return string The processed html
	 */
	public function process_block_with_html_tag_api( $html, $block_name, $block_attrs_serialized, $block, $block_instance ) {
		try {
			$doc = new \WP_HTML_Tag_Processor( $html );

			if ( $doc->next_tag() ) {
				$doc->set_attribute( 'data-wp-block-name', $block_name );
				$doc->set_attribute( 'data-wp-block', $block_attrs_serialized );

				/**
				 * Filter the block's before rendering
				 *
				 * @param \WP_HTML_Tag_Processor $doc
				 * @param string $html The original block markup
				 * @param array $block The Block's schema
				 * @param \WP_Block $block_instance The block's instance
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
	 * Process the block with the DOMDocument api
	 *
	 * @param string    $html The Block's Markup
	 * @param string    $block_name The name of the block
	 * @param string    $block_attrs_serialized The serialized block attributes
	 * @param array     $block The block's array
	 * @param \WP_Block $block_instance The block instance
	 *
	 * @return string The processed html
	 */
	public function process_block_with_dom_document_api( $html, $block_name, $block_attrs_serialized, $block, $block_instance ) {
		try {
			libxml_use_internal_errors( true );
			$doc = new DomDocument( '1.0', 'UTF-8' );
			$doc->loadHTML( htmlspecialchars_decode( htmlentities( $html ) ), LIBXML_HTML_NODEFDTD | LIBXML_HTML_NOIMPLIED );

			$root_node = $doc->documentElement; // phpcs:ignore

			if ( is_null( $root_node ) ) {
				return $html;
			}

			$attrs        = $doc->createAttribute( 'data-wp-block' );
			$attrs->value = $block_attrs_serialized;

			$block_name_obj        = $doc->createAttribute( 'data-wp-block-name' );
			$block_name_obj->value = $block_name;

			$root_node->appendChild( $attrs );
			$root_node->appendChild( $block_name_obj );

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
		} catch ( Exception $e ) {
			return $html;
		}
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

		$block_attrs = $block_instance->attributes;

		/**
		 * Filter's out the block's attributes before serializing in the block markup.
		 *
		 * @param array $attrs The Block's Attributes
		 * @param array $block The Block's schema
		 * @param \WP_Block $block_instance The block's instance
		 */
		$block_attrs = apply_filters( 'tenup_headless_wp_render_block_attrs', $block_attrs, $block, $block_instance );

		/**
		 * Filter's out the block's attributes after serialization
		 *
		 * @param string $encoded_attrs The serialized block's Attributes
		 * @param array $attrs The Block's Attributes
		 * @param array $block The Block's schema
		 * @param \WP_Block $block_instance The block's instance
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
		 * @param boolean $enable Whether enable the new api. Defaults to false
		 */
		$parser_api = apply_filters( 'tenup_headless_wp_render_block_use_tag_processor', false );

		if ( class_exists( '\WP_HTML_Tag_Processor' ) && $parser_api ) {
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
