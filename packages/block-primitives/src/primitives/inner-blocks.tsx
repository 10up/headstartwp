import { InnerBlocksProps } from '#shared/types.js';

// prop spread
export const InnerBlocks: React.FC<InnerBlocksProps> = ({ children, className }) => {
	return <div className={className}>{children}</div>;
};
