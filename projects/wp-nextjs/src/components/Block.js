import { BlocksRenderer } from '@10up/headless-core';
import PropTypes from 'prop-types';

// eslint-disable-next-line
import { isAnchorTag, isImageTag } from '@10up/headless-core/dom';
// eslint-disable-next-line
import { ImageBlock, LinkBlock } from '@10up/headless-next/blocks';

export const Blocks = ({ html }) => {
	return (
		<BlocksRenderer html={html}>
			<LinkBlock test={isAnchorTag} />
			<ImageBlock test={isImageTag} />
		</BlocksRenderer>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};
