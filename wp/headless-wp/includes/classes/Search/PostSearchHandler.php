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

		if ( ! $post instanceof \WP_Post ) {
			return $links;
		}

		// Add author link
		if ( ( in_array( $post->post_type, array( 'post', 'page' ), true ) || post_type_supports( $post->post_type, 'author' ) )
			&& ! empty( $post->post_author ) ) {
			$links['author'] = array(
				array(
					'href'       => rest_url( 'wp/v2/users/' . $post->post_author ),
					'embeddable' => true,
				),
			);
		}

		// Add terms link (wp:term)
		$taxonomies = get_object_taxonomies( $post->post_type );

		if ( ! empty( $taxonomies ) ) {
			$links['https://api.w.org/term'] = array();

			foreach ( $taxonomies as $tax ) {
				$taxonomy_route = rest_get_route_for_taxonomy_items( $tax );

				// Skip taxonomies that are not public.
				if ( empty( $taxonomy_route ) ) {
					continue;
				}

				$terms_url = add_query_arg(
					'post',
					$post->ID,
					rest_url( $taxonomy_route )
				);

				$links['https://api.w.org/term'][] = array(
					'href'       => $terms_url,
					'taxonomy'   => $tax,
					'embeddable' => true,
				);
			}
		}

		// Add wp:featuredmedia link
		$featured_media = get_post_thumbnail_id( $post->ID );
		if ( $featured_media ) {
			$image_url = rest_url( rest_get_route_for_post( $featured_media ) );

			$links['https://api.w.org/featuredmedia'] = array(
				'href'       => $image_url,
				'embeddable' => true,
			);
		}

		return apply_filters( 'tenup_headless_wp_rest_search_post_embedable_links', $links, $post );
	}
}
