<?php
/**
 * Cache Flush Token Handling
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\CacheFlush;

use HeadlessWP\BaseToken;

class CacheFlushToken extends BaseToken {

	/**
	 * Generates a cache flush token for the given post
	 *
	 * @param \WP_Post $post
	 * @return string
	 */
	public static function generateForPost( \WP_Post $post ): string {
		$parsed_url = wp_parse_url( get_permalink( $post ) );
		$path       = $parsed_url !== false ? $parsed_url['path'] : '';

		return self::generate(
			[
				'post_id' => $post->ID,
				'path'    => $path,
				'type'    => 'isr-revalidate',
			]
		);
	}
}
