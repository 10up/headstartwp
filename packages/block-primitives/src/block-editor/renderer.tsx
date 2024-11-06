import type { BlockProps } from '@headstartwp/core/react';
import React from 'react';
import type { HeadlessConfig, IDataWPBlock } from '@headstartwp/core';
import { select } from '@wordpress/data';
import { UniversalBlock } from '#shared/types.js';
import { useBlockPrimitiveProps } from './hooks/useBlockPrimitiveProps.js';

interface UniversalBlockRendererProps<
	Attrs extends IDataWPBlock,
	Props extends UniversalBlock<Attrs> = UniversalBlock<Attrs>,
> extends BlockProps<Attrs, { settings: HeadlessConfig; themeJSON: Record<string, any> }> {
	component: React.FC<Props>;
	componentProps?: Omit<Props, keyof UniversalBlock<Attrs>>;
}

export const UniversalBlockRenderer = <Attrs extends IDataWPBlock>({
	component: Component,
	componentProps = undefined,
}: UniversalBlockRendererProps<Attrs>) => {
	const { attributes } = useBlockPrimitiveProps<Attrs>();

	// @ts-expect-error experimental features is not typed
	const { __experimentalFeatures } = select('core/block-editor').getSettings();

	if (componentProps) {
		return (
			<Component
				attributes={attributes}
				themeJSON={__experimentalFeatures}
				{...componentProps}
			/>
		);
	}

	return <Component attributes={attributes} themeJSON={__experimentalFeatures} />;
};
