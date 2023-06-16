<?php
/**
 *  HeadlessWP Feed Class
 *
 * @package HeadlessWP
 */

namespace HeadlessWP;

/**
 * Feeds Class
 * Defines functionality specific to rewriting URLs used in the site.
 */
class Feed {

	/**
	 * Set up any hooks
	 */
	public function register() {
		add_filter( 'the_permalink_rss', [ $this, 'filter_url' ], 999 );
		add_filter( 'the_content_feed', [ $this, 'filter_url' ], 999 );
		add_filter( 'the_excerpt_rss', [ $this, 'filter_url' ], 999 );
		add_filter( 'comments_link_feed', [ $this, 'filter_url' ], 999 );
		add_filter( 'get_bloginfo_rss', [ $this, 'filter_rss_url' ], 999, 2 );
	}

	/**
	 * Checks if urls should be rewritten
	 *
	 * @return boolean
	 */
	protected function should_rewrite_urls() {
		if ( ! Plugin::get_react_url() ) {
			return false;
		}

		$rewrite_urls = filter_input( INPUT_GET, 'rewrite_urls', FILTER_SANITIZE_NUMBER_INT );

		/**
		 * Filter's out whether feed urls should be rewritten
		 *
		 * @param boolean $rewrite_urls Whether the current request should rewrite_urls
		 */
		return apply_filters( 'tenup_headless_wp_should_rewrite_feed_urls', (bool) $rewrite_urls );
	}

	/**
	 * Filters the home url for feeds
	 *
	 * @param string $content Content
	 *
	 * @return string
	 */
	public function filter_url( $content ) {
		if ( ! $this->should_rewrite_urls() ) {
			return $content;
		}

		$skip_paths = [ 'wp-login.php', 'wp-register.php', 'wp-admin', 'wp-content' ];

		$content = str_replace( untrailingslashit( home_url() ), untrailingslashit( Plugin::get_react_url() ), $content );

		foreach ( $skip_paths as $skip_path ) {
			$content = str_replace(
				sprintf( '%s/%s', untrailingslashit( Plugin::get_react_url() ), $skip_path ),
				sprintf( '%s/%s', untrailingslashit( home_url() ), $skip_path ),
				$content
			);
		}

		return $content;
	}

	/**
	 * Filters the feed url
	 *
	 * @param string $info The value
	 * @param string $option The option name
	 *
	 * @return string
	 */
	public function filter_rss_url( $info, $option ) {
		if ( ! $this->should_rewrite_urls() ) {
			return $info;
		}

		if ( 'url' === $option ) {
			return trailingslashit( Plugin::get_react_url() );
		}

		return $info;
	}
}
