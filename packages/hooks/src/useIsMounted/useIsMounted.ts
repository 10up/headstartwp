import { useState } from 'react';
import { useEffectOnce } from '..';

/**
 * A hook that gets a mounted property to true once it's mounted. This will **only** happen on
 * the browser since servers don't mount components but merely renders. This hook is intended
 * to be used with problematic effects that might happen due to differences between browser
 * and server.
 *
 * @returns {boolean}
 */
export function useIsMounted() {
	const [isMounted, setIsMounted] = useState(false);

	useEffectOnce(() => {
		setIsMounted(true);
	});

	return isMounted;
}
