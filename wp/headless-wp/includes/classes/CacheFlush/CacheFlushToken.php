<?php
/**
 * Cache Flush Token Handling
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\CacheFlush;

use HeadlessWP\BaseToken;

/**
 * The CacheFlushToken class
 */
class CacheFlushToken extends BaseToken {

	/**
	 * Generates a cache flush token for the given post
	 *
	 * @param \WP_Post $post The post object
	 * @param string   $frontpage_path If passed will be added to the paths.
	 *
	 * @return array
	 */
	public static function generateForPost( \WP_Post $post, $frontpage_path = false ): array {
		$parsed_url = wp_parse_url( get_permalink( $post ) );
		$paths = [];

		if ( false !== $parsed_url ) {
			array_push( $paths, untrailingslashit( $parsed_url['path'] ) );
		}

		if ( false !== $frontpage_path ) {
			array_push( $paths, untrailingslashit( $frontpage_path ));
		}

		$token = self::generate(
			[
				'post_id' => $post->ID,
				'paths'   => $paths,
				'type'    => 'isr-revalidate',
			]
		);

		return [
			'post_id' => $post->ID,
			'paths'   => $paths,
			'token'   => $token,
		];
	}

	/**
	 * Generates a cache flush token for the given terms.
	 * 
	 * @param \WP_Term[] $terms The terms objects.
	 * 
	 * @return array 
	 */
	public static function generateForTerms( array $terms ): array {
		$terms_ids = [];
		$paths = [];

		foreach ( $terms as $term ) {
			$parsed_url = wp_parse_url( get_term_link( $term ) );

			if ( false !== $parsed_url ) {
				array_push( $paths, untrailingslashit( $parsed_url['path'] ) );
				array_push( $terms_ids, $term->term_id );
			}
		}

		$token = self::generate(
			[
				'terms_ids' => $terms_ids,
				'paths'		=> $paths,
				'type'		=> 'isr-revalidate',
			]
		);

		return [
			'terms_ids' => $terms_ids,
			'paths' 	=> $paths,
			'token'		=> $token,
		];
	}

	/**
	 * Gets the token payload
	 *
	 * @return array
	 */
	public static function getToken() {
		return (array) parent::get_payload_from_token();
	}
}
