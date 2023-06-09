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
	 * Generates a cache flush token
	 *
	 * @param int 		$post_id The id of the post.
	 * @param int[]		$term_ids The The ids of the terms related to the post.
	 * @param string[]  $post_paths The paths of the post that need to be flushed.
	 * @param string[]  $temr_paths The paaths of the terms that need to be flushed.
	 *
	 * @return string
	 */
	public static function generate_cache_flush_token( $post_id, $term_ids, $post_paths, $term_paths ) {
		$token = self::generate(
			[
				'post_id' => $post_id,
				'term_ids' => $term_ids,
				// 'post_paths'   => $post_paths,
				// 'term_paths' => $term_paths,
				'type'    => 'isr-revalidate',
			]
		);

		return $token;
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
