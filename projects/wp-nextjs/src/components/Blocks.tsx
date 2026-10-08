import { BlocksRenderer, YoutubeLiteBlock, ImageBlock } from '@headstartwp/core/react';
import { TwitterBlock, ImageComponent, LinkBlock } from '@headstartwp/next';

type BlocksProps = {
	html: string;
};

export const Blocks = ({ html }: BlocksProps) => {
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

export default Blocks;
