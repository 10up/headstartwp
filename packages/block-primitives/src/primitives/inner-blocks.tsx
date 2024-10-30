import { InnerBlocksProps } from '#shared/types.js';

const InnerBlocks: React.FC<InnerBlocksProps> = ({ children, className }) => {
	return <div className={className}>{children}</div>;
};

export default InnerBlocks;
