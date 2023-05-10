import {
	BlocksRenderer,
	YoutubeLiteBlock,
	ImageBlock,
	ParagraphBlock,
	DebugBlock,
} from '@headstartwp/react';
import { TwitterBlock, ImageComponent, LinkBlock } from '@headstartwp/next';

import { css } from '@linaria/core';
import PropTypes from 'prop-types';

export const Blocks = ({ html }) => {
	return (
		<div
			className={css`
				position: relative;
			`}
		>
			<BlocksRenderer html={html}>
				<ImageBlock component={ImageComponent} />
				<ParagraphBlock component={DebugBlock} />
				<LinkBlock />
				<TwitterBlock />
				<YoutubeLiteBlock />
			</BlocksRenderer>
		</div>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};

export default Blocks;
