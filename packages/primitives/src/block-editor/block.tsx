import { ReactNode, createContext, useContext, useMemo } from 'react';

const BlockPrimitiveContext = createContext<BlockProps>({
	attributes: {},
	setAttributes: () => {
		throw new Error(
			'You need to wrap your Block with `<Block />` before you can use `setAttributes`',
		);
	},
});

type BlockProps = {
	attributes: Record<string, any>;
	setAttributes: (attributes: Record<string, any>) => void;
};

export function useBlockPrimitiveProps() {
	const props = useContext(BlockPrimitiveContext);

	return props;
}

const Block = ({ attributes, setAttributes, children }: BlockProps & { children: ReactNode }) => {
	const value = useMemo(() => ({ setAttributes, attributes }), [attributes, setAttributes]);

	return (
		<BlockPrimitiveContext.Provider value={value}>{children}</BlockPrimitiveContext.Provider>
	);
};

export default Block;
