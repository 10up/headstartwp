import { ObjectInspector } from 'react-inspector';
import { useBlock } from './hooks';

export const DebugBlock = ({ children, domNode: node, ...props }) => {
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

			<div css={{ padding: '10px' }}>
				<ObjectInspector data={props} name="props" expandLevel={0} />
			</div>

			<div css={{ padding: '10px' }}>
				<ObjectInspector data={attributes} name="raw block attributes" expandLevel={0} />
			</div>

			<div css={{ padding: '2px', marginTop: '5px' }}>{children}</div>
		</div>
	);
};
