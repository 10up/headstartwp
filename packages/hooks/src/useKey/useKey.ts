import { RefObject, useMemo } from 'react';
import { useEventListener } from '../useEventListener/useEventListener';

/**
 * Normalizes the keys that the useKey hook can handle allowing for different options
 *
 * @param {string|Function|*} key -
 * The key being evaluated which can be of different types for flexibility:
 * - If it's a string it will be compared against the event's key property to see if it matches.
 * - If it's a function it will be run with the event for the hook's usage to decide.
 * - If it's any other type it'll evaluate falsy / truthy to decide.
 * @returns {(function(*): boolean)} Returns a function that determines if the event is applicable or not
 */
const createMatchesKey = (key: string | ((event: KeyboardEvent) => boolean) | any) => {
	if (typeof key === 'function') {
		return key;
	}

	if (typeof key === 'string') {
		return (event: KeyboardEvent) => event.key === key;
	}

	return key ? () => true : () => false;
};

/**
 * Convenient wrapper around useEventListener to handle key presses allowing to send either the
 * key being watched, a function to evaluate or any truthy/falsy value
 *
 * @param {Object}            ref     - reference from useRef containing a DOM node
 * @param {string|Function|*} key     - the key being evaluated
 * @param {Function}          handler - handler function to be called if the key matches
 * @see createMatchesKey
 * @see useEventListener
 */
export function useKey(
	ref: RefObject<HTMLElement>,
	key: string | ((event: Event) => boolean) | any,
	handler: (event: KeyboardEvent) => void,
) {
	const useMemoHandler = useMemo(() => {
		const fn = createMatchesKey(key);

		return (handlerEvent: Event) => {
			if (fn(handlerEvent)) {
				return handler(handlerEvent as KeyboardEvent);
			}

			return () => {};
		};
	}, [key, handler]);

	useEventListener(ref, 'keydown', useMemoHandler);
}
