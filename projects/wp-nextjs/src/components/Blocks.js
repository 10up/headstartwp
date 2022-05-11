import {
	BlocksRenderer,
	ButtonBlock,
	ColumnsBlock,
	ColumnBlock,
	ParagraphBlock,
	DebugBlock,
	CoverBlock,
	HeadingBlock,
	QuoteBlock,
	PullQuoteBlock,
	PreformattedBlock,
	CodeBlock,
	VerseBlock,
	TableBlock,
	GroupBlock,
	SeparatorBlock,
	SpacerBlock,
	ListBlock,
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
				<QuoteBlock component={DebugBlock} />
				<PullQuoteBlock component={DebugBlock} />
				<PreformattedBlock component={DebugBlock} />
				<CodeBlock component={DebugBlock} />
				<VerseBlock component={DebugBlock} />
				<TableBlock component={DebugBlock} />
				<GroupBlock component={DebugBlock} />
				<SeparatorBlock component={DebugBlock} />
				<SpacerBlock component={DebugBlock} />
				<ListBlock component={DebugBlock} />
			</BlocksRenderer>
		</div>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};
