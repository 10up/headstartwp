import { BlocksRenderer, ButtonBlock } from '@10up/headless-core/react';

import { ImageBlock, LinkBlock, TwitterBlock, YoutubeLiteBlock } from '@10up/headless-next';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const MyReactButton = ({ attribs, children, ...props }) => {
	return <>{JSON.stringify(props)}</>;
};

MyReactButton.propTypes = {
	attribs: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export const Blocks = ({ html }) => {
	return (
		<div
			css={css`
				position: relative;
			`}
		>
			<BlocksRenderer html={html}>
				<LinkBlock />
				<ImageBlock />
				<YoutubeLiteBlock />
				<TwitterBlock />

				<ButtonBlock component={MyReactButton} />
			</BlocksRenderer>
		</div>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};
