import { useCallback } from 'react';
import { useBlockEditContext } from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';

export function useBlockPrimitiveProps<Attrs extends Record<string, any>>() {
	const { clientId, isSelected } = useBlockEditContext();

	const attributes = select('core/block-editor').getBlockAttributes(clientId) ?? {};
	const setAttributes = useCallback(
		(newAttributes: Attrs) => {
			// `dispatch` resolves to `unknown` for a string store key in
			// @wordpress/data 10, and block-editor 15 exposes no typed store
			// descriptor to pass instead.
			const { updateBlockAttributes } = dispatch('core/block-editor') as {
				updateBlockAttributes: (id: string, attrs: Attrs) => void;
			};
			updateBlockAttributes(clientId, newAttributes);
		},
		[clientId],
	);

	return { clientId, isSelected, attributes: attributes as Attrs, setAttributes };
}
