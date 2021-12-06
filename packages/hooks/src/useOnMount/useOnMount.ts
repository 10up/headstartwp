import { useEffect } from 'react';

/**
 * A hook that wraps useEffect to avoid needing to pass any dependency.
 *
 * @param effect Effect to be run
 * @returns void
 */
export function useOnMount(effect: () => any) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useEffect(effect, []);
}
