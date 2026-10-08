import { BlocksRenderer, YoutubeLiteBlock, ImageBlock } from '@headstartwp/core/react';
import { TwitterBlock, ImageComponent, LinkBlock } from '@headstartwp/next';

import PropTypes from 'prop-types';

export const Blocks = ({ html }) => {
	return (
		<div className="blocks">
			<BlocksRenderer html={html}>
				<ImageBlock component={ImageComponent} />
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
