import { BlockFC, BlockProps, BlocksRenderer } from '@headstartwp/core/react';
import React from 'react';
import { HeadlessConfig, isBlockByName } from '@headstartwp/core';
import { ImageBlock, LinkBlock, TwitterBlock } from '@headstartwp/next/app';
import { Hero, HeroAttributes } from '@headstartwp/component-library/hero';

import { PostList } from './Blocks/PostList';

type BlocksRendererProps = {
	html: string;
	settings: HeadlessConfig;
};

const HeroBlock: BlockFC<BlockProps<HeroAttributes>> = ({ block }) => {
	if (!block) {
		return null;
	}

	const { attributes } = block;

	return <Hero attributes={attributes} />;
};

HeroBlock.test = (node) => isBlockByName(node, 'tenup/hero');

const Blocks: React.FC<BlocksRendererProps> = ({ html, settings }) => {
	// we need to pass settings as a prop since there's no context in server components
	// and BlocksRenderer needs the settings for the LinkBlock
	// the settings is automatically passed to the children components via blockContext
	return (
		<BlocksRenderer forwardBlockAttributes html={html} settings={settings}>
			<ImageBlock />
			<PostList test={(node) => isBlockByName(node, 'core/query')} />
			<TwitterBlock />
			<LinkBlock />
			<HeroBlock />
		</BlocksRenderer>
	);
};

export default Blocks;
