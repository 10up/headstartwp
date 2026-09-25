# PRD — Universal Blocks (shared component library for Gutenberg + front end)

> Legacy source: [`test-projects/wp-nextjs-universal-blocks`](https://github.com/10up/headstartwp/tree/1c5d2be873f0b3bbab8fb99b7d7b5d07d759dbd3/test-projects/wp-nextjs-universal-blocks)
> and [`test-projects/component-library`](https://github.com/10up/headstartwp/tree/1c5d2be873f0b3bbab8fb99b7d7b5d07d759dbd3/test-projects/component-library)
> Requires: [00-foundation.md](./00-foundation.md). Builds on [app-router-starter.md](./app-router-starter.md).
> Package: `@headstartwp/block-primitives` (pre-1.0, API may change)

## 1. Summary

Write a block's UI **once**, as a plain React component, and use it both:

- **in the WordPress block editor**, where its text is editable in place, images are pickable from the
  media library, links are editable, and inner blocks can be inserted; and
- **on the Next.js front end**, where the same component renders the saved attributes as static markup.

`@headstartwp/block-primitives` makes this possible with primitives (`RichText`, `Image`, `Link`,
`InnerBlocks`) that resolve to **different implementations depending on the bundler's export condition**:
the `block-editor` condition maps them to Gutenberg editing controls; the default condition maps them to
plain HTML output. The legacy setup had two workspaces:

1. **`component-library`** — a tiny package exporting a `Hero` component built from primitives.
2. **`wp-nextjs-universal-blocks`** — the App Router starter whose `Blocks` renderer maps the
   `tenup/hero` block to `Hero` through `UniversalBlockRenderer`.

The WordPress side (block registration using the same component) was **not** in this repo; this PRD
specifies it so the loop is complete.

## 2. When to use

- A design-system-driven project where editors should see true WYSIWYG blocks and front-end devs don't
  want to maintain a separate `edit.js` and React front-end component for every block.

## 3. Deliverables

```
repo/
├── packages/component-library/       # shared components (npm workspace or published package)
│   ├── src/hero/Hero.tsx
│   ├── src/hero/style.css
│   ├── package.json                  # exports ./hero and ./hero/style.css from dist/
│   └── tsconfig.build.json
├── apps/web/                         # Next.js App Router app (starter PRD)
└── wp-content/themes|plugins/<blocks>/  # block registration for the editor
```

A monorepo (npm workspaces) is the natural shape; a published private package also works.

## 4. Component library requirements

- Dependencies: `@headstartwp/block-primitives`, `react@^18`, `react-dom@^18`. Build with `tsc` to `dist/`
  and copy CSS alongside (`copyfiles -u 1 "src/**/*.css" dist`).
- `package.json` `exports`: `"./hero": { "types": "./dist/hero/Hero.d.ts", "default": "./dist/hero/Hero.js" }`
  and `"./hero/style.css": "./dist/hero/style.css"`.
- **Don't** resolve primitives yourself; import them by subpath so the consumer's bundler picks the
  implementation: `@headstartwp/block-primitives/rich-text`, `/image`, `/link`, `/inner-blocks`.
- Components receive `UniversalBlock<Attrs>` props: `{ attributes, settings, themeJSON, children }`.

Reference `Hero`:

```tsx
export type HeroAttributes = {
	title: string;
	content: string;
	image: ImagePrimitiveValue;
	link: LinkPrimitiveValue;
};
export interface HeroProps extends UniversalBlock<HeroAttributes> {}

export const Hero: FC<HeroProps> = ({ attributes, children, settings }) => (
	<div className="headstartwp-hero">
		<RichText name="title" tagName="h2" placeholder="The title" value={attributes.title} />
		<RichText name="content" tagName="p" placeholder="Description" value={attributes.content} />
		<Image
			name="image"
			value={attributes.image}
			mediaURL={attributes?.image?.url ?? ''}
			allowedTypes={['image/jpeg']}
			accept={['image/jpeg']}
		/>
		<Link
			name="link"
			value={attributes.link}
			linkSettings={{ sourceUrl: settings?.sourceUrl, hostUrl: settings?.hostUrl }}
		/>
		<InnerBlocks allowedBlocks={['core/list']}>{children}</InnerBlocks>
	</div>
);
```

- `name` is the **attribute key** the primitive reads and, in the editor, writes.
- `Link` needs `linkSettings` so front-end output rewrites WordPress URLs to front-end URLs.
- Legacy used the MIME type `image/jpg`, which is not a real type — use `image/jpeg`.

## 5. Front-end (Next.js) requirements

Starter PRD, plus:

- Dependencies: `@headstartwp/block-primitives` and the component library.
- In `components/Blocks.tsx`, add inside `BlocksRenderer`:

```tsx
<UniversalBlockRenderer
	component={Hero}
	test={(node) => isBlockByName(node, 'tenup/hero')}
/>
```

`UniversalBlockRenderer` (from `@headstartwp/block-primitives/renderer`) reads `settings` and `themeJSON`
from `blockContext`, so the `BlocksRenderer` must keep `forwardBlockAttributes`, `settings={settings}`,
and `blockContext={{ themeJSON }}` as in the starter. Extra non-attribute props go in `componentProps`
(the legacy `componentProps={{ testprop22asd: 'test' }}` was a typing test — omit it).

- Import `@<scope>/component-library/hero/style.css` once (root layout) so styles apply.
- If the library is a workspace package consumed from source, add it to `transpilePackages` in
  `next.config.js`.

## 6. WordPress editor requirements

> This section was not part of the legacy repo (the block plugin lived elsewhere). It is derived from how
> `block-primitives` and the HeadstartWP plugin work; verify it against your editor toolchain.

- Register `tenup/hero` with `block.json` attributes matching `HeroAttributes`
  (`title`, `content`: string; `image`, `link`: object).
- The front end finds the block through the **`data-wp-block-name` / `data-wp-block` attributes the
  HeadstartWP plugin adds to each block's root element** in `content.rendered`. So the block must render a
  root element: `save: () => <div {...useBlockProps.save()}><InnerBlocks.Content /></div>` (or a dynamic
  block whose `render_callback` outputs a wrapper). A `save` that returns only `<InnerBlocks.Content />`
  has no root element to carry the attributes, and the front end will never match the block.
- `edit` renders `<UniversalBlockRenderer component={Hero} />`; the editor build resolves it to the
  editor implementation, which pulls attributes from the block edit context via `useBlockPrimitiveProps`
  and passes the editor's theme.json features.
- **The editor bundle must resolve the `block-editor` export condition.** With webpack / 10up-toolkit set
  `resolve.conditionNames: ['block-editor', 'import', 'module', 'require', 'default']` for the editor build
  only. Without it, the editor silently gets the front-end (read-only) primitives.

## 7. Acceptance criteria

Foundation §7 and starter §7, plus:

- [ ] Inserting a Hero in the editor shows editable title/description, a media picker, a link control, and
      an inner-blocks area accepting only lists.
- [ ] Saving and viewing the page on the front end renders the same markup with the saved values.
- [ ] The Hero link points to a front-end-relative URL.
- [ ] Changing `Hero.tsx` once changes both editor and front end after rebuilding.
- [ ] The front-end bundle does not include `@wordpress/block-editor` (check the build output/analyzer).

## 8. Pitfalls

- A missing `block-editor` condition in the editor build is the #1 failure and produces no error.
- Attribute names in `block.json` and primitive `name` props must match exactly.
- `block-primitives` is `"type": "module"` and ESM-only; CommonJS tooling must be able to import ESM.
