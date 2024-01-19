<?php
/**
 * Search Class
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Search;

/**
 * Class PostSearchHandler
 */
class PostSearchHandler extends \WP_REST_Post_Search_Handler {

	/**
	 * Overrides the prepare_item_links method for the search result to include author and taxonomies embedded data.
	 *
	 * @param int $id Item ID.
	 * @return array Links for the given item.
	 */
	public function prepare_item_links( $id ) {

		$post  = get_post( $id );
		$links = parent::prepare_item_links( $id );

		// Add author link
		if ( isset( $post->post_author ) ) {
			$links['author'] = array(
				array(
					'href'       => rest_url( 'wp/v2/users/' . $post->post_author ),
					'embeddable' => true,
				),
			);
		}

		// Add terms link (wp:term)
		$taxonomies = get_object_taxonomies( $post->post_type, 'objects' );
		foreach ( $taxonomies as $taxonomy ) {
			$terms = wp_get_post_terms( $post->ID, $taxonomy->name );

			if ( ! empty( $terms ) ) {
				$links['wp:term'][] = array(
					'href'       => add_query_arg( 'post', $post->ID, rest_url( 'wp/v2/' . $taxonomy->rest_base ) ),
					'taxonomy'   => $taxonomy->rest_base,
					'embeddable' => true,
				);
			}
		}

		// Add wp:featuredmedia link
		$featured_media_id = get_post_thumbnail_id( $post->ID );
		if ( ! empty( $featured_media_id ) ) {
			$links['wp:featuredmedia'] = array(
				array(
					'href'       => rest_url( 'wp/v2/media/' . $featured_media_id ),
					'embeddable' => true,
				),
			);
		}

		// Reduce the search response size.
		if ( ! empty( $links['self'] ) ) {
			$links['self']['embeddable'] = false;
		}

		return apply_filters( 'tenup_headless_wp_rest_search_item_embedable_links', $links, $post );
	}
}
