import {
	BlocksRenderer,
	Block,
	ButtonBlock,
	ColumnsBlock,
	ColumnBlock,
	ParagraphBlock,
} from '@10up/headless-core/react';

import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const StringifyBlock = ({ children, ...props }) => {
	return (
		<div>
			<h2>{props.name}</h2>
			<code>{JSON.stringify(props)}</code>
			{children}
		</div>
	);
};

StringifyBlock.propTypes = {
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
				<ButtonBlock component={StringifyBlock} />
				<ColumnsBlock component={StringifyBlock} />
				<ColumnBlock component={StringifyBlock} />
				<ParagraphBlock component={StringifyBlock} />
				<Block tagName="div" classList={['wp-block-buttons']} blockImpl={StringifyBlock} />
			</BlocksRenderer>
		</div>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};
