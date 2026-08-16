/**
 * html-react-parser 3 → 6 parity audit.
 *
 *   node parity/run.mjs            # summary; exit 1 if anything diverges
 *   node parity/run.mjs --verbose  # full markup + tree detail for every divergence
 *
 * Guards the `html-react-parser` major bump (three majors, on the code path that turns
 * WordPress block HTML into React elements). That bump's failures present as subtle markup
 * differences rather than errors, so neither `tsc` nor the existing suite would catch them.
 *
 * The OLD version is pinned in `parity/package.json` and installed into `parity/node_modules`
 * (`npm install --legacy-peer-deps` in this directory). It is deliberately NOT a workspace and
 * NOT a devDependency of core: html-react-parser@3 peers `react <=18` while the repo runs
 * React 19, so adding it to the monorepo graph makes `npm install` unresolvable — and an npm
 * alias cannot be overridden around that, because the resolved package name is still
 * `html-react-parser`. Isolating it keeps the old copy out of the published package entirely.
 *
 * Deliberately plain ESM run directly by node — no jest, ts-jest or jsdom — because the audit
 * needs none of them and they were the slow, fragile part.
 *
 * Two independent comparisons, because either alone has a blind spot:
 *
 *   1. Rendered markup (renderToStaticMarkup) — what users actually see. Blind to prop
 *      differences React normalises away.
 *   2. Element tree — normalised type/props/children. Catches prop-level divergence that
 *      renders identically today, and it is what the `replace` callbacks in
 *      BaseBlocksRenderer branch on.
 *
 * Caveat worth knowing: under node this exercises html-dom-parser's *server* build
 * (htmlparser2). The browser build takes a different code path, so a clean run here is not a
 * statement about client-side hydration. See PARITY-FINDINGS.md.
 */
import { readFileSync } from 'node:fs';
import { createElement, isValidElement, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ParserV3, { domToReact as domToReactV3 } from './node_modules/html-react-parser/index.mjs';
import ParserV6, { domToReact as domToReactV6 } from 'html-react-parser';
import { ALL_FIXTURES, BLOCK_FIXTURES } from './fixtures.mjs';

const VERBOSE = process.argv.includes('--verbose');

/* ------------------------------------------------------------------ normalise */

function normalisePropValue(value) {
	if (value === null || typeof value !== 'object') return value;
	if (Array.isArray(value)) return value.map(normalisePropValue);

	return Object.fromEntries(
		Object.entries(value)
			.filter(([key]) => key !== 'children')
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([key, v]) => [key, normalisePropValue(v)]),
	);
}

function elementTypeName(type) {
	if (typeof type === 'string') return type;
	if (typeof type === 'function') return type.name || 'anonymous';
	return String(type);
}

/**
 * Reduce a React node to a comparable shape. `key` and `ref` are excluded: html-react-parser
 * assigns keys positionally and the scheme is an implementation detail, not behaviour.
 */
function normalise(node) {
	if (node === null || node === undefined || node === false || node === true) {
		return [{ kind: 'null' }];
	}
	if (typeof node === 'string' || typeof node === 'number') {
		return [{ kind: 'text', value: String(node) }];
	}
	if (Array.isArray(node)) return node.flatMap(normalise);

	if (isValidElement(node)) {
		const { children, ...rest } = node.props ?? {};
		const props = {};
		for (const key of Object.keys(rest).sort()) props[key] = normalisePropValue(rest[key]);

		// `null` and `undefined` children are the same thing to React — both render nothing.
		// v3 emits `children: null` on void elements, v6 emits `undefined`; treating those as
		// distinct would bury the real findings under 34 false positives. The difference is
		// real but benign, and is recorded in PARITY-FINDINGS.md rather than flagged here.
		const hasChildren = children !== undefined && children !== null;

		return [
			{
				kind: 'element',
				type: elementTypeName(node.type),
				props,
				children: hasChildren ? normalise(children) : [],
			},
		];
	}

	return [{ kind: 'text', value: `[unserialisable:${typeof node}]` }];
}

/* ----------------------------------------------------------------------- diff */

const MAX_DIVERGENCES = 200;

function diffTrees(a, b, path = '', out = []) {
	if (out.length >= MAX_DIVERGENCES) return out;

	if (a.length !== b.length) {
		out.push({ path: path || '(root)', kind: 'child-count', v3: a.length, v6: b.length });
	}

	for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
		const x = a[i];
		const y = b[i];
		const p = path ? `${path}.${i}` : String(i);
		if (!x || !y) continue;

		if (x.kind !== y.kind) {
			out.push({ path: p, kind: 'node-kind', v3: x.kind, v6: y.kind });
			continue;
		}

		if (x.kind === 'text') {
			if (x.value !== y.value) out.push({ path: p, kind: 'text', v3: x.value, v6: y.value });
			continue;
		}

		if (x.kind === 'element') {
			if (x.type !== y.type) out.push({ path: p, kind: 'type', v3: x.type, v6: y.type });

			const keys = new Set([...Object.keys(x.props), ...Object.keys(y.props)]);
			for (const key of [...keys].sort()) {
				const hasA = key in x.props;
				const hasB = key in y.props;
				if (hasA && !hasB) {
					out.push({
						path: `${p}.props.${key}`,
						kind: 'prop-missing',
						v3: x.props[key],
						v6: undefined,
					});
				} else if (!hasA && hasB) {
					out.push({
						path: `${p}.props.${key}`,
						kind: 'prop-added',
						v3: undefined,
						v6: y.props[key],
					});
				} else if (JSON.stringify(x.props[key]) !== JSON.stringify(y.props[key])) {
					out.push({
						path: `${p}.props.${key}`,
						kind: 'prop-value',
						v3: x.props[key],
						v6: y.props[key],
					});
				}
			}

			diffTrees(x.children, y.children, `${p}.children`, out);
		}
	}

	return out;
}

const show = (v) => (v === undefined ? '(absent)' : JSON.stringify(v));

/* ------------------------------------------------------------------- scenarios */

const render = (node) => renderToStaticMarkup(createElement(Fragment, null, node));

/**
 * Mirrors what BaseBlocksRenderer actually does: a `replace` callback that recurses into
 * `domToReact(element.children, { replace })`. The bare-parse cases never reach domToReact,
 * which is where the v5 signature change lives.
 */
function makeReplaceOptions(domToReact) {
	const options = {
		replace: (domNode) => {
			if (domNode?.name !== 'p') return undefined;
			return createElement(
				'section',
				{ 'data-replaced': 'true' },
				domNode.children ? domToReact(domNode.children, options) : null,
			);
		},
	};
	return options;
}

/**
 * Self-test. A harness that cannot detect anything also reports "clean", so before trusting a
 * clean run, prove the comparison notices a difference it is supposed to catch. Runs on every
 * invocation — it costs nothing and it is the difference between "no divergences" and
 * "no detection".
 */
function selfTest() {
	const failures = [];

	const check = (label, v3Html, v6Html, expect) => {
		const a = ParserV3(v3Html);
		const b = ParserV6(v6Html);
		const tree = diffTrees(normalise(a), normalise(b));
		const markupDiffers = render(a) !== render(b);
		const detected = expect === 'markup' ? markupDiffers : tree.length > 0;
		if (!detected) failures.push(`${label}: expected a ${expect} divergence, detected none`);
	};

	check('changed attribute value', '<div class="x"></div>', '<div class="y"></div>', 'markup');
	check('extra child', '<div><p>a</p></div>', '<div><p>a</p><p>b</p></div>', 'markup');
	check('dropped attribute', '<img src="a.jpg" alt="x" />', '<img src="a.jpg" />', 'tree');
	check('changed style value', '<div style="color:red"></div>', '<div style="color:blue"></div>', 'tree');
	check('changed tag name', '<section>a</section>', '<article>a</article>', 'tree');
	check('changed text content', '<p>alpha</p>', '<p>beta</p>', 'tree');

	return failures;
}

const selfTestFailures = selfTest();

const results = [];

function record(scenario, fixture, v3Node, v6Node) {
	const entry = { scenario, fixture, markup: null, tree: [] };

	let m3;
	let m6;
	try {
		m3 = render(v3Node);
	} catch (e) {
		m3 = `[render threw: ${e.message}]`;
	}
	try {
		m6 = render(v6Node);
	} catch (e) {
		m6 = `[render threw: ${e.message}]`;
	}
	if (m3 !== m6) entry.markup = { v3: m3, v6: m6 };

	entry.tree = diffTrees(normalise(v3Node), normalise(v6Node));
	results.push(entry);
}

for (const fixture of ALL_FIXTURES) {
	record('bare parse()', fixture, ParserV3(fixture.html), ParserV6(fixture.html));
}

for (const fixture of BLOCK_FIXTURES) {
	record(
		'replace + nested domToReact',
		fixture,
		ParserV3(fixture.html, makeReplaceOptions(domToReactV3)),
		ParserV6(fixture.html, makeReplaceOptions(domToReactV6)),
	);
}

/**
 * isElement() in src/dom/index.ts deliberately avoids `instanceof` (issue #504). With two
 * copies of domhandler installed, `instanceof` is guaranteed to fail across them — so check
 * the duck-typed path still identifies v6 nodes.
 */
const shapeFailures = [];
for (const fixture of BLOCK_FIXTURES) {
	let sawTag = false;
	ParserV6(fixture.html, {
		replace: (domNode) => {
			if (domNode?.type === 'tag') {
				sawTag = true;
				if (typeof domNode.name !== 'string')
					shapeFailures.push(`${fixture.name}: .name not a string`);
				if (!domNode.attribs) shapeFailures.push(`${fixture.name}: .attribs missing`);
				if (!Array.isArray(domNode.children))
					shapeFailures.push(`${fixture.name}: .children not an array`);
			}
			return undefined;
		},
	});
	if (!sawTag) shapeFailures.push(`${fixture.name}: no 'tag' nodes seen`);
}

/* ------------------------------------------------------------------- reporting */

// Read from disk rather than importing: v6 does not expose ./package.json via `exports`.
const readVersion = (name) =>
	JSON.parse(
		readFileSync(new URL(`../../../node_modules/${name}/package.json`, import.meta.url), 'utf8'),
	).version;

const readBaselineVersion = (name) =>
	JSON.parse(
		readFileSync(new URL(`./node_modules/${name}/package.json`, import.meta.url), 'utf8'),
	).version;
const v3v = readBaselineVersion('html-react-parser');
const v6v = readVersion('html-react-parser');

console.log(`\nhtml-react-parser parity audit — v${v3v} vs v${v6v}\n${'='.repeat(60)}`);

const diverged = results.filter((r) => r.markup || r.tree.length > 0);

for (const r of diverged) {
	console.log(`\n▸ [${r.scenario}] ${r.fixture.name}`);
	console.log(`  probes: ${r.fixture.probes}`);

	if (r.markup) {
		console.log(`  MARKUP DIFFERS:`);
		console.log(`    v3: ${VERBOSE ? r.markup.v3 : r.markup.v3.slice(0, 300)}`);
		console.log(`    v6: ${VERBOSE ? r.markup.v6 : r.markup.v6.slice(0, 300)}`);
	}

	if (r.tree.length > 0) {
		const shown = VERBOSE ? r.tree : r.tree.slice(0, 6);
		console.log(`  TREE DIVERGENCES (${r.tree.length}):`);
		for (const d of shown) {
			console.log(`    ${d.path} [${d.kind}]`);
			console.log(`      v3: ${show(d.v3)}`);
			console.log(`      v6: ${show(d.v6)}`);
		}
		if (!VERBOSE && r.tree.length > shown.length) {
			console.log(`    …and ${r.tree.length - shown.length} more (--verbose for all)`);
		}
	}
}

const markupDiffs = results.filter((r) => r.markup).length;
const treeDiffs = results.filter((r) => r.tree.length > 0).length;

console.log(`\n${'='.repeat(60)}`);
console.log(`self-test:             ${selfTestFailures.length === 0 ? 'passed (6/6 detectors)' : 'FAILED'}`);
for (const f of selfTestFailures) console.log(`  - ${f}`);
console.log(`cases compared:        ${results.length}`);
console.log(`markup divergences:    ${markupDiffs}`);
console.log(`tree divergences:      ${treeDiffs}`);
console.log(`node-shape failures:   ${shapeFailures.length}`);
for (const f of shapeFailures) console.log(`  - ${f}`);

const ok =
	diverged.length === 0 && shapeFailures.length === 0 && selfTestFailures.length === 0;
console.log(ok ? '\nPARITY CLEAN\n' : `\nPARITY DIVERGENT — ${diverged.length} case(s) need a judgement\n`);
process.exit(ok ? 0 : 1);
