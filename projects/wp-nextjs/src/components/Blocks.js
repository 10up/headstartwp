import {
	BlocksRenderer,
	ButtonBlock,
	ColumnsBlock,
	ColumnBlock,
	ParagraphBlock,
	DebugBlock,
	CoverBlock,
	HeadingBlock,
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
				<CoverBlock component={DebugBlock} />
				<HeadingBlock component={DebugBlock} />
			</BlocksRenderer>
		</div>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};
