# Lesson 7: Rich Text Formats

## Learning Outcomes

1. Learn what RichText Formats are
2. Understand how you can control them in RichText components
3. Build your own custom Rich Text Format

## What are "Rich Text Formats"?

Rich Text within WordPress is the underlying engine that powers the text editing capabilities in the new Editor. The way rich text works is by representing the text, whether it is an Element Tree (DOM), an HTML String, or a Plain Text string, as a Rich Text Object. Under the hood that representation looks something like this:

```js
{
  text: string,
  formats: Array,
  replacements: Array,
  ?start: number,
  ?end: number,
}
```

As you can see in this, the actual text is stored separately from the formatting. The formats are ranges within that text, which will get output with custom formatting. So this means that whenever you use a `RichText` component in the editor and select a piece of text to make it Bold or Italic for example you apply a Rich Text Format on that text selection. And the format determines what should happen with that range of text.

Any format can either have an [HTML tag with text-level semantics](https://www.w3.org/TR/html5/textlevel-semantics.html#text-level-semantics-usage-summary) or a tag and class name to identify the format.

Core comes with a whole bunch of core Rich Text Formats. They are all created within their package called [`format-library`](https://github.com/WordPress/gutenberg/tree/trunk/packages/format-library/src).

![Core Rich Text Formats Dropdown showing "Inline Code" as selected](../static/img/core-rich-text-formats-screenshot.jpg)

In the same way, core adds all these core formats you can add your custom formats and also remove the formats that core or another plugin created.

## When should you use "Rich Text Formats"

Rich Text Formats make sense to use whenever you want editors to be able to manipulate something inline. Not on a block level. So the same way you can use the Core "Inline Image" to place a special inline element into your text, you can create your format that adds a special inline element at the current cursor position. Or more commonly you can add a custom format to apply to a range of text to wrap it in a special class name or inline HTML tag.

## Exercise Overview

Let's say we get the following design on a project:
![Design showing text with some areas being highlighted by a gradient background](../static/img/text-format-design.png)
The client wants to be able to highlight text across their site with a gradient text color. This should not be limited to specific blocks but be available for any text on the page.

There is already a starter file for this component that can be found under `themes/tenup-theme/includes/text-formats/gradient-starter.js`. It contains all the imports that we need and what still needs to be done is calling the `registerFormatType` function with the correct information to register our format.

## Takeaways

Rich Text Formats are a great way to add inline formatting controls and therefore a great resource for anything that should not affect an entire block but anything inline.

Registering a Format works very similarly to registering a block. There are two parameters we need to pass to the `registerFormatType` function.

1. Every format needs to have a unique name. The formats are named the same way blocks are named with a `namespace` at the beginning followed by a `/` divider and the `name`.
2. Every format also needs to have some format options defined. For starters, every format needs to have a `title` and a `tagName`. It optionally can have a `className` and or some inline `styles` and then it must have an `edit` method that defines the actual UI with which we interact.

In our case, we don't need inline styling because we are only toggling on or off a gradient. So we can _just_ set the `className` to `has-text-gradient` and then our styles will get applied to that element.

The `edit` method itself is a slot to render things in the Block toolbar in the formatting controls section. So we can directly use the `RichTextToolbarButton` component from the `@wordpress/block-editor` package. As props we get passed whether the format is currently active (`isActive`), the `value` of the format and an `onChange` handler that we need to call whenever we want to change the format. Directly manipulating the `value` of a stored rich text format isn't the best idea though. Formats are stored as complex objects with loads of metadata.

Luckily Core has created helper functions that can be imported from the `@wordpress/rich-text` package that allow you to more easily and safely manipulate the formats. In our case we only want to toggle the format and therefore can use the `toggleFormat` function.

In order to pass the information to the `onChange` function we get from the rich text format we need to do the following:

```js
onChange(
	toggleFormat(value, { type: FORMAT_NAME })
);
```

We need to wrap that in a function and then assign that to the `onClick` event of the `RichTextToolbarButton`.

Now all that is left is adding a proper icon and a title to the `RichTextToolbarButton` and passing the `isActive` value to the `isActive` prop and we are done.

## Next steps

1. Take a look at a more complex rich text format like the "text-color" format from core: [Text Color Rich Text Format](https://github.com/WordPress/gutenberg/blob/trunk/packages/format-library/src/text-color/index.js)
2. Try to change our simple gradient toggle to allow editors to modify the gradient or pick from a predefined list of gradients in a popover like core does in the "text-color" format.

## Further reading

- [Block Editor Handbook: Introduction to the Format API](https://developer.wordpress.org/block-editor/how-to-guides/format-api/)
- [How to Create Custom Text Formats for Gutenberg Block Editor - by Jeffrey Carandang](https://jeffreycarandang.com/how-to-create-custom-text-formats-for-gutenberg-block-editor/)
