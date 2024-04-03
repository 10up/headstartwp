<?php
/**
 * Preview Link Class
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Preview;

/**
 * Preview Link Class
 */
class PreviewLink {

	/**
	 * Set up any hooks
	 */
	public function register(): void {
		add_filter( 'template_include', [ $this, 'handle_preview' ], 20 );

		// only add _headless_wp_preview_link for preview authenticated requests
		if ( PreviewToken::get_payload_from_token() ) {
			add_action( 'rest_api_init', [ $this, 'add_preview_link_field' ] );
		}
	}

	/**
	 * Adds preview link field
	 */
	public function add_preview_link_field(): void {
		$post_types = get_post_types( [ 'show_in_rest' => true ], 'names' );

		foreach ( $post_types as $post_type ) {
			register_rest_field(
				$post_type,
				'_headless_wp_preview_link',
				[
					'get_callback' => function ( array $post_object ): string {
						return $this->get_draft_permalink( get_post( $post_object['id'] ) );
					},
					'schema'       => [
						'type' => 'string',
					],
				]
			);
		}
	}

	/**
	 * Get drafts permalinks
	 *
	 * @param \WP_Post $post The post in question.
	 */
	public function get_draft_permalink( \WP_Post $post ): string {
		try {
			$payload = PreviewToken::get_payload_from_token();

			if ( ! $payload ) {
				return '';
			}

			if ( 'preview' === $payload->type && $post->ID === $payload->post_id ) {
				if ( ! function_exists( 'get_sample_permalink' ) ) {
					include_once ABSPATH . 'wp-admin/includes/post.php';
				}

				[$permastruct, $post_name] = \get_sample_permalink( $post->ID );
				$link                      = str_replace( '%postname%', $post_name, (string) $permastruct );

				return str_replace( '%pagename%', $post_name, $link );
			}

			return '';
		} catch ( \Exception ) {
			return '';
		}
	}

	/**
	 * Method to check if previews are to be handled
	 */
	public function should_handle_preview(): bool {
		/**
		 * Whether the plugin should handle previews or not
		 */
		return apply_filters( 'tenup_headless_wp_previews_enabled', true );
	}

	/**
	 * Method for handling preview
	 *
	 * @param string $template The template path.
	 */
	public function handle_preview( string $template ): string {
		if ( $this->should_handle_preview() && is_preview() && is_user_logged_in() && current_user_can( 'edit_post', get_the_ID() ) ) {
			return HEADLESS_WP_PLUGIN_PATH . '/includes/classes/Preview/preview.php';
		}

		return $template;
	}
}
