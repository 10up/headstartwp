import { BlocksRenderer } from '@headstartwp/core/react';
import React from 'react';
import type { HeadlessConfig } from '@headstartwp/core';
import { isBlockByName } from '@headstartwp/core';
import { ImageBlock, LinkBlock, queryAppSettings, TwitterBlock } from '@headstartwp/next/app';
import { PostList } from './Blocks/PostList';

type BlocksRendererProps = {
	html: string;
	settings: HeadlessConfig;
};

const Blocks: React.FC<BlocksRendererProps> = async ({ html, settings }) => {
	// we need to pass settings as a prop since there's no context in server components
	// and BlocksRenderer needs the settings for the LinkBlock
	// the settings is automatically passed to the children components via blockContext
	const { data } = await queryAppSettings();

	return (
		<BlocksRenderer
			forwardBlockAttributes
			html={html}
			settings={settings}
			blockContext={{ themeJSON: data['theme.json'].settings }}
		>
			<ImageBlock />
			<PostList test={(node) => isBlockByName(node, 'core/query')} />
			<TwitterBlock />
			<LinkBlock />
		</BlocksRenderer>
	);
};

export default Blocks;
