# A Quick Guide for Gutenberg API Version 2

First of all there is no need to freak out. I know API Version 2 sounds scary like everything is changing but that is not the case. In fact if you don't want to nothing has to change. API Version 2 is opt in and therefore does not impact anything if you don't want it to. But there are good reasons why you may want to use it.

## Benefits

API Version two allows us to get rid of the additional wrapping div in the markup of the editor. Which makes matching the frontend styling in the editor much easier.

```html title="Block Markup - API Version 1"
<div id="block-4fbf940b-758f-4999-9057-b583435e7f32" tabindex="0" role="group" aria-label="Block: Example Block - APIv1" data-block="4fbf940b-758f-4999-9057-b583435e7f32" data-type="example-block/api-version-one" data-title="Example Block - APIv1" class="block-editor-block-list__block wp-block is-selected">
    <div class="wp-block-example-block-api-version-one">
        <h2>Hello World</h2>
    </div>
</div>
```

```html title="Block Markup - API Version 2"
<div id="block-535e8d0c-018f-4dd8-80b5-2e7436057497" tabindex="0" role="group" aria-label="Block: Example Block - APIv2" data-block="535e8d0c-018f-4dd8-80b5-2e7436057497" data-type="example-block/api-version-two" data-title="Example Block - APIv2" class="wp-block-example-block-api-version-two block-editor-block-list__block wp-block">
    <h2>Hello World</h2>
</div>
```

## Usage

In order get that benefit there are two things that we need to do.

1. Set the `apiVersion` property to 2 in the block registration object
2. use the `useBlockProps` hook to get the attributes needed for the block in the editor

```json title="block.json"
{
    "name": "example-block/api-version-two",
    "title": "Example Block - APIv2",
    "description": "API Version 2",
    "icon": "block-default",
    "category": "common",
    // highlight-start
    "apiVersion": 2,
   // highlight-end
}
```

```js title="edit.js"
// highlight-start
import { useBlockProps } from '@wordpress/block-editor';
// highlight-end

export function BlockEdit() {
    // highlight-start
    const blockProps = useBlockProps();
    // highlight-end

    return (
        // highlight-start
        <div {...blockProps}>
        // highlight-end
            <h2>Hello World</h2>
        </div>
    )
};
```

And that's it. If you are using static rendering you need to call `useBlockProps.save()` in your save method but for dynamic blocks (php rendering) nothing changes.

## Next steps

Now that you are using API Version two you can also improve the markup of inner blocks areas. With the `useInnerBlocksProps` hook you can take complete control over the markup of inner block areas and therefore match the markup between the frontend and the editor.

```js title="edit.js"
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export function BlockEdit() {
    const blockProps = useBlockProps();
    const innerBlockProps = useInnerBlocksProps();

    return (
        <div {...blockProps}>
            <div {...innerBlockProps} />
        </div>
    )
};
```

But you can take that even further. You don't even need to have them as two separate elements. You can pass blockProps as the first argument to `useInnerBlocksProps` giving you this:

```js title="edit.js"
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export function BlockEdit() {
    const blockProps = useBlockProps();
    const innerBlockProps = useInnerBlocksProps(blockProps);

    return (
        <div {...innerBlockProps} />
    )
};
```

The output created by that in the editor is this:

```html
<div id="block-01ac6f54-c7f6-4301-917e-cbd23a7e8477" tabindex="0" role="group" aria-label="Block: Example Block - APIv2 inner blocks" data-block="01ac6f54-c7f6-4301-917e-cbd23a7e8477" data-type="example-block/api-version-two-inner-blocks" data-title="Example Block - APIv2 inner blocks" class="wp-block-example-block-api-version-two-inner-blocks block-editor-block-list__block wp-block has-child-selected block-editor-block-list__layout">
    <h2 role="group" aria-multiline="true" aria-label="Block: Heading" style="white-space: pre-wrap;" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected rich-text" contenteditable="true" id="block-56da6e87-b521-4798-bfbc-ac82dc0da4e5" tabindex="0" data-block="56da6e87-b521-4798-bfbc-ac82dc0da4e5" data-type="core/heading" data-title="Heading">
        Hello World
    </h2>
</div>
```

This is a huge win because you are now able to completely replicate the markup of the frontend in the editor. Which makes styling the editor like the frontend so much easier.

## Links

- [Inner Blocks Reference](../reference/Blocks/inner-blocks)
- [Block Editor Handbook - API Version Reference](https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-api-versions.md)
