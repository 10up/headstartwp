<?php
/**
 * preview template file
 *
 * @package HeadlessWP
 */

use HeadlessWP\Plugin;
use HeadlessWP\Preview\PreviewToken;

$preview_post = get_post( get_the_ID() );

$is_revision = 'publish' === $preview_post->post_status;
$post_id     = $preview_post->ID;
$post_type   = get_post_type( $preview_post->ID );

$token = PreviewToken::generate(
	[
		'type'      => 'preview',
		'post_type' => $post_type,
		'post_id'   => $post_id,
	]
);

$preview_url = sprintf(
	'%sapi/preview?post_id=%d&post_type=%s&is_revision=%s&token=%s&locale=%s',
	trailingslashit( Plugin::get_non_localized_headless_url() ),
	$post_id,
	$post_type,
	$is_revision ? '1' : '0',
	$token,
	Plugin::get_site_locale()
);

wp_redirect( $preview_url );
die();
