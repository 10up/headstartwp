import { useRef } from 'react';
import { useDebouncedCallback, useEventListener } from '..';
import { isBrowser } from '../util';

function getSize(): { width?: number; height?: number } {
	return {
		width: isBrowser ? window.innerWidth : undefined,
		height: isBrowser
			? document?.scrollingElement?.scrollHeight || window.innerHeight
			: undefined,
	};
}

const ref = isBrowser ? { current: window } : { current: null };

/**
 * A custom hooks that runs a handler when the window resizes. This happens
 * out of a render cycle.
 *
 * @param {Function} handler - Handler to be run
 * @param {number} debounce - How much to debounce the call, 300ms by default.
 */
export function useOnWindowResize<Fn extends (...args: any[]) => any>(handler: Fn, debounce = 300) {
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
		debounce,
	);

	useEventListener(ref, 'resize', callback);
}
