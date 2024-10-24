import { BlocksRenderer } from '@headstartwp/core/react';
import React from 'react';
import { HeadlessConfig } from '@headstartwp/core';
import { LinkBlock } from '@headstartwp/next/app';

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
			<LinkBlock />
		</BlocksRenderer>
	);
};

export default Blocks;
