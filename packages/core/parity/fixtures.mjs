/**
 * Representative WordPress block markup for the html-react-parser 3 → 6 parity audit.
 *
 * Each fixture is real Gutenberg output shape, not minimal HTML: the point is to exercise the
 * attribute and whitespace handling that differs between `html-dom-parser` 3 → 8, `domhandler`
 * 5 → 6 and `style-to-js` 1 → 2, which is where a silent divergence would live.
 *
 * Coverage: one fixture per block component in `src/react/blocks`, then parser edge cases that
 * produce no error when they change — only different markup.
 */

/** One fixture per block component HeadstartWP ships a renderer for. */
export const BLOCK_FIXTURES = [
	{
		name: 'core/paragraph',
		probes: 'inline formatting, entities, non-breaking space',
		html: `<p class="has-text-align-center has-large-font-size">A paragraph with <strong>bold</strong>, <em>italic</em>, <a href="https://example.com/post" data-type="post" data-id="42">a link</a>, an entity &amp; a non-breaking&nbsp;space.</p>`,
	},
	{
		name: 'core/heading',
		probes: 'anchor id, inline style colour',
		html: `<h2 class="wp-block-heading has-text-color" id="section-anchor" style="color:#1a1a1a">Section <mark class="has-inline-color">heading</mark></h2>`,
	},
	{
		name: 'core/image',
		probes: 'srcset/sizes/loading/decoding, figure+figcaption, self-closing img',
		html: `<figure class="wp-block-image size-large is-style-rounded"><img loading="lazy" decoding="async" width="1024" height="683" src="https://example.com/wp-content/uploads/img-1024x683.jpg" alt="An alt text" class="wp-image-99" srcset="https://example.com/img-1024x683.jpg 1024w, https://example.com/img-300x200.jpg 300w" sizes="(max-width: 1024px) 100vw, 1024px" /><figcaption class="wp-element-caption">A caption with <em>markup</em>.</figcaption></figure>`,
	},
	{
		name: 'core/button',
		probes: 'nested anchor, rel/target, background style',
		html: `<div class="wp-block-button is-style-fill"><a class="wp-block-button__link wp-element-button" href="https://example.com" target="_blank" rel="noreferrer noopener" style="background-color:#0073aa;border-radius:5px">Press me</a></div>`,
	},
	{
		name: 'core/buttons',
		probes: 'flex layout wrapper, multiple children, whitespace between siblings',
		html: `<div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex"><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/one">One</a></div><div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="/two">Two</a></div></div>`,
	},
	{
		name: 'core/columns',
		probes: 'nested block structure, flex-basis inline style',
		html: `<div class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-1"><div class="wp-block-column is-layout-flow" style="flex-basis:66.66%"><p>Left column</p></div><div class="wp-block-column is-layout-flow" style="flex-basis:33.33%"><p>Right column</p></div></div>`,
	},
	{
		name: 'core/cover',
		probes: 'multiple inline style declarations, aria-hidden, nested span+img',
		html: `<div class="wp-block-cover is-light" style="min-height:400px;aspect-ratio:unset"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-60 has-background-dim"></span><img class="wp-block-cover__image-background wp-image-12" alt="" src="https://example.com/cover.jpg" data-object-fit="cover" /><div class="wp-block-cover__inner-container"><p class="has-text-align-center has-large-font-size">Cover text</p></div></div>`,
	},
	{
		name: 'core/group',
		probes: 'layout classes, nested flow children',
		html: `<div class="wp-block-group has-background is-layout-constrained" style="background-color:#f0f0f0;padding-top:2rem;padding-bottom:2rem"><h3 class="wp-block-heading">Grouped</h3><p>Grouped content.</p></div>`,
	},
	{
		name: 'core/list',
		probes: 'nested lists, ordered list start/reversed attributes',
		html: `<ol class="wp-block-list" start="3" reversed><li>First<ul><li>Nested unordered</li></ul></li><li>Second</li></ol>`,
	},
	{
		name: 'core/quote',
		probes: 'blockquote cite, nested paragraph',
		html: `<blockquote class="wp-block-quote is-layout-flow"><p>Quoted text with <a href="/ref">a reference</a>.</p><cite>Someone, <em>Somewhere</em></cite></blockquote>`,
	},
	{
		name: 'core/pullquote',
		probes: 'figure-wrapped quote, custom colour style',
		html: `<figure class="wp-block-pullquote has-text-color" style="color:#333"><blockquote><p>A pull quote.</p><cite>Attribution</cite></blockquote></figure>`,
	},
	{
		name: 'core/code',
		probes: 'entity-encoded markup inside code — must NOT be re-decoded into elements',
		html: `<pre class="wp-block-code"><code>const el = &lt;div className="x"&gt;{value &amp;&amp; other}&lt;/div&gt;;</code></pre>`,
	},
	{
		name: 'core/preformatted',
		probes: 'significant whitespace and newlines inside <pre>',
		html: `<pre class="wp-block-preformatted">line one\n    indented two\n\nline four after blank</pre>`,
	},
	{
		name: 'core/verse',
		probes: 'newline preservation in <pre> variant',
		html: `<pre class="wp-block-verse">Roses are red\nViolets are blue</pre>`,
	},
	{
		name: 'core/table',
		probes: 'thead/tbody, colspan/scope, figcaption sibling',
		html: `<figure class="wp-block-table is-style-stripes"><table class="has-fixed-layout"><thead><tr><th scope="col">Header A</th><th scope="col" colspan="2">Header B</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>3</td></tr></tbody></table><figcaption class="wp-element-caption">Table caption</figcaption></figure>`,
	},
	{
		name: 'core/separator',
		probes: 'void element with no closing tag',
		html: `<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide" />`,
	},
	{
		name: 'core/spacer',
		probes: 'aria-hidden div with height style',
		html: `<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>`,
	},
	{
		name: 'core/audio',
		probes: 'boolean attributes (controls), source child',
		html: `<figure class="wp-block-audio"><audio controls src="https://example.com/audio.mp3"></audio><figcaption class="wp-element-caption">Audio caption</figcaption></figure>`,
	},
	{
		name: 'core/file',
		probes: 'download attribute, aria-describedby',
		html: `<div class="wp-block-file"><a id="wp-block-file--media-1" href="https://example.com/doc.pdf">doc.pdf</a><a href="https://example.com/doc.pdf" class="wp-block-file__button wp-element-button" download aria-describedby="wp-block-file--media-1">Download</a></div>`,
	},
	{
		name: 'core/media-text',
		probes: 'grid-template-columns style, figure+content siblings',
		html: `<div class="wp-block-media-text is-stacked-on-mobile" style="grid-template-columns:50% auto"><figure class="wp-block-media-text__media"><img src="https://example.com/m.jpg" alt="" class="wp-image-7 size-full" /></figure><div class="wp-block-media-text__content"><p class="has-large-font-size">Media text body</p></div></div>`,
	},
	{
		name: 'core/embed (youtube)',
		probes: 'iframe with allow/allowfullscreen, wrapper divs',
		html: `<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper"><iframe loading="lazy" title="An embedded video" width="500" height="281" src="https://www.youtube.com/embed/dQw4w9WgXcQ?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media" allowfullscreen></iframe></div><figcaption class="wp-element-caption">Embed caption</figcaption></figure>`,
	},
	{
		name: 'core/gallery',
		probes: 'repeated figure children, gap style with CSS custom property',
		html: `<figure class="wp-block-gallery has-nested-images columns-default is-cropped" style="--wp--style--unstable-gallery-gap:var(--wp--preset--spacing--30)"><figure class="wp-block-image size-large"><img src="https://example.com/g1.jpg" alt="" data-id="1" class="wp-image-1" /></figure><figure class="wp-block-image size-large"><img src="https://example.com/g2.jpg" alt="" data-id="2" class="wp-image-2" /></figure></figure>`,
	},
];

/**
 * Parser-level edge cases. These matter most: none of them throw when behaviour changes, they
 * just produce different props or a different tree.
 */
export const EDGE_CASE_FIXTURES = [
	{
		name: 'style: vendor prefix + !important + CSS custom property',
		probes: 'style-to-js 1 → 2 — the highest-risk transitive change',
		html: `<div style="-webkit-box-shadow:0 0 2px #000;color:red !important;--brand-color:#0073aa;background-image:url('https://example.com/a;b.png')">styled</div>`,
	},
	{
		name: 'style: empty, trailing semicolons, odd spacing',
		probes: 'style parser tolerance for malformed declarations',
		html: `<div style=""></div><div style="  color : blue ;; ">spacey</div>`,
	},
	{
		name: 'attributes: data-*, aria-*, boolean, numeric',
		probes: 'react-property 2.0.0 → 2.0.2 attribute mapping',
		html: `<input type="checkbox" checked disabled readonly value="1" tabindex="0" data-block-name="core/x" data-json='{"a":1,"b":[2,3]}' aria-label="A label" aria-hidden="false" maxlength="10" />`,
	},
	{
		name: 'attributes: hyphenated and unknown',
		probes: 'passthrough of non-React attribute names',
		html: `<div custom-attr="x" xml:lang="en" itemscope itemtype="https://schema.org/Article" unknownattr="y">unknown attrs</div>`,
	},
	{
		name: 'attributes: class vs className, for vs htmlFor',
		probes: 'the two attributes html-react-parser must rename',
		html: `<label for="field-1" class="a b c">Label</label><input id="field-1" />`,
	},
	{
		name: 'entities: named, numeric, hex, unterminated',
		probes: 'entity decoding in html-dom-parser 3 → 8',
		html: `<p>&amp; &lt; &gt; &quot; &apos; &#8212; &#x2014; &nbsp; &copy; &notanentity; &amp</p>`,
	},
	{
		name: 'whitespace: significant text nodes between inline elements',
		probes: 'whitespace-only text node retention — a classic silent diff',
		html: `<p><strong>a</strong> <em>b</em>\n<span>c</span>  <span>d</span></p>`,
	},
	{
		name: 'whitespace: newlines and indentation between block elements',
		probes: 'text node creation between block-level siblings',
		html: `<div>\n\t<p>one</p>\n\t<p>two</p>\n</div>`,
	},
	{
		name: 'void elements: with and without self-closing slash',
		probes: 'void element handling',
		html: `<div><br><br /><hr><img src="a.jpg"><input type="text"><meta charset="utf-8"><area shape="rect"></div>`,
	},
	{
		name: 'malformed: unclosed and improperly nested tags',
		probes: 'error recovery — where parser majors diverge most',
		html: `<div><p>unclosed paragraph<div>nested block in p</div><span><b>crossed</span></b></div>`,
	},
	{
		name: 'comments: HTML comments and WP block delimiters',
		probes: 'comment node handling — WP block delimiters survive in some contexts',
		html: `<!-- wp:paragraph --><p>Delimited</p><!-- /wp:paragraph --><!--[if IE]><p>conditional</p><![endif]-->`,
	},
	{
		name: 'svg: inline with camelCase attributes',
		probes: 'SVG attribute casing (viewBox, strokeWidth) — silently wrong if lowercased',
		html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M1 1 L23 23" /><circle cx="12" cy="12" r="10" /></svg>`,
	},
	{
		name: 'script and style elements',
		probes: 'raw text elements — isElement() treats these as element types',
		html: `<style>.a { color: red; }</style><script type="application/ld+json">{"@context":"https://schema.org"}</script>`,
	},
	{
		name: 'table: implied tbody insertion',
		probes: 'whether the parser injects tbody — changes the tree shape',
		html: `<table><tr><td>no tbody in source</td></tr></table>`,
	},
	{
		name: 'text: bare text at root and mixed root nodes',
		probes: 'multi-root parse returning an array vs a single element',
		html: `bare text<p>then a block</p>more bare text`,
	},
	{
		name: 'empty input',
		probes: 'empty-string return shape',
		html: ``,
	},
];

export const ALL_FIXTURES = [...BLOCK_FIXTURES, ...EDGE_CASE_FIXTURES];
