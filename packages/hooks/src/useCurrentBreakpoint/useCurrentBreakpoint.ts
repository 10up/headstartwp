import { useContext } from 'react';
import { BreakpointsContext } from '..';

/**
 * @typedef {Object} useCurrentBreakpointReturn
 * @property {Object} breakpoints - Provided breakpoints
 * @property {number} currentBreakpoint - Current breakpoint
 */

/**
 * Leverages BreakpointsContext to return currentBreakpoint and provided breakpoints.
 *
 * @returns {useCurrentBreakpointReturn}
 */
export function useCurrentBreakpoint() {
	const context = useContext(BreakpointsContext);

	if (!context) {
		throw new Error('useCurrentBreakpoint needs to be used within BreakpointsContext');
	}

	return context;
}
