import { useContext } from 'react';
import { TransitionContext } from '..';

/**
 * A wrapper around Transition's context to get whether the page is transitioning or not.
 *
 * @returns {boolean} Whether the page is transitioning or not.
 */
export function useIsTransitioning() {
	const { isTransitioning } = useContext(TransitionContext);
	return isTransitioning;
}
