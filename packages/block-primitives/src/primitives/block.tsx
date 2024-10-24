import { ReactNode } from 'react';

export function useBlockPrimitiveProps() {
	throw new Error('useBlockPrimitiveProps should not be used outside of the block editor');
}

const Block = ({ children }: { children: ReactNode }) => {
	return children;
};

export default Block;
