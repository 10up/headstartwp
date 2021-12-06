import { useCallback, useEffect, useRef } from 'react';

/**
 * A hook that gets a mounted property to true once it's mounted. This will **only** happen on
 * the browser since servers don't mount components but merely renders. This hook is intended
 * to be used with problematic effects that might happen due to differences between browser
 * and server.
 *
 * @returns {Function} Function that returns the mounted state of the current component.
 */
export function useIsMounted() {
	const isMounted = useRef(false);
	const getState = useCallback(() => isMounted.current, []);

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	});

	return getState;
}
