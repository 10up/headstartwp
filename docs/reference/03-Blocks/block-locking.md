# Block Locking

![Block Locking UI](../../static/img/block-locking-ui.gif)

The Block Locking API was introduced in WordPress 5.9. With it blocks can be locked from being able to get moved and or removed from the editor. In WordPress 6.0 this API got a visual user interface so that editors can lock and unlock blocks themselves.

:::note
Blocks can opt out of showing the block locking UI to the user via the `lock` block supports option. There also is a way to override what users are able to use the block locking UI via the `__experimentalCanLockBlocks` editor setting.
:::note

## Locking the ability to remove / move a block

Individual blocks can lock down their ability to be moved and or removed. This is done via an attribute that is added by WordPress to every single block called `lock`. The `lock` attribute is an object that accepts two properties: `move` and `remove`. Both of them are `Boolean` values. There is no UI to control the lock state of a block. It can only be controlled via code.

In a pattern you can set these attributes via the html comment of the block where you can set its attributes.

```php
<!-- wp:columns -->
<div class="wp-block-columns">
    // highlight-start
    <!-- wp:column { "lock": { "move": false, "remove": false } } -->
    // highlight-end
    <div class="wp-block-column">
        ...
    </div>
    <!-- /wp:column -->

    // highlight-start
    <!-- wp:column { "lock": { "move": false, "remove": false } } -->
    // highlight-end
    <div class="wp-block-column">
        ...
    </div>
    <!-- /wp:column -->
</div>
<!-- /wp:columns -->
```

:::note
You can also use these attributes in your custom blocks to set default values for the locking. For example if you have a page header block that should never get removed you can set the default value of the `lock` attribute to `{ remove: true }`
:::note

## Restricting which inner blocks can be used

The core column, group, and cover block support the ability to restrict which blocks are allowed within the inner blocks area. This is being done via two attributes that exist on these blocks. The `allowedBlocks` and `templateLock` attributes can be set via the html comment in patterns to restrict which blocks can be inserted within a specific pattern. And with the ability to also define a `templateLock` you can even make it so that editors cannot move or remove any of the children within a column for example.

```php
<!-- wp:columns -->
<div class="wp-block-columns">
    // highlight-start
    <!-- wp:column { "allowedBlocks": [ "core/image" ], "templateLock": "all" } } -->
    // highlight-end
    <div class="wp-block-column">
        ...
    </div>
    <!-- /wp:column -->

    // highlight-start
    <!-- wp:column { "allowedBlocks": [ "core/heading", "core/paragraph" ], "templateLock": "all" } } -->
    // highlight-end
    <div class="wp-block-column">
        ...
    </div>
    <!-- /wp:column -->
</div>
<!-- /wp:columns -->
```

:::tip
Since these patterns are php files you can make the `allowedBlocks` list filterable via an `apply_filters` hook.
:::tip

## Disabling the block locking UI

### For a specific block

If you have a block that should not expose the block locking UI to any user you can opt out of it on a block level by setting the `supports.lock` option to false.

```json
{
	"name": "namespace/block",
	"title": "Example",
	"supports": {
		// highlight-next-line
		"lock": false
	}
}
```

### Override block locking UI setting

There are many circumstances where block locking should actually be used to prevent certain users from changing a locked section. By filtering the `block_editor_settings_all` you can override which users should be able to use the block locking UI altogether.

```php
add_filter(
	'block_editor_settings_all',
	static function( $settings, $context ) {
		// Allow for the Editor role and above.
		$settings['__experimentalCanLockBlocks'] = current_user_can( 'delete_others_posts' );

		// Only enable for specific user(s).
		$user = wp_get_current_user();
		if ( in_array( $user->user_email, array( 'george@example.com' ), true ) ) {
			$settings['__experimentalCanLockBlocks'] = false;
		}

		// Disable for posts/pages.
		if ( $context->post && $context->post->post_type === 'page' ) {
			$settings['__experimentalCanLockBlocks'] = false;
		}

		return $settings;
	},
	10,
	2
);
```

## Links

- [Locking in Custom Post Types](../04-custom-post-types.md)
