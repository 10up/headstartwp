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
	 * @param string   $override_path If passed will override the default path
	 *
	 * @return array
	 */
	public static function generateForPost( \WP_Post $post, $override_path = false ): array {
		$permalink = get_permalink( $post );
		$path      = untrailingslashit( str_replace( home_url(), '', $permalink ) );
		$path      = false !== $override_path ? $override_path : $path;

		/**
		 * Filter the path for the cache flush token
		 *
		 * @param string $path the path to be revalidated
		 * @param \WP_Post $post the post object
		 * @param string|false $override_path the override path
		 */
		$path = apply_filters(
			'headless_wp_generate_token_for_post_revalidate',
			$path,
			$post,
			$override_path
		);

		$token = self::generate(
			[
				'post_id' => $post->ID,
				'path'    => $path,
				'type'    => 'isr-revalidate',
			]
		);

		return [
			'token'   => $token,
			'path'    => $path,
			'post_id' => $post->ID,
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
		$paths     = [];

		foreach ( $terms as $term ) {
			$permalink = get_term_link( $term );
			$path      = untrailingslashit( str_replace( home_url(), '', $permalink ) );

			array_push( $paths, untrailingslashit( $path ) );
			array_push( $terms_ids, $term->term_id );
		}

		/**
		 * Filter the path for the cache flush token
		 *
		 * @param string[] $paths the paths to be revalidated
		 * @param \WP_Term[] $terms the terms objects
		 */
		$paths = apply_filters(
			'headless_wp_generate_token_for_terms_revalidate',
			$paths,
			$terms,
		);

		$token = self::generate(
			[
				'terms_ids' => $terms_ids,
				'paths'     => $paths,
				'type'      => 'isr-revalidate',
			]
		);

		return [
			'token'     => $token,
			'paths'     => $paths,
			'terms_ids' => $terms_ids,
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
