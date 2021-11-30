import { RefObject, useEffect, useRef } from 'react';

/**
 * Binds an event handler to given element and unbinds it on unmount
 *
 * @param {RefObject} ref    - RefObject pointing to the element that should get the event listener
 * @param {string} eventName - Event to bind
 * @param {Function} handler - Handler for the event
 * @param {*} params         - Extra parameters to pass to addEventListener
 */
export function useEvent<T extends EventTarget>(
	ref: RefObject<T>,
	eventName: string,
	handler: ((event: Event) => any) | null,
	...params: [...(EventListenerObject | any)]
) {
	const savedHandler = useRef<((event: Event) => void) | null>(null);

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const el = ref.current;
		if (!savedHandler.current || !el) {
			return () => {};
		}

		const listener = (event: Event) => savedHandler.current?.call(el, event);
		el.addEventListener(eventName, listener, ...params);

		// Remove event listener on cleanup
		return () => {
			if (el) {
				el.removeEventListener(eventName, listener, ...params);
			}
		};

		// Refs can't be watched but ESLint has no way of knowing they're refs
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventName]);
}
