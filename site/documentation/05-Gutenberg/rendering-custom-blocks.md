---
sidebar_label: Rendering Custom Blocks
sidebar_position: 1
slug: /gutenberg/rendering-custom-blocks
---

# Rendering Custom Blocks

Custom Blocks can be handled in a very similar way. If you need to render your custom block as a react component you should make sure that the block exposes its data via the markup. You can do so by appending additional data to the data-wp-block-attrs attribute or serializing the data needed inside the block. We’ll explore these approaches in a future post after we set up a dedicated WP backend for this project.