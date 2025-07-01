import type { BlockFC, BlockProps } from '@headstartwp/core/react';
import { BlocksRenderer } from '@headstartwp/core/react';
import React from 'react';
import type { HeadlessConfig } from '@headstartwp/core';
import { isBlockByName } from '@headstartwp/core';
import { ImageBlock, LinkBlock, queryAppSettings, TwitterBlock } from '@headstartwp/next/app';
import { PostList } from './Blocks/PostList';

const PToDiv: BlockFC<BlockProps> = ({ block }) => {
	return <p data-testid="block-props">{JSON.stringify(block)}</p>;
};

PToDiv.test = (node) => isBlockByName(node, 'core/paragraph');

const CustomGroup: BlockFC<BlockProps> = ({ children }) => {
	return (
		<div data-testid="custom-group" className="custom-group-wrapper">
			{children}
		</div>
	);
};

CustomGroup.test = (node) => isBlockByName(node, 'core/group');

type BlocksRendererProps = {
	html: string;
	settings: HeadlessConfig;
	styles: string;
};

const Blocks: React.FC<BlocksRendererProps> = async ({ html, settings, styles }) => {
	// we need to pass settings as a prop since there's no context in server components
	// and BlocksRenderer needs the settings for the LinkBlock
	// the settings is automatically passed to the children components via blockContext
	const { data } = await queryAppSettings();

	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: styles }} />
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
		</>
	);
};

export default Blocks;
