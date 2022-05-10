import {
	BlocksRenderer,
	Block,
	ButtonBlock,
	ColumnsBlock,
	ColumnBlock,
	ParagraphBlock,
	DebugBlock,
} from '@10up/headless-core/react';

import { css } from '@emotion/react';
import PropTypes from 'prop-types';

export const Blocks = ({ html }) => {
	return (
		<div
			css={css`
				position: relative;
			`}
		>
			<BlocksRenderer html={html}>
				<ButtonBlock component={DebugBlock} />
				<ColumnsBlock component={DebugBlock} />
				<ColumnBlock component={DebugBlock} />
				<ParagraphBlock component={DebugBlock} />
				<Block tagName="div" classList={['wp-block-buttons']} blockImpl={DebugBlock} />
			</BlocksRenderer>
		</div>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};
