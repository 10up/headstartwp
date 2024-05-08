<?php
/**
 *  HeadlessWP Redirect Class
 *
 * @package HeadlessWP
 */

namespace HeadlessWP;

/**
 * The Redirect class is responsible for handling redirects to the front-end
 */
class Redirect {
	/**
	 * Set up any hooks
	 */
	public function register(): void {
		add_action( 'template_redirect', [ $this, 'maybe_redirect_frontend' ] );
	}

	/**
	 * Redirect the WordPress frontend if the React website URL has been filled in and the user has selected to redirect the frontend
	 */
	public function maybe_redirect_frontend(): void {
		// if request method is HEAD then the headless site is making a HEAD request to figure out redirects, so don't mess with redirects or home_url
		if (
			isset( $_SERVER['REQUEST_METHOD'] ) &&
			'HEAD' === sanitize_text_field( wp_unslash( $_SERVER['REQUEST_METHOD'] ) )
		) {
			return;
		}

		if ( isset( $_SERVER['HTTP_X_WP_REDIRECT_CHECK'] ) ) {
			return;
		}

		global $wp;

		$site_url = \get_option( 'site_react_url' );

		$should_redirect = ! is_admin() && ! is_preview() && ! is_robots() && ! is_feed() && ! empty( $site_url );
		$should_redirect = $should_redirect && Plugin::should_frontend_redirect();

		/**
		 * Filter's whether the frontend should redirect to the react url
		 *
		 * @param array $should_redirect The default should redirect value.
		 */
		$should_redirect = apply_filters( 'tenup_headless_wp_frontend_should_redirect', $should_redirect );

		if ( $should_redirect ) {
			$url_request = $wp->request;

			// do not redirect for (missing) assets
			if ( str_starts_with( (string) $url_request, '/wp-content' ) || str_ends_with( (string) $url_request, '.css' ) || str_ends_with( (string) $url_request, '.js' ) ) {
				return;
			}

			// Redirect the frontend WordPress request to the React website URL.
			// phpcs:ignore WordPress.Security.SafeRedirect.wp_redirect_wp_redirect
			\wp_redirect( trailingslashit( esc_url_raw( $site_url ) ) . $url_request, 301 );
			exit;
		}
	}
}
