import { IBlock, IBlockAttributes, useBlock } from '@headstartwp/core/react';

export interface IUniversalGutenbergBlock extends IBlock<IBlockAttributes> {}

const UniversalGutenbergBlock = ({ domNode, component: Component }: IUniversalGutenbergBlock) => {
	const { attributes } = useBlock(domNode);

	// @ts-expect-error
	return <Component attributes={attributes} />;
};

export default UniversalGutenbergBlock;
