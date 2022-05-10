import { css } from '@emotion/react';
import { ObjectInspector } from 'react-inspector';

export const DebugBlock = ({ children, ...props }) => {
	return (
		<div
			css={css({
				border: '1px solid red',
				padding: '5px 10px',
				marginTop: '10px',
				boxSizing: 'border-box',
			})}
		>
			<h2>{props.name}</h2>

			<div css={{ padding: '10px' }}>
				<ObjectInspector data={props} name="props" expandLevel={0} />
			</div>

			<div css={{ padding: '2px', marginTop: '5px' }}>{children}</div>
		</div>
	);
};
