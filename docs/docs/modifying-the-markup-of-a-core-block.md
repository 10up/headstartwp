# Modifying the Markup of a Core Block

Sometimes we find ourselves with the need to modify the markup that gets output by another block that we don't have access to the source code for.

:::caution
Modifying the markup of a another block should be done with caution. It can lead to styling issues or breakages the block changes in the future.
:::

One example of this is needing to modify the markup of the core embed blocks YouTube variant to render a custom facade before loading the actual iframe. In this guide we will take a look at how this can be done using the `render_block` hook in WordPress.

## The `render_block` hook

Modifying the markup of any block becomes possible with the [`render_block`](https://developer.wordpress.org/reference/functions/render_block/) hook. It gets passed two parameters, the `$block_content` and an instance of the `$block` `WP_Block` class.

This hook also has a dynamic variant which allows us to only hook into the particular block we want to modify. For this we need to add the name of the block after the hook name like so: `render_block_${namespace/block}`

If we for example want to wrap every core paragraph block with an additional div we could do it like so:

```php
/**
 * Wrap all core/paragraph blocks in a <div>.
 *
 * @param  string    $block_content HTML markup of the block
 * @param  WP_Block  $block         Block Class instance
 * @return string                   Modified block content
 */
function tenup_paragraph_block_wrapper( $block_content, $block ) {
    $content  = '<div class="paragraph-block-wrapper">' . $block_content . '</div>';
    return $content;
}
add_filter( 'render_block_core/paragraph', 'tenup_paragraph_block_wrapper', 10, 2 );
```

## YouTube Embed Facade

Loading the entire YouTube embed player comes with some downsides. There is quite a bit of data get gets loaded for the player to work before the user ever interacts with the player. It can also cause issues with GDPR etc. since we are loading 3rd party scripts without user consent. Also from a design perspective we may want to show a custom poster image / play controls whilst the video has not yet loaded.

Because of these reasons it has become a good practice to use facades for YouTube embeds and only loading the actual iframe once the user interacted with the element.

There are several libraries out there to make this easy. In this guide we are using the [`lite-youtube-embed` npm package](https://www.npmjs.com/package/lite-youtube-embed) by [Paul Irish](https://github.com/paulirish).

### Replacing the core/embed youtube variant markup with the facade

First and foremost we want to create a partial for the markup we want to render.

```php title="partials/youtube-lite-embed"
<?php
/**
 * Lite YouTube Embed
 *
 * @package tenup
 */

$options = wp_parse_args(
	$args,
	[
		'video_id'         => '',
		'poster_image_url' => '',
		'caption_element'  => '',
	]
);

$default_poster_url = sprintf( 'https://i.ytimg.com/vi/%s/hqdefault.jpg', $options['video_id'] );
$poster_image_url   = ! empty( $options['poster_image_url'] ) ? $options['poster_image_url'] : $default_poster_url;

?>
<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-4-3 wp-has-aspect-ratio">
	<lite-youtube class="lite-youtube-embed" videoid="<?php echo esc_attr( $options['video_id'] ); ?>" style="background-image: url(<?php echo esc_url( $poster_image_url ); ?>);" params="controls=1&modestbranding=2&autoplay=1"></lite-youtube>
	<?php
	if ( isset( $options['caption_element'] ) ) {
		echo wp_kses_post( $options['caption_element'] );
	}
	?>
</figure>
```

Next we want to actually replace the output of the YouTube embed with our custom partial.

```php title="functions.php"
/**
 * Modify block rendering to make YouTube embeds load a facade
 *
 * @param string|null $block_content The pre-rendered content. Default null.
 * @param WPBlock     $block         The block being rendered.
 * @return string modified Block HTML
 */
function modify_youtube_embed_markup( $block_content, $block ) {

	// we only want to modify the output of the YouTube embed
	if ( 'youtube' === $block['attrs']['providerNameSlug'] ) {
		return get_lite_youtube_embed_block_markup( $block );
	}

	// return the unmodified markup by default
	return $block_content;
}

add_filter( 'render_block_core/embed', 'modify_youtube_embed_markup', 10, 2 );
```

As you can see we are currently not yet calling the partial. Instead we have a separate helper function to retrieve that markup. The reason for this is, that there is a bit more we need to do in order to retrieve the Video ID and the caption element from the embed block.

We have two helper functions here. One to retrieve the video ID from the YouTube embed URL which gets stored in the Embed blocks attributes.

And one to retrieve the markup of the caption element.

These two helpers get called from within the main `get_lite_youtube_embed_block_markup` function and then passed to the partial we created earlier.

```php title="function.php"
/**
 * get youtube video id from video link
 *
 * @param string $youtube_video_url youtube video url
 * @return string video id
 */
function get_youtube_video_id( $youtube_video_url ) {
	parse_str( wp_parse_url( $youtube_video_url, PHP_URL_QUERY ), $youtube_query_params );
	return $youtube_query_params['v'];
}

/**
 * get embed block caption element markup
 *
 * @param string $embed_block_markup markup string
 * @return string embed caption markup
 */
function get_embed_block_caption_element( $embed_block_markup ) {
	preg_match( '/<figcaption(.*?)<\/figcaption>/s', $embed_block_markup, $match );
	return isset( $match[0] ) ? $match[0] : '';
}

/**
 * get markup of lite youtube embed block
 *
 * @param WPBlock $block block class
 * @return string markup
 */
function get_lite_youtube_embed_block_markup( $block ) {
	$caption_element = get_embed_block_caption_element( $block['innerHTML'] );
	$video_id        = get_youtube_video_id( $block['attrs']['url'] );

	ob_start();
	get_template_part(
		'partials/lite-youtube-embed',
		'',
		[
			'video_id'        => $video_id,
			'caption_element' => $caption_element,
		]
	);
	$block_markup = ob_get_clean();
	return $block_markup;
};
```

### Loading the Styles and Scripts for the facade to work

Now the only thing thats left to do is actually load the CSS and JavaScript for the `lite-youtube-embed` element. Since we installed the package from NPM (`npm i lite-youtube-embed`) we can import it directly into our frontend JS and CSS.

```js title="frontend.js"
import 'lite-youtube-embed';
```

```css title="style.css"
@import url("lite-youtube-embed");
```

## Links

- [WordPress 5.7: A new dynamic hook to filter the content of a single block](https://make.wordpress.org/core/2021/02/18/wordpress-5-7-a-new-dynamic-hook-to-filter-the-content-of-a-single-block/)
- [`lite-youtube-embed` - NPM Package](https://www.npmjs.com/package/lite-youtube-embed)
- [`lite-youtube-embed` - GitHub Repository](https://github.com/paulirish/lite-youtube-embed)
