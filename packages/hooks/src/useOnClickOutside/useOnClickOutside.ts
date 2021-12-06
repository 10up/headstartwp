import { RefObject } from 'react';
import { useEvent } from '..';
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
	const handleClick = handler
		? (event: Event) => {
				const targetElement = event.target as Node;

				if (
					!ref.current ||
					// If element is gone do nothing
					!targetElement.isConnected ||
					// Do nothing if clicking ref's element or descendent elements
					ref.current.contains(targetElement)
				) {
					return;
				}

				handler(event);
		  }
		: null;

	useEvent({ current: body }, 'click', handleClick);
}
