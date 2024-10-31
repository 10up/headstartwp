import React, { ReactNode, createContext, isValidElement, useContext, useMemo } from 'react';
import { UniversalBlock } from '#shared/types.js';

const BlockPrimitiveContext = createContext<UniversalBlockProviderProps>({
	attributes: {},
	setAttributes: () => {
		throw new Error(
			'You need to wrap your Block with `<Block />` before you can use `setAttributes`',
		);
	},
});

type UniversalBlockProviderProps = {
	attributes: Record<string, any>;
	setAttributes: (attributes: Record<string, any>) => void;
};

export function useBlockPrimitiveProps() {
	const props = useContext(BlockPrimitiveContext);

	return props;
}

const UniversalBlockProvider = ({
	attributes,
	setAttributes,
	children,
}: UniversalBlockProviderProps & { children: ReactNode }) => {
	const value = useMemo(() => ({ setAttributes, attributes }), [attributes, setAttributes]);
	const blocks: ReactNode[] = React.Children.toArray(children);

	return (
		<BlockPrimitiveContext.Provider value={value}>
			{blocks.map((block) => {
				if (isValidElement<UniversalBlock>(block)) {
					return React.cloneElement(block, {
						...block.props,
						attributes,
					});
				}

				return block;
			})}
		</BlockPrimitiveContext.Provider>
	);
};

export default UniversalBlockProvider;
