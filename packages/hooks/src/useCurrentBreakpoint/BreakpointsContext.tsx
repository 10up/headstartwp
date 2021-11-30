import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { useOnWindowResize, useOnMount } from '..';
import { isBrowser } from '../util';

const DEFAULT_BREAKPOINTS = {
	sm: 39.6875, // 635px
	md: 53.125, // 850px
	lg: 64, // 1024px
	xl: 80.9375, // 1295px
};
const DEFAULT_BP_UNIT = 'em';
const DEFAULT_DEBOUNCE = 300;
const DEFAULT_BREAKPOINT = DEFAULT_BREAKPOINTS.sm;

interface Props {
	breakpointUnit?: string;
	debounceDelay?: number;
	breakpoints?: Dictionary<number>;
	defaultBreakpoint?: number;
	children: ReactNode;
}

type Context = {
	breakpoints: Dictionary<number>;
	currentBreakpoint: number;
};

const BreakpointsContext = createContext<Context | undefined>(undefined);

/**
 * Guesses the current breakpoint in order. It needs to have an already sorted array which is
 * provided by the provider below.
 *
 * @param {Array<{size: number; mq: string}>} breakpointsMedias Array of breakpoints in descending
 * order provided by the BreakpointsProvider.
 * @param {number} defaultSize Default size when no media queries match.
 *
 * @returns {number} The current breakpoint, if none of the breakpoints matched or if it's SSR it
 * will return the defaultSize.
 */
function getCurrentBreakpoint(
	breakpointsMedias: { size: number; mq: string }[],
	defaultSize: number,
) {
	if (!isBrowser) {
		return defaultSize;
	}

	return (
		breakpointsMedias.find(
			(breakpoint) => Boolean(matchMedia) && matchMedia(breakpoint.mq).matches,
		)?.size || defaultSize
	);
}

const BreakpointsProvider = ({
	breakpointUnit = DEFAULT_BP_UNIT,
	debounceDelay = DEFAULT_DEBOUNCE,
	breakpoints = DEFAULT_BREAKPOINTS,
	defaultBreakpoint = DEFAULT_BREAKPOINT,
	children,
}: Props) => {
	const [currentBreakpoint, setCurrentBreakpoint] = useState(defaultBreakpoint);
	// Sorting the breakpoints descending to use Mobile first
	const sortedBreakpoints = useMemo(() => {
		return Object.keys(breakpoints)
			.map((key) => breakpoints[key])
			.sort((a, b) => b - a)
			.map((size) => ({
				size,
				mq: `(min-width: ${size}${breakpointUnit})`,
			}));
	}, [breakpoints, breakpointUnit]);
	// This callback won't ever change unless breakpoints change which normally don't in runtime
	const guessSize = useCallback(() => {
		const size = getCurrentBreakpoint(sortedBreakpoints, defaultBreakpoint);
		setCurrentBreakpoint(size);
	}, [sortedBreakpoints, defaultBreakpoint]);
	// Guessing the size on mount
	useOnMount(() => guessSize());
	// And re-guessing on window resize
	useOnWindowResize(guessSize, debounceDelay);

	return (
		<BreakpointsContext.Provider value={{ breakpoints, currentBreakpoint }}>
			{children}
		</BreakpointsContext.Provider>
	);
};

BreakpointsProvider.defaultProps = {
	breakpointUnit: DEFAULT_BP_UNIT,
	debounceDelay: DEFAULT_DEBOUNCE,
	breakpoints: DEFAULT_BREAKPOINTS,
	defaultBreakpoint: DEFAULT_BREAKPOINT,
};

BreakpointsProvider.displayName = 'BreakpointsContext.Provider';
BreakpointsContext.displayName = 'BreakpointsContext';

export { BreakpointsProvider, BreakpointsContext };
