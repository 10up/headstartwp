import { BlocksRenderer, Block } from '@10up/headless-core/react';

import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const StringifyBlock = ({ attribs, children, ...props }) => {
	return (
		<div className={props.className}>
			<h2>{props.name}</h2>
			<code>{JSON.stringify(props)}</code>
		</div>
	);
};

StringifyBlock.propTypes = {
	attribs: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	name: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
};

export const Blocks = ({ html }) => {
	return (
		<div
			css={css`
				position: relative;
			`}
		>
			<BlocksRenderer html={html}>
				<Block tagName="div" classList={['wp-block-button']} blockImpl={StringifyBlock} />
				<Block tagName="div" classList={['wp-block-buttons']} blockImpl={StringifyBlock} />
			</BlocksRenderer>
		</div>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};
