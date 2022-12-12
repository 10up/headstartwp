# Custom Post Types

## Block Templates

Working with blocks in the context of custom post types comes with some cool abilities. For one you can define `templates` for a custom post type, which essentially means it allows you to pre define the arrangement of blocks when a new post of that post type is created.

```php
function myplugin_register_book_post_type() {
	$args = [
		'public' => true,
		'label'  => 'Books',
		'show_in_rest' => true,
		'template' => [
			[ 'core/image', [
				'align' => 'left',
			] ],
			[ 'core/heading', [
				'placeholder' => 'Add Author...',
			] ],
			[ 'core/paragraph', [
				'placeholder' => 'Add Description...',
			] ],
		],
	);
	register_post_type( 'book', $args );
}
add_action( 'init', 'myplugin_register_book_post_type' );
```

You can also control the `template_lock` in order to lock down the abilities editors have with the blocks on the page.

```php
function myplugin_register_template() {
	$post_type_object = get_post_type_object( 'post' );
	$post_type_object->template = [
		[ 'core/paragraph', [
			'placeholder' => 'Add Description...',
		] ],
	];
	$post_type_object->template_lock = 'all';
}
add_action( 'init', 'myplugin_register_template' );
```

## Editor only Blocks

Another pattern that this ability to set templates allows you to do is create editor only blocks for a custom post type to build custom editorial interfaces.

Lets for example imagine having a custom post type for videos that is meant as a proxy for YouTube videos that should get their own archive and allow you to add some metadata to the video.

To create a nice editorial experience you could build a custom video editor block that is template locked in place for any new video. The block itself has an initial setup state that prompts the user to provide a YouTube video url. Once the url has been added the block now shows an actual inline iframe of the video.

And the data of the block doesn't get saved to the post content but rather directly to post meta using the data api.

```js
import { store as editorStore } from '@wordpress/editor';
import { useSelect, useDispatch } from '@wordpress/data';

const { editPost } = useDispatch( editorStore );
const meta = useSelect((select) => select(editorStore).getEditedPostAttribute('meta'));

function setMetaValue(key, value) {
    editPost({
        meta: { [key]: value },
    });
}
```
