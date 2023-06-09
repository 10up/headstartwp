<?php

/**
 * Cache Flush handling
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\CacheFlush;

use HeadlessWP\Plugin;

/**
 * The Cache Flush class
 *
 * Handles triggering cache flush requests
 */
class CacheFlush
{
	const LAST_FLUSH_KEY = 'tenup-headless-last-cache-flush';


	/**
	 * Registers the action needed for revalidation.
	 *
	 * @return void
	 */
	public function register()
	{
		add_action('wp_after_insert_post', [$this, 'trigger_cache_for_post'], 10, 3);
	}

	/**
	 * Triggers a cache flush operation
	 *
	 * @param number   $post_id The post id.
	 * @param \WP_Post $post The post object.
	 * @param bool     $update Whether this is a new post or update.
	 *
	 * @return void
	 */
	public function trigger_cache_for_post($post_id, \WP_Post $post, $update)
	{
		// Checks if the admin setting for revalidation is set to true.
		// If not, does not need to revalidate.
		if (!Plugin::should_revalidate_isr()) {
			return;
		}

		// If this is just a revision, no need to revalidate.
		if (wp_is_post_revision($post_id)) {
			return;
		}

		$post_paths = [];

		try {
			// If it is not an update there is no need to revalidate the post paths.
			if ($update) {
				$parsed_url = wp_parse_url(get_permalink($post));
				$frontpage_id = get_option('page_on_front');
				$frontpage_path = intval($frontpage_id) === intval($post->ID) && '/';

				if (false !== $parsed_url) {
					array_push($post_paths, untrailingslashit($parsed_url['path']));
				}

				if (false !== $frontpage_path) {
					array_push($post_paths, untrailingslashit($frontpage_path));
				}

				// CacheFlushToken::generateForPost( $post, $is_frontpage && '/' );

				// $response = $this->revalidate_post_request( $payload['post_id'], $payload['paths'], $payload['token'] );


			}
		} catch (\Exception $e) {
			// do nothing
		}

		$terms = [];
		$term_ids = [];
		$term_paths = [];

		// Checks if there are terms related to the post. If so, sends the revalidation
		// request and updates each term meta with the revalidation data.
		try {
			$taxonomies = get_taxonomies();
			$terms = wp_get_post_terms($post_id, $taxonomies);
			$total_pages = apply_filters('tenup_headless_isr_revalidate_term_total_pages', 2);

			if (!empty($terms)) {
				// $payload = CacheFlushToken::generateForTerms( $terms );

				// $response = $this->revalidate_terms_request( $payload['terms_ids'], $payload['paths'], $total_pages, $payload['token']);
				foreach ($terms as $term) {
					$parsed_url = wp_parse_url(get_term_link($term));

					if (false !== $parsed_url) {
						array_push($term_paths, untrailingslashit($parsed_url['path']));
						array_push($term_ids, $term->term_id);
					}
				}
			}
		} catch (\Exception $e) {
			// do nothing
		}

		$token = CacheFlushToken::generate_cache_flush_token($post_id, $term_ids, $post_paths, $term_paths);

		$response = $this->revalidate_request($post_id, $term_ids, $post_paths, $term_paths, $total_pages, $token);

		$status_code = wp_remote_retrieve_response_code($response);
		$body        = json_decode(wp_remote_retrieve_body($response));

		update_post_meta(
			$post_id,
			self::LAST_FLUSH_KEY,
			[
				'time'        => time(),
				'status_code' => $status_code,
				'message'     => isset($body->message) ? $body->message : '',
				'paths'       => isset($body->post_paths) ? $body->post_paths : '',
			]
		);

		foreach ($terms as $term) {
			$regex = "/^\/_sites(?P<host>\/[a-z0-9-]+)(?P<lang>\/[a-z]{2})?\/" . $term->taxonomy . "\/" . $term->slug . "(?P<page>\/page\/\d+)?$/";
			$paths = preg_grep($regex, $body->term_paths);

			update_term_meta(
				$term->term_id,
				self::LAST_FLUSH_KEY,
				[
					'time'		  => time(),
					'status_code' => $status_code,
					'message'     => isset($body->message) ? $body->message : '',
					'paths'        => $paths,
				]
			);
		};
	}

	/**
	 * Makes a revalidate request for a given path
	 *
	 * @param int 		$post_id The post id.
	 * @param string[] 	$paths The paths of the post to revalidate.
	 * @param string 	$token The jwt token to verify the data.
	 *
	 * @return array|\WP_Error
	 */
	public function revalidate_request($post_id, $term_ids, $post_paths, $term_paths, $total_pages, $token)
	{
		/**
		 * Filters the revalidate endpoints.
		 *
		 * @param string $revalidate_endpoint The revalidate endpoint
		 */
		$revalidate_endpoint = apply_filters('tenup_headless_isr_revalidate_endpoint', trailingslashit(Plugin::get_react_url()) . 'api/revalidate');

		$locale = Plugin::get_site_locale();

		if (function_exists('pll_get_post_language')) {
			$locale = pll_get_post_language($post_id, 'slug');
		}

		$revalidate_url = add_query_arg(
			[
				'post_id' => $post_id,
				'term_ids' => $term_ids,
				'post_paths' => $post_paths,
				'term_paths' => $term_paths,
				'total_pages' => $total_pages,
				'token' => $token,
				'locale' => $locale,
			],
			$revalidate_endpoint
		);

		return wp_remote_get(
			$revalidate_url,
			[
				'timeout' => 5,
			]
		);
	}
}
