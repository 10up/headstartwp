'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

export function useRoveFocus(size: number, collapsed: boolean) {
	const [currentFocus, setCurrentFocus] = useState(-1);
	const [isCollapsed, setIsCollapsed] = useState(collapsed);
	const focusRef = useRef(currentFocus);
	const collapsedRef = useRef(isCollapsed);

	useEffect(() => {
		focusRef.current = currentFocus;
		collapsedRef.current = isCollapsed;
	}, [currentFocus, isCollapsed]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				const newFocus = focusRef.current >= size - 1 ? 0 : focusRef.current + 1;
				setCurrentFocus(newFocus);
			}
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				const newFocus = focusRef.current <= 0 ? size - 1 : focusRef.current - 1;
				setCurrentFocus(newFocus);
			}
			if (e.key === 'Escape') {
				e.preventDefault();
				setIsCollapsed(true);
			}
		},
		[size],
	);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;
		if (!collapsed) {
			document.addEventListener('keydown', handleKeyDown, { signal });
		}
		return () => {
			controller.abort();
		};
	}, [collapsed, handleKeyDown]);

	return { focus: currentFocus, setFocus: setCurrentFocus, isCollapsed, setIsCollapsed };
}
