'use client';

import { isValidElement, ReactNode } from 'react';

/**
 * A minimal collapsible object viewer for `DebugBlock`.
 *
 * Replaces the `react-inspector` dependency, which was the only thing in `@headstartwp/core`
 * blocking a clean React 19 install: 6.x peers `react <=18` and both fixed releases (8, 9) are
 * `exports`-only packages that core's classic `"moduleResolution": "node"` cannot resolve. Since
 * its entire job here is dumping two objects inside a debug-only block, carrying a runtime
 * dependency (and a resolution constraint) for it was the wrong trade.
 *
 * It has to survive values `JSON.stringify` would choke on — `DebugBlock` passes its own props,
 * which include `domNode` — so it handles circular references, DOM nodes, React elements and
 * functions explicitly rather than serialising.
 */

/** Depth cap. Debug output stops being useful long before this; it exists to bound pathological trees. */
const MAX_DEPTH = 12;

type Primitive = string | number | boolean | null | undefined | bigint | symbol;

function isPrimitive(value: unknown): value is Primitive {
	return value === null || (typeof value !== 'object' && typeof value !== 'function');
}

/**
 * Duck-typed rather than `instanceof Node`: this renders on the server too, where Node is absent.
 *
 * @param value The value to test
 */
function isDomNode(value: object): value is { nodeName: string; nodeType: number } {
	return typeof (value as { nodeType?: unknown }).nodeType === 'number';
}

/**
 * An html-react-parser element, which `DebugBlock` receives as `domNode`.
 *
 * @param value The value to test
 */
function isParserElement(
	value: object,
): value is { name: string; attribs?: Record<string, string> } {
	return (
		typeof (value as { name?: unknown }).name === 'string' &&
		typeof (value as { type?: unknown }).type === 'string'
	);
}

/**
 * Short, non-recursive label for a value — what shows on a collapsed row.
 *
 * @param value The value to label
 * @param seen Objects already on this branch, used to spot a cycle
 */
function preview(value: unknown, seen: ReadonlySet<object>): string {
	if (typeof value === 'string') return JSON.stringify(value);
	if (value === null) return 'null';
	if (value === undefined) return 'undefined';
	if (typeof value === 'bigint') return `${value}n`;
	if (typeof value === 'symbol') return value.toString();
	if (isPrimitive(value)) return String(value);

	if (typeof value === 'function') {
		return `ƒ ${(value as { name?: string }).name || 'anonymous'}()`;
	}

	const object = value as object;

	if (seen.has(object)) return '[circular]';
	if (isValidElement(object)) {
		const { type } = object as { type: unknown };
		const name =
			typeof type === 'string'
				? type
				: (type as { displayName?: string; name?: string })?.displayName ||
					(type as { name?: string })?.name ||
					'Component';
		return `<${name} />`;
	}
	if (isDomNode(object)) return `<${object.nodeName.toLowerCase()}> (DOM node)`;
	if (isParserElement(object)) return `<${object.name}>`;
	if (Array.isArray(object)) return `Array(${object.length})`;
	if (object instanceof Date) return object.toISOString();
	if (object instanceof RegExp) return String(object);
	if (object instanceof Map) return `Map(${object.size})`;
	if (object instanceof Set) return `Set(${object.size})`;

	return `{…} ${Object.keys(object).length} keys`;
}

/**
 * Whether a value has children worth expanding into.
 *
 * @param value The value to test
 * @param seen Objects already on this branch, used to spot a cycle
 */
function isExpandable(value: unknown, seen: ReadonlySet<object>): boolean {
	if (isPrimitive(value) || typeof value === 'function') return false;

	const object = value as object;
	if (seen.has(object)) return false;
	// These render usefully as a one-line preview; expanding them is noise.
	if (isValidElement(object) || isDomNode(object)) return false;
	if (object instanceof Date || object instanceof RegExp) return false;

	return Object.keys(object).length > 0 || Array.isArray(object);
}

const rowStyle = {
	fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
	fontSize: '12px',
	lineHeight: 1.6,
} as const;

const keyStyle = { color: '#881391' } as const;
const previewStyle = { color: '#555' } as const;

type NodeProps = {
	name: string;
	value: unknown;
	depth: number;
	expandLevel: number;
	seen: ReadonlySet<object>;
};

function InspectorNode({ name, value, depth, expandLevel, seen }: NodeProps): ReactNode {
	const expandable = depth < MAX_DEPTH && isExpandable(value, seen);

	if (!expandable) {
		return (
			<div style={{ ...rowStyle, paddingLeft: '12px' }}>
				<span style={keyStyle}>{name}</span>
				<span>: </span>
				<span style={previewStyle}>{preview(value, seen)}</span>
			</div>
		);
	}

	const object = value as object;
	// A new set per branch, not a shared mutable one: two sibling keys pointing at the same
	// object are not a cycle, and a shared set would mislabel the second one as circular.
	const nextSeen = new Set(seen).add(object);

	const entries: [string, unknown][] = Array.isArray(object)
		? object.map((item, index) => [String(index), item])
		: Object.entries(object);

	return (
		<details open={depth < expandLevel} style={{ ...rowStyle, paddingLeft: '12px' }}>
			<summary style={{ cursor: 'pointer' }}>
				<span style={keyStyle}>{name}</span>
				<span>: </span>
				<span style={previewStyle}>{preview(value, seen)}</span>
			</summary>
			{entries.map(([key, item]) => (
				<InspectorNode
					key={key}
					name={key}
					value={item}
					depth={depth + 1}
					expandLevel={expandLevel}
					seen={nextSeen}
				/>
			))}
		</details>
	);
}

export interface ObjectInspectorProps {
	/** The value to inspect. Anything — circular structures and DOM nodes included. */
	data: unknown;
	/** Label for the root row. */
	name?: string;
	/** How many levels are open initially. `0` renders the root collapsed. */
	expandLevel?: number;
}

/**
 * Renders `data` as a collapsible tree.
 *
 * @param props See {@link ObjectInspectorProps}
 */
export function ObjectInspector({ data, name = 'root', expandLevel = 0 }: ObjectInspectorProps) {
	// Matches react-inspector's semantics, which the two call sites rely on: `expandLevel={0}`
	// renders everything collapsed, including the root.
	return (
		<InspectorNode
			name={name}
			value={data}
			depth={0}
			expandLevel={expandLevel}
			seen={new Set()}
		/>
	);
}
