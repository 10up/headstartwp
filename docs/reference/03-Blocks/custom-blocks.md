---
sidebar_position: 5
---

# Custom Blocks

WordPress itself comes with a whole bunch of built in _"core"_ blocks. These blocks are built to be flexible, and are meant to allow you to build any layout you want.

However, the goals the core blocks have may not always align with the goals you have for the client you are building a site for, or there may be integrations that straight up are not possible.

This is where the block editor allows you to build your own custom blocks.

## When to build custom blocks

This really depends on the project you are working on. You can find an entire deep dive on [how to decide what to build](/guides/choose-your-adventure). In short, custom blocks allow you to cater the user experience to the client's needs.

In short custom blocks are the solution if you either need to add special functionality that isn't already covered by core blocks and also when the editorial user experience should be more tailored to the specific needs of the client.

:::info
At the end the editorial experience is key. Some clients essentially want a page builder to be able to build _any_ design they want. Others may not want to think about  design at all while in the editorial experience.
:::

## User experience of custom blocks

When it comes to the user experience of the custom blocks you are building the most important goal is to aim for direct inline manipulation of the content. This means allowing your users to visually see how their content is going to look to the end user without having to leave the editor.

The goal should be for any custom block to behave in a similar fashion to core blocks. Using the block should feel native to the editor.

For the placement of controls, and the various states of the block, follow the guidance in the [anatomy of a block](./../01-Fundamentals/a-block.md) article.

## How to build custom blocks

At 10up the majority of custom blocks we develop blocks as dynamic blocks. We also often bundle blocks as part of a theme instead of in their own plugin. The reason for this is that most of the blocks are very tied to the custom design and functionality of the site. Even if the blocks were to live within a plugin, switching the theme would have detrimental effects on how the blocks look and work. Therefore, the additional overhead of maintaining separate plugins is often not worth it.

:::info
These best practices only apply to closely monitored custom client builds. Blocks for open source projects should use static rendering as the default and should ship in plugins only.

In general. If a block provides functionality it is better suited in a plugin. If it is a design / layout element specific to a theme it should be bundled with the theme.
:::info

### Dynamic Blocks

Dynamic blocks use PHP to render the HTML output of the block. The block does not store any markup in the database. Instead it only stores a serialized html comment containing the values of all the attributes. These attributes can then be used in the `render_callback` in PHP to generate the markup that should get output on the page.

This is necessary for any blocks that actually contain dynamic data. For example a related items block, latest posts, or anything that pulls updating data from the database **needs** to be build as a dynamic block.

But any block can be build this way, and there are certain side-effects of building blocks this way which often align with what we need for custom client builds. Storing only the attributes in the database and generating the markup of the block only when the page loads means that an update to the markup gets applied to every single instance of the block without needing to open the editor. This allows for quicker iteration and cohesive updates of design changes throughout a site.

It also means that we don't really have to deal with block deprecations. We only need to think about deprecations when we need to rename or reconfigure block attributes in any way.

:::info
Because of these reasons building dynamic blocks is the preferred approach for most blocks build on client builds.
:::

A downside of this approach is, that the markup of the block needs to be written twice. Once in JS for the editor, and once in PHP for the frontend of the site. The goal here should always be to replicate the markup of the frontend representation as closely as possible whilst creating a rich inline editing experience using components like `RichText`.

:::caution
The usage of the `ServerSideRender` component should be reserved for special occasions where the content of the block really doesn't contain any editable information. An example for this is a latest posts block.
:::

Dynamic blocks usually don't need to provide a `save` method to the `registerBlockType` function. It still is a best practice to provide one that explicitly returns `null` to clearly indicate that the rendering of the block is handled in PHP. The only exception to this rule is if the dynamic block contains any inner blocks area. Inner blocks always need to get saved in the database. For these cases the dynamic block needs to only return `<InnerBlocks.Content />` from its `save` method.

```js
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import { BlockEdit } from './edit.js';
import block from './block.json';

registerBlockType(
	block,
	{
		edit: BlockEdit,
		// highlight-next-line
		save: () => <InnerBlocks.Content />
	}
)
```

### Static Blocks

Static blocks use JavaScript in the editor to render the HTML output of the block and then store it in the Database as a static string. Most of the core blocks are build in this way.

Static blocks come with the benefit of storing the actual HTML in the database. This means that even when you remove the block from the site the content will still be valid HTML that can be rendered. It may not have all the styles loaded anymore. But the content is still rendered.

Static blocks also only update when the post where they are used gets loaded in the editor and then saved. This means that if you created a columns block in a post three years ago and have not edited that page since then, this columns block will still have the same markup. Even if the core implementation has changed in the meantime. This can be great for archival purposes. But it comes with a lot of additional overhead to support all the previous incarnations of a block.

:::info
We recommend that any block that is meant to live on a site that is not directly maintained by a developer, or that is distributed through the plugin directory should use static rendering by default unless there are specific reasons dynamic rendering makes more sense for the specific use-case.
:::
