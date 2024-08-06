import { BlocksRenderer } from '@headstartwp/core/react';
import React from 'react';
import { HeadlessConfig, isBlockByName } from '@headstartwp/core';
import { ImageBlock, LinkBlock, TwitterBlock } from '@headstartwp/next/app';

import { PostList } from './Blocks/PostList';

type BlockProps = {
	html: string;
	settings: HeadlessConfig;
};

const Blocks: React.FC<BlockProps> = ({ html, settings }) => {
	// we need to pass settings as a prop since there's no context in server components
	// and BlocksRenderer needs the settings for the LinkBlock
	// the settings is automatically passed to the children components via blockContext
	return (
		<BlocksRenderer forwardBlockAttributes html={html} settings={settings}>
			<ImageBlock />
			<PostList test={(node) => isBlockByName(node, 'core/query')} />
			<TwitterBlock />
			<LinkBlock />
		</BlocksRenderer>
	);
};

export default Blocks;
