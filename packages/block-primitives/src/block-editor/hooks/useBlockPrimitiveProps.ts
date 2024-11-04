import { useCallback } from 'react';
// @ts-expect-error
import { useBlockEditContext } from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';

export function useBlockPrimitiveProps() {
	const { clientId, isSelected } = useBlockEditContext();

	const attributes = select('core/block-editor').getBlockAttributes(clientId) ?? {};
	const setAttributes = useCallback(
		(newAttributes: Record<string, any>) => {
			dispatch('core/block-editor').updateBlockAttributes(clientId, newAttributes);
		},
		[clientId],
	);

	return { clientId, isSelected, attributes, setAttributes };
}
