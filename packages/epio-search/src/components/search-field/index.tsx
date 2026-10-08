'use client';

import { useEffect, useCallback, type JSX } from 'react';
import { useSearch } from '../../hooks/use-search';
import { useDebounce } from '../../hooks/use-debounce';
import { SearchFieldProps } from '../../types';

export default function SearchField({
	initialValue,
	searchTerm,
	name = 's',
	minSearchCharacters = 3,
	debounceMs = 200,
	...rest
}: SearchFieldProps): JSX.Element {
	const { refine } = useSearch();

	const search = useCallback(
		(value) => {
			refine(value, { minSearchCharacters });
		},
		[refine, minSearchCharacters],
	);

	const debouncedSearch = useDebounce((value) => {
		search(value);
	}, debounceMs);

	// search if an initial value is provided from parent component
	useEffect(() => {
		if (initialValue) {
			debouncedSearch(initialValue);
		}
	}, [initialValue, debouncedSearch]);

	return (
		<input
			type="search"
			className="search-field"
			defaultValue={searchTerm}
			name={name}
			onChange={(event) => {
				debouncedSearch(event.target.value);
			}}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
		/>
	);
}
