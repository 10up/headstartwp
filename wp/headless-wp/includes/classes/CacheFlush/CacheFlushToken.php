<?php
/**
 * Cache Flush Token Handling
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\CacheFlush;

use HeadlessWP\BaseToken;
use WP_Post;

/**
 * The CacheFlushToken class
 */
class CacheFlushToken extends BaseToken {

	/**
	 * Generates a cache flush token for the given post
	 *
	 * @param WP_Post     $post The post object
	 * @param string|bool $override_path If passed will override the default path
	 */
	public static function generateForPost( WP_Post $post, $override_path = false ): array {
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
	 * Gets the token payload
	 */
	public static function getToken(): array {
		return (array) parent::get_payload_from_token();
	}
}
