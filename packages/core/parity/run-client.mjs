/**
 * html-react-parser 3 → 6 parity audit — **browser build**.
 *
 *   node parity/run-client.mjs [--verbose]
 *
 * `run.mjs` exercises the server build (htmlparser2). That is only half the story:
 * `BlocksRenderer` also runs client-side, where `html-dom-parser` resolves to a completely
 * different implementation that hands the markup to the browser's own parser
 * (`DOMParser`/`<template>`) and walks the resulting DOM. A clean server run says nothing
 * about it — different code, different failure modes (attribute casing, implied elements,
 * whitespace).
 *
 * Neither package exposes its client build through `exports`, so it is required by absolute
 * path. jsdom stands in for the browser; that is an approximation of a real engine, but it is
 * the same approximation the existing jest suite runs under.
 */
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const VERBOSE = process.argv.includes('--verbose');

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_MODULES = resolve(HERE, '../../../node_modules');

// The client builds read these off the global scope at call time.
const dom = new JSDOM('<!doctype html><html><body></body></html>');
globalThis.window = dom.window;
for (const key of ['document', 'DOMParser', 'HTMLTemplateElement', 'Node', 'navigator']) {
	if (globalThis[key] === undefined) globalThis[key] = dom.window[key];
}

const { createElement, isValidElement, Fragment } = await import('react');
const { renderToStaticMarkup } = await import('react-dom/server');
const { domToReact: domToReactV3 } = await import('./node_modules/html-react-parser/index.mjs');
const { domToReact: domToReactV6 } = await import('html-react-parser');
const { ALL_FIXTURES, BLOCK_FIXTURES } = await import('./fixtures.mjs');

const require = createRequire(import.meta.url);
const unwrap = (m) => m.default || m;
// The old (v3) line keeps its own nested copy of html-dom-parser; the current one is hoisted.
const htmlToDomV3 = unwrap(
	require(
		`${HERE}/node_modules/html-dom-parser/lib/client/html-to-dom.js`,
	),
);
const htmlToDomV6 = unwrap(require(`${REPO_MODULES}/html-dom-parser/lib/client/html-to-dom.js`));

const readVersion = (p) =>
	JSON.parse(readFileSync(`${REPO_MODULES}/${p}/package.json`, 'utf8')).version;
const readBaselineVersion = (p) =>
	JSON.parse(readFileSync(`${HERE}/node_modules/${p}/package.json`, 'utf8')).version;

/* ------------------------------------------------------- normalise + diff (shared shape) */

function normalisePropValue(value) {
	if (value === null || typeof value !== 'object') return value;
	if (Array.isArray(value)) return value.map(normalisePropValue);
	return Object.fromEntries(
		Object.entries(value)
			.filter(([k]) => k !== 'children')
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([k, v]) => [k, normalisePropValue(v)]),
	);
}

function normalise(node) {
	if (node === null || node === undefined || node === false || node === true)
		return [{ kind: 'null' }];
	if (typeof node === 'string' || typeof node === 'number')
		return [{ kind: 'text', value: String(node) }];
	if (Array.isArray(node)) return node.flatMap(normalise);

	if (isValidElement(node)) {
		const { children, ...rest } = node.props ?? {};
		const props = {};
		for (const k of Object.keys(rest).sort()) props[k] = normalisePropValue(rest[k]);
		const hasChildren = children !== undefined && children !== null;
		return [
			{
				kind: 'element',
				type: typeof node.type === 'string' ? node.type : String(node.type),
				props,
				children: hasChildren ? normalise(children) : [],
			},
		];
	}
	return [{ kind: 'text', value: `[unserialisable:${typeof node}]` }];
}

function diffTrees(a, b, path = '', out = []) {
	if (out.length >= 200) return out;
	if (a.length !== b.length)
		out.push({ path: path || '(root)', kind: 'child-count', v3: a.length, v6: b.length });

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
			for (const k of [...keys].sort()) {
				const hasA = k in x.props;
				const hasB = k in y.props;
				if (hasA && !hasB)
					out.push({ path: `${p}.props.${k}`, kind: 'prop-missing', v3: x.props[k], v6: undefined });
				else if (!hasA && hasB)
					out.push({ path: `${p}.props.${k}`, kind: 'prop-added', v3: undefined, v6: y.props[k] });
				else if (JSON.stringify(x.props[k]) !== JSON.stringify(y.props[k]))
					out.push({ path: `${p}.props.${k}`, kind: 'prop-value', v3: x.props[k], v6: y.props[k] });
			}
			diffTrees(x.children, y.children, `${p}.children`, out);
		}
	}
	return out;
}

/* -------------------------------------------------------------------------- scenarios */

const render = (n) => renderToStaticMarkup(createElement(Fragment, null, n));
const show = (v) => (v === undefined ? '(absent)' : JSON.stringify(v));

/** The real client path: browser parse to DOM nodes, then domToReact. */
const clientParseV3 = (html, options) => domToReactV3(htmlToDomV3(html), options);
const clientParseV6 = (html, options) => domToReactV6(htmlToDomV6(html), options);

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

function selfTest() {
	const failures = [];
	const check = (label, h3, h6) => {
		const a = clientParseV3(h3);
		const b = clientParseV6(h6);
		if (render(a) === render(b) && diffTrees(normalise(a), normalise(b)).length === 0)
			failures.push(`${label}: expected a divergence, detected none`);
	};
	check('changed attribute value', '<div class="x"></div>', '<div class="y"></div>');
	check('extra child', '<div><p>a</p></div>', '<div><p>a</p><p>b</p></div>');
	check('dropped attribute', '<img src="a.jpg" alt="x" />', '<img src="a.jpg" />');
	check('changed style value', '<div style="color:red"></div>', '<div style="color:blue"></div>');
	check('changed text content', '<p>alpha</p>', '<p>beta</p>');
	return failures;
}

const selfTestFailures = selfTest();
const results = [];

function record(scenario, fixture, v3Node, v6Node) {
	const entry = { scenario, fixture, markup: null, tree: [] };
	const safe = (n) => {
		try {
			return render(n);
		} catch (e) {
			return `[render threw: ${e.message}]`;
		}
	};
	const m3 = safe(v3Node);
	const m6 = safe(v6Node);
	if (m3 !== m6) entry.markup = { v3: m3, v6: m6 };
	entry.tree = diffTrees(normalise(v3Node), normalise(v6Node));
	results.push(entry);
}

for (const f of ALL_FIXTURES) {
	record('client parse', f, clientParseV3(f.html), clientParseV6(f.html));
}
for (const f of BLOCK_FIXTURES) {
	record(
		'client replace + nested domToReact',
		f,
		clientParseV3(f.html, makeReplaceOptions(domToReactV3)),
		clientParseV6(f.html, makeReplaceOptions(domToReactV6)),
	);
}

/* -------------------------------------------------------------------------- reporting */

console.log(
	`\nhtml-react-parser parity audit — BROWSER build (jsdom) — v${readBaselineVersion('html-react-parser')} vs v${readVersion('html-react-parser')}\n${'='.repeat(60)}`,
);

const diverged = results.filter((r) => r.markup || r.tree.length > 0);

for (const r of diverged) {
	console.log(`\n▸ [${r.scenario}] ${r.fixture.name}`);
	console.log(`  probes: ${r.fixture.probes}`);
	if (r.markup) {
		console.log('  MARKUP DIFFERS:');
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
		if (!VERBOSE && r.tree.length > shown.length)
			console.log(`    …and ${r.tree.length - shown.length} more (--verbose for all)`);
	}
}

console.log(`\n${'='.repeat(60)}`);
console.log(`self-test:             ${selfTestFailures.length === 0 ? 'passed (5/5 detectors)' : 'FAILED'}`);
for (const f of selfTestFailures) console.log(`  - ${f}`);
console.log(`cases compared:        ${results.length}`);
console.log(`markup divergences:    ${results.filter((r) => r.markup).length}`);
console.log(`tree divergences:      ${results.filter((r) => r.tree.length > 0).length}`);

const ok = diverged.length === 0 && selfTestFailures.length === 0;
console.log(ok ? '\nPARITY CLEAN (browser build)\n' : `\nPARITY DIVERGENT — ${diverged.length} case(s) need a judgement\n`);
process.exit(ok ? 0 : 1);
