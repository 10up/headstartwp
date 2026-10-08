'use client';

/**
 * ElasticPress autosuggest field
 */

import { useEffect, type JSX } from 'react';
import { useElasticPress } from '../provider/ep-provider';
import { useRoveFocus } from '../../hooks/use-rove-focus';
import SearchField from '../search-field';
import AutosuggestFieldItem from './autosuggest-field-item';
import { SearchFieldProps } from '../../types';
import styles from './styles.module.css';

interface AutosuggestFieldProps extends Omit<SearchFieldProps, 'debounceMs'> {
	onItemRender?: (item: any) => any;
	collapsed?: boolean;
}

export default function AutosuggestField({
	initialValue = '',
	name = 's',
	minSearchCharacters = 3,
	searchTerm = '',
	onItemRender = (item) => item,
	collapsed = false,
	...rest
}: AutosuggestFieldProps): JSX.Element {
	const { results } = useElasticPress();
	const size = results.items ? results.items.length : 0;
	const { focus, setFocus, isCollapsed, setIsCollapsed } = useRoveFocus(size, collapsed);

	useEffect(() => {
		setIsCollapsed(!results.items);
	}, [results, setIsCollapsed]);

	return (
		<div className={`${styles.container} ep-autosuggest-container`}>
			<SearchField
				name={name}
				initialValue={initialValue}
				minSearchCharacters={minSearchCharacters}
				searchTerm={searchTerm}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...rest}
			/>
			{!isCollapsed && results.items && results.items.length > 0 ? (
				<div className={`${styles.dropdownContainer} ep-autosuggest`}>
					<ul className={`${styles.dropdownList} autosuggest-list`} role="listbox">
						{results.items.map((result, index) => {
							return (
								<AutosuggestFieldItem
									key={result.ID}
									setFocus={setFocus}
									index={index}
									focus={focus === index}
									result={onItemRender(result)}
								/>
							);
						})}
					</ul>
				</div>
			) : null}
		</div>
	);
}
