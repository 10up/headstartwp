'use client';

import { lazy } from 'react';
import { useBlock } from './hooks';
import { DEFAULT_BLOCK_ELEMENT } from '../../dom/parseBlockAttributes';

const ObjectInspector = lazy(() =>
	import('react-inspector').then(({ ObjectInspector }) => ({ default: ObjectInspector })),
);
export const DebugBlock = ({ children, domNode: node = DEFAULT_BLOCK_ELEMENT, ...props }) => {
	const { attributes } = useBlock(node);
	return (
		<div
			style={{
				border: '1px solid red',
				padding: '5px 10px',
				marginTop: '10px',
				boxSizing: 'border-box',
			}}
		>
			<h2>{props.name}</h2>

			<div style={{ padding: '10px' }}>
				<ObjectInspector data={props} name="props" expandLevel={0} />
			</div>

			<div style={{ padding: '10px' }}>
				<ObjectInspector data={attributes} name="raw block attributes" expandLevel={0} />
			</div>

			<div style={{ padding: '2px', marginTop: '5px' }}>{children}</div>
		</div>
	);
};
