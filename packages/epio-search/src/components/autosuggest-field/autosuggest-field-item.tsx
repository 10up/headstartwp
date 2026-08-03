'use client';

import { useEffect, useRef, useCallback, ReactElement } from 'react';
import { EPPost } from '../../types';
import styles from './styles.module.css';
import { useElasticPress } from '../provider/ep-provider';

interface AutosuggestFieldItemProps {
	focus: boolean;
	result: EPPost;
	index: number;
	setFocus: (index: number) => void;
}

export default function AutosuggestFieldItem({
	result,
	focus,
	index,
	setFocus,
}: AutosuggestFieldItemProps): ReactElement {
	const ref = useRef<HTMLLIElement>(null);
	const { onNavigation } = useElasticPress();

	useEffect(() => {
		if (focus && ref.current) {
			// Move element into view when it is focused
			ref.current.focus();
		}
	}, [focus]);

	const handleNavigate = useCallback(() => {
		if (typeof onNavigation === 'function') {
			onNavigation(result);
		}
	}, [onNavigation, result]);

	const handleSelect = useCallback(
		(event) => {
			if (event.key === 'Enter') {
				handleNavigate();
				return;
			}
			// setting focus to that element when it is selected
			setFocus(index);
		},
		[index, setFocus, handleNavigate],
	);

	return (
		<li
			tabIndex={focus ? 0 : -1}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
			role="button"
			className={`${styles.dropdownItem} autosuggest-item`}
			ref={ref}
			onClick={handleNavigate}
			onKeyDown={handleSelect}
		>
			{result.post_title}
		</li>
	);
}
