import { useState, useEffect, useRef, useCallback } from 'react';
import { useDebouncedCallback } from '../useDebouncedCallback/useDebouncedCallback';

/**
 * Debounces a value change so it doesn't create as many re renders.
 *
 * @param {*}       value - Value to be debounced
 * @param {?number} delay - Amount of miliseconds to delay the change
 * @returns {*} Debounced value
 */
export function useDebounce(value: any, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);
	const previousValue = useRef(value);
	const callback = useDebouncedCallback(
		useCallback((val) => setDebouncedValue(val), []),
		[],
		delay,
	);

	useEffect(() => {
		if (previousValue.current !== value) {
			callback(value);
			previousValue.current = value;
		}
	}, [value, callback, delay]);

	return debouncedValue;
}
