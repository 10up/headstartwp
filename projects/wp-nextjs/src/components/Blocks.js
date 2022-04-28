import {
	isAnchorTag,
	isButtonBlock,
	isImageTag,
	isTwitterEmbed,
	isYoutubeEmbed,
} from '@10up/headless-core';
import { BlocksRenderer, GenericBlock } from '@10up/headless-core/react';

import { ImageBlock, LinkBlock, TwitterBlock, YoutubeLiteBlock } from '@10up/headless-next';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const MyReactButton = ({ children, className }) => {
	return (
		<div
			className={className}
			css={css`
				width: 10px;
			`}
		>
			{children}
		</div>
	);
};

MyReactButton.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string.isRequired,
};

export const Blocks = ({ html }) => {
	return (
		<div style={{ position: 'relative' }}>
			<BlocksRenderer html={html}>
				<LinkBlock test={(node) => isAnchorTag(node, { isInternalLink: true })} />
				<ImageBlock test={(node) => isImageTag(node, { hasDimensions: true })} />
				<YoutubeLiteBlock test={isYoutubeEmbed} />
				<TwitterBlock test={isTwitterEmbed} />
				<GenericBlock
					test={(node) =>
						isButtonBlock(node, { tagName: 'div', className: 'wp-block-button' })
					}
					component={MyReactButton}
				/>
			</BlocksRenderer>
		</div>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};
