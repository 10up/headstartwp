import { BlocksRenderer } from '@headstartwp/core/react';
import React from 'react';
import { isBlockByName } from '@headstartwp/core';
import { PostList } from './Blocks/PostList';

type BlockProps = {
	html: string;
};

const Blocks: React.FC<BlockProps> = ({ html }) => {
	return (
		<BlocksRenderer forwardBlockAttributes html={html}>
			<PostList test={(node) => isBlockByName(node, 'core/query')} />
		</BlocksRenderer>
	);
};

export default Blocks;
