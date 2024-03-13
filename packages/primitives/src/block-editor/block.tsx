import { ReactNode, createContext, useContext, useMemo } from 'react';

const BlockPrimitiveContext = createContext<BlockProps>({
	attributes: {},
	setAttributes: () => {
		throw new Error('setAttributes is not avaliable');
	},
});

type BlockProps = {
	attributes: Record<string, any>;
	setAttributes: (attributes: Record<string, any>) => void;
};

export function useBlockPrimitiveProps() {
	const props = useContext(BlockPrimitiveContext);

	if (typeof props?.setAttributes === 'undefined') {
		throw new Error('You need to wrap your Block with `Block`');
	}

	return props;
}

const Block = ({ attributes, setAttributes, children }: BlockProps & { children: ReactNode }) => {
	const value = useMemo(() => ({ setAttributes, attributes }), [attributes, setAttributes]);

	return (
		<BlockPrimitiveContext.Provider value={value}>{children}</BlockPrimitiveContext.Provider>
	);
};

export default Block;
