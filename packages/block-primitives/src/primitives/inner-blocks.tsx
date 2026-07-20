import React from 'react';
import { InnerBlocksProps } from '#shared/types.js';

// prop spread
export const InnerBlocks: React.FC<InnerBlocksProps> = ({ children = null, className }) => {
	return <div className={className}>{children}</div>;
};
