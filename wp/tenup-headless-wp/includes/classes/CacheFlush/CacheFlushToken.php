<?php
/**
 * Cache Flush Token Handling
 *
 * @package HeadlessWP
 */

namespace HeadlessWP;

class CacheFlushToken extends BaseToken {
    
    /**
     * Generates a cache flush token for the given post
     *
     * @param \WP_Post $post
     * @return string
     */
    public static function generateForPost(\WP_Post $post): string {
        $permalink = get_permalink( $post );

        return self::generate([
            'post_id' => $post->ID,
            'path' => $permalink,
            'type' => 'isr-revalidate'
        ]);
    }
}