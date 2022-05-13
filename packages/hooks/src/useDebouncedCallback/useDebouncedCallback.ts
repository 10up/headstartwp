import { DependencyList, useCallback, useEffect, useRef } from 'react';

/**
 * Wraps a function that gets debounced
 *
 * @param  callback  - Callback to be debounced
 * @param  deps      - Extra dependency list
 * @param  delay     - Amount of milliseconds to debounce
 * @returns function - Function to be used for debounce
 */
export function useDebouncedCallback<Fn extends (...args: any[]) => any>(
	callback: Fn,
	deps: DependencyList,
	delay: number,
) {
	const functionTimeoutHandler = useRef<ReturnType<typeof setTimeout>>();
	const debouncedFunction = useRef<(...rest: any) => void>(callback);
	const cancelDebouncedCallback = useCallback(() => {
		if (functionTimeoutHandler.current) {
			clearTimeout(functionTimeoutHandler.current);
		}
		functionTimeoutHandler.current = undefined;
	}, []);

	// Clean on unmount
	useEffect(() => () => cancelDebouncedCallback());

	useEffect(() => {
		debouncedFunction.current = callback;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callback, ...deps]);

	return useCallback(
		(...args) => {
			cancelDebouncedCallback();

			functionTimeoutHandler.current = setTimeout(() => {
				cancelDebouncedCallback();
				debouncedFunction.current(...args);
			}, delay);
		},
		[delay, cancelDebouncedCallback],
	);
}
