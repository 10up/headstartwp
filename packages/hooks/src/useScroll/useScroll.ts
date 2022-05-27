import { useRef } from 'react';
import { isBrowser, getScrollPosition } from '../util';
import { useSafeLayoutEffect } from '../useSafeLayoutEffect/useSafeLayoutEffect';

/**
 * Custom hook to run an effect once the user scrolls through the page
 *
 * @param  effect - Effect that should be run on scroll, provides { prevPos, currPos } so it can
 * be used to determine scroll direction.
 * @param  deps   - Dependency array to re-bind if needed
 * @param  wait   - Debounce amount
 */
export function useScroll(effect: (...rest: any) => void, deps: [], wait?: number) {
	const position = useRef(getScrollPosition());
	const throttleTimeout = useRef<number | null>(null);

	const callback = () => {
		const currPos = getScrollPosition();
		effect({ prevPos: position.current, currPos });
		position.current = currPos;
		throttleTimeout.current = null;
	};

	useSafeLayoutEffect(() => {
		if (!isBrowser) {
			return () => {};
		}

		const handleScroll = () => {
			if (wait) {
				if (throttleTimeout.current !== null) {
					clearTimeout(throttleTimeout.current);
				}

				throttleTimeout.current = setTimeout(callback, wait) as unknown as number;
			} else {
				callback();
			}
		};

		window.addEventListener('scroll', handleScroll, {
			passive: true,
			capture: false,
		});

		return () => {
			window.removeEventListener('scroll', handleScroll);

			if (throttleTimeout.current) {
				clearTimeout(throttleTimeout.current);
			}
		};
	}, deps);
}
