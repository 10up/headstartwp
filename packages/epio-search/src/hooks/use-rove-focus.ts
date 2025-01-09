'use client';

import { useState, useCallback, useEffect } from 'react';

export function useRoveFocus(size, collapsed) {
	const [currentFocus, setCurrentFocus] = useState(-1);
	const [isCollapsed, setIsCollapsed] = useState(collapsed);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				setCurrentFocus(currentFocus === size - 1 ? -1 : currentFocus + 1);
			}
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				setCurrentFocus(currentFocus === -1 ? size - 1 : currentFocus - 1);
			}
			if (e.key === 'Escape') {
				e.preventDefault();
				setIsCollapsed(true);
			}
		},
		[size, currentFocus, setCurrentFocus],
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown, false);
		return () => {
			document.removeEventListener('keydown', handleKeyDown, false);
		};
	}, [handleKeyDown]);

	return { focus: currentFocus, setFocus: setCurrentFocus, isCollapsed };
}
