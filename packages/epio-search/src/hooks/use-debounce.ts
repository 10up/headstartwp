'use client';

import { useCallback, useMemo, useRef } from 'react';

export function useDebounce(callback: (...args: unknown[]) => void, delay: number) {
	const callbackRef = useRef(callback);
	const timer = useRef(0);

	const naiveDebounce = useCallback(
		(fn: (...args: unknown[]) => void, delayMs: number, ...args: unknown[]) => {
			clearTimeout(timer.current);
			timer.current = window.setTimeout(() => {
				fn(...args);
			}, delayMs);
		},
		[],
	);

	return useMemo(
		() =>
			(...args: unknown[]) =>
				naiveDebounce(callbackRef.current, delay, ...args),
		[delay, naiveDebounce],
	);
}
