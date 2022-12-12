---
sidebar_position: 0
sidebar_label: Introduction
description: A short description of this page
keywords: [gutenberg, wordpress block editor, training, course]
---

# 10up Gutenberg Training

<iframe width="560" height="315" src="https://www.youtube.com/embed/UjaheV-jY00" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen></iframe>

## Overview

The purpose of this project is to help you build and customize (Gutenberg) blocks. This training applies to all engineering disciplines at 10up.

## Training Prerequisites

* Basic understanding of WordPress including how themes are structured.
* Understanding of JavaScript fundamentals and ES6+ concepts.
* Basic understanding of React components.

For resources on learning JavaScript and React.js, look through this [internal document](https://internal.10up.com/docs/javascript-tutorials/).

## Project Setup

For this training, we recommend the usage of [10up-docker](https://github.com/10up/wp-local-docker-v2) for the local environment. To get everything setup on your computer follow these steps here:

1. Create a local WordPress installation with the domain `gutenberg-training.test`

```bash
10updocker create gutenberg-training
```

2. Clone the [`gutenberg-lessons`](https://github.com/10up/gutenberg-lessons) repository into the `wordpress` directory replacing the `wp-content` folder

```bash
cd gutenberg-training-test/wordpress && rm -rf wp-content && git clone git@github.com:10up/gutenberg-lessons.git wp-content
```

3. Install the dependencies and build the assets

```bash
cd npm install && npm run build
```

4. Activate the tenup-theme in WordPress

```bash
10updocker wp theme activate tenup-theme
```

You can now navigate to the editor of your WordPress installation and see the Example Block with the Completed Examples show up in the Block Picker.

:::caution
The `tenup-theme` build system requires node version **16** in order to build successfully. If you have [`nvm`](https://github.com/nvm-sh/nvm) installed it should auto-detect which version to use.

Also, make sure that you are running your npm commands from the `wp-content` folder. Not from the Theme folder.
:::caution

If you want to have your code automatically compile again and even hot reload directly in the editor when you make any changes you can start the watch mode. Before that works you need to enable the [WordPress Debug](https://wordpress.org/support/article/debugging-in-wordpress/) mode by setting `WP_DEBUG` and `SCRIPT_DEBUG` in your `wp-config.php` file to true.

Once that is done you can start the watch mode by running:

```bash
npm run watch
```

## The block setup in 10up's wp-scaffold

The 10up `wp-scaffold` theme includes a few helpers that make working with custom blocks easier. For example the block registration happens automatically when you create a new folder with a `block.json` file in it inside the `includes/blocks/` directory of the theme.

The registration also takes any block assets that are defined in the `block.json` file (`editorScript`, `viewScript`, `script`, `style`, and `editorStyle`) and automatically adds them to the list of entrypoints that get transpiled using [10up-toolkit](https://www.npmjs.com/package/10up-toolkit).

If there is a `markup.php` file located inside the same directory as the `block.json`, it will automatically get added as the `render_callback` and therefore provide a quick way to build dynamic blocks.

## Lessons

* [Lesson 1: Anatomy of a block](./01-overview.md)
* [Lesson 2: A Simple CTA block](./02-cta-lesson.md)
* [Lesson 3: Block Styles](./03-styles.md)
* [Lesson 4: Block Patterns](./04-patterns.md)
* [Lesson 5: Block Variations](./05-variations.md)
* [Lesson 6: Inner Blocks / Block Nesting](./06-inner-blocks.md)
* [Lesson 7: Rich Text Formats](./07-rich-text-formats.md)
* [Lesson 8: Slot Fill](./08-slot-fill.md)
* [Lesson 9: Build your own](./09-build-your-own.md)

## Support

If you run into issues with this training project, feel free to reach out in Slack to [`#10up-gutenberg`](https://10up.slack.com/archives/C8Z3WMN1K). We also welcome bug reports, suggestions and contributions via the [Issues & Discussions tab on GitHub](https://github.com/10up/gutenberg-best-practices/issues).
