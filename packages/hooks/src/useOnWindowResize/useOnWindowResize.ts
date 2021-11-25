import { useRef, useEffect } from 'react';
import { useDebouncedCallback } from '..';
import { isBrowser } from '../util';

function getSize(): { width?: number; height?: number } {
	return {
		width: isBrowser ? window.innerWidth : undefined,
		height: isBrowser
			? document?.scrollingElement?.scrollHeight || window.innerHeight
			: undefined,
	};
}

/**
 * A custom hooks that runs a handler when the window resizes. This happens
 * out of a render cycle.
 *
 * @param handler - Handler to be run
 */
export function useOnWindowResize<Fn extends (...args: any[]) => any>(handler: Fn) {
	const windowSize = useRef<{ width?: number; height?: number }>(getSize());

	const callback = useDebouncedCallback(
		() => {
			const newSize = getSize();

			if (
				newSize.width !== windowSize.current.width ||
				newSize.height !== windowSize.current.height
			) {
				windowSize.current = newSize;
				handler();
			}
		},
		[],
		300,
	);

	useEffect(() => {
		if (!isBrowser) {
			return () => {};
		}

		window.addEventListener('resize', callback);
		return () => window.removeEventListener('resize', callback);
	}, [callback]);
}
