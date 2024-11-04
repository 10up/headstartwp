import { InnerBlocks as GutenbergInnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { InnerBlocksProps } from '#shared/types.js';

export const InnerBlocks: React.FC<InnerBlocksProps> = ({ className, ...props }) => {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps} className={[className, blockProps.className].join(' ')}>
			<GutenbergInnerBlocks {...props} />
		</div>
	);
};
