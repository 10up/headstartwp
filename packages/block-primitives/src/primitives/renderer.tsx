import type { BlockProps } from '@headstartwp/core/react';
import React from 'react';
import type { HeadlessConfig, IDataWPBlock } from '@headstartwp/core';
import { UniversalBlock } from '#shared/types.js';

interface UniversalBlockRendererProps<
	Attrs extends IDataWPBlock,
	Props extends UniversalBlock<Attrs> = UniversalBlock<Attrs>,
> extends BlockProps<Attrs, { settings: HeadlessConfig; themeJSON: Record<string, any> }> {
	component: React.FC<Props>;
	componentProps?: Omit<Props, keyof UniversalBlock<Attrs>>;
}

export const UniversalBlockRenderer = <Attrs extends IDataWPBlock>({
	block,
	children,
	blockContext,
	component: Component,
	componentProps = undefined,
}: UniversalBlockRendererProps<Attrs>) => {
	if (!block) {
		return null;
	}

	const { attributes } = block;

	const settings = blockContext?.settings;
	const themeJSON = blockContext?.themeJSON;

	if (componentProps) {
		return (
			<Component
				attributes={attributes}
				settings={settings}
				themeJSON={themeJSON}
				{...componentProps}
			>
				{children}
			</Component>
		);
	}

	return (
		<Component attributes={attributes} settings={settings} themeJSON={themeJSON}>
			{children}
		</Component>
	);
};
