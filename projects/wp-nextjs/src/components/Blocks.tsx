import {
	BlocksRenderer,
	YoutubeLiteBlock,
	ImageBlock,
	DebugBlock,
	isBlockByName,
	ColumnsBlock,
} from '@headstartwp/core/react';
import { TwitterBlock, ImageComponent, LinkBlock } from '@headstartwp/next';

import { css } from '@linaria/core';

type BlocksProps = {
	html: string;
};

export const Blocks = ({ html }: BlocksProps) => {
	return (
		<div
			className={css`
				position: relative;
			`}
		>
			<BlocksRenderer html={html}>
				<ImageBlock component={ImageComponent} />
				<ColumnsBlock
					component={DebugBlock}
					test={(node) => {
						return isBlockByName(node, 'core/columns');
					}}
				/>
				<LinkBlock />
				<TwitterBlock />
				<YoutubeLiteBlock />
			</BlocksRenderer>
		</div>
	);
};

export default Blocks;
