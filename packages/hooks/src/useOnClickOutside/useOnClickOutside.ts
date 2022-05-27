import { RefObject, useCallback } from 'react';
import { useEventListener } from '../useEventListener/useEventListener';
import { isBrowser } from '../util';

const body = isBrowser ? document.body : null;

/**
 * Hook that runs a function once a click happens out of the provided element.
 *
 * @param  ref     - Ref that contains the element that should be checked against
 * @param  handler - Handler to run if the clicked element isn't inside the provided element.
 */
export function useOnClickOutside(
	ref: RefObject<HTMLElement>,
	handler: ((event?: Event) => void) | null,
) {
	const handleClick = useCallback(
		(event: Event) => {
			const targetElement = event.target as Node;

			if (
				!handler ||
				!ref.current ||
				// If element is gone do nothing
				!targetElement.isConnected ||
				// Do nothing if clicking ref's element or descendent elements
				ref.current.contains(targetElement)
			) {
				return;
			}

			handler(event);
		},
		// Refs can't be watched but ESLint has no way of knowing they're refs
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[handler],
	);

	useEventListener({ current: body }, 'click', handler ? handleClick : null);
}
