import { useEffect, useRef, useCallback, RefObject, MutableRefObject } from 'react';

const FOCUS_SELECTOR = 'a, input, select, textarea, button, object, [tabindex]';

function ensureScopeTab(node: Element, event: KeyboardEvent) {
	const focusable = [...node.querySelectorAll(FOCUS_SELECTOR)];
	const finalFocusable = focusable[event.shiftKey ? 0 : focusable.length - 1];
	const isLeavingFinalFocusable =
		finalFocusable === document.activeElement || node === document.activeElement;

	if (!isLeavingFinalFocusable) {
		return;
	}

	event.preventDefault();

	const target = focusable[event.shiftKey ? focusable.length - 1 : 0] as HTMLElement;

	if (target) {
		target.focus();
	}
}

function returnFocus(originalFocus: MutableRefObject<Element | null>) {
	setTimeout(() => {
		if (originalFocus.current) {
			const element = originalFocus.current as HTMLElement;
			element.focus();
			originalFocus.current = null;
		}
	});
}

/**
 * A hook that traps focus onto a given element upon receiving true and will return focus upon
 * receiving false. The hook is pretty naive as there are lots of edge cases not covered given
 * that they won't be likely run into. Those  cases are for example (but not limited) handling
 * disabled elements, non-normative tab-index, etc.
 *
 * @param {boolean} isActive - Whether the focus trap is active or not
 * @param {?useRef} focusOnActive - An element to focus once the focus trap is activated
 * @returns {(function(*=): void)|*} function to be passed as a ref
 */
export function useFocusTrap(isActive: boolean, focusOnActive?: RefObject<HTMLElement>) {
	const nodeRef = useRef(null);
	const originalFocus = useRef<Element | null>(null);
	const firstFocusableElement = useRef<HTMLElement | null>(null);

	const setRef = useCallback(
		(node) => {
			if (!isActive) {
				return;
			}

			if (nodeRef.current) {
				returnFocus(originalFocus);
			}

			if (isActive && node) {
				originalFocus.current = document.activeElement;

				const processFocus = (node: HTMLElement) => {
					const hasProvidedFocusable = focusOnActive && focusOnActive.current;
					const firstFocusable = node.querySelectorAll(FOCUS_SELECTOR)[0];
					const focusTo = (
						hasProvidedFocusable ? focusOnActive.current : firstFocusable
					) as HTMLElement;

					if (firstFocusable) {
						firstFocusableElement.current = firstFocusable as HTMLElement;
						focusTo.focus();
					}
				};

				// Let a tick happen of the event loop
				setTimeout(() => {
					// Is the element still mounted?
					if (node.ownerDocument) {
						processFocus(node);
					}
				});

				nodeRef.current = node;
			} else {
				nodeRef.current = null;
			}
		},
		[isActive, focusOnActive],
	);

	useEffect(() => {
		if (!isActive) {
			return undefined;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Tab' && nodeRef.current) {
				ensureScopeTab(nodeRef.current, event);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isActive]);

	return setRef;
}
