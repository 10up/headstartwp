'use client';

import { SearchField, Posts, useSearch, AutosuggestField } from '@headstartwp/epio-search';

export const SearchClient = () => {
	return (
		<header>
			<AutosuggestField />
		</header>
	);
};

export const SearchIt = () => {
	const { setTemplateName } = useSearch();
	setTemplateName('testing-postman');
	return (
		<>
			<SearchField />
			<Posts />
		</>
	);
};
