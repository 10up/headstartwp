import { BlocksRenderer } from '@10up/headless-core';
import PropTypes from 'prop-types';

import { isAnchorTag, isImageTag, isTwitterEmbed, isYoutubeEmbed } from '@10up/headless-core/dom';
import { ImageBlock, LinkBlock, TwitterBlock, YoutubeLiteBlock } from '@10up/headless-next/blocks';

export const Blocks = ({ html }) => {
	return (
		<div style={{ position: 'relative' }}>
			<BlocksRenderer html={html}>
				<LinkBlock test={(node) => isAnchorTag(node, { isInternalLink: true })} />
				<ImageBlock test={(node) => isImageTag(node, { hasDimensions: true })} />
				<YoutubeLiteBlock test={isYoutubeEmbed} />
				<TwitterBlock test={isTwitterEmbed} />
			</BlocksRenderer>
		</div>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};
