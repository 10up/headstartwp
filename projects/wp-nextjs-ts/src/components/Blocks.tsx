import { BlocksRenderer, YoutubeLiteBlock, ImageBlock } from '@headstartwp/core/react';
import { TwitterBlock, ImageComponent, LinkBlock } from '@headstartwp/next';
import { FC } from 'react';
import { css } from '@linaria/core';

export const Blocks: FC<{ html: string }> = ({ html }) => {
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

export default Blocks;
