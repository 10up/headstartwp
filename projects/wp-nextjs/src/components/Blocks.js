import { BlocksRenderer, YoutubeLiteBlock, ImageBlock } from '@10up/headless-core/react';
import { TwitterBlock, ImageComponent, LinkBlock } from '@10up/headless-next';

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
