'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

export function useDebounce(callback: (...args: unknown[]) => void, delay: number) {
	const callbackRef = useRef(callback);
	const timer = useRef(0);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const naiveDebounce = useCallback((delayMs: number, ...args: unknown[]) => {
		clearTimeout(timer.current);
		timer.current = window.setTimeout(() => {
			callbackRef.current(...args);
		}, delayMs);
	}, []);

	return useMemo(
		() =>
			(...args: unknown[]) =>
				naiveDebounce(delay, ...args),
		[delay, naiveDebounce],
	);
}
