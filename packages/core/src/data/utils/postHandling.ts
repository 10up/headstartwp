import { PostEntity } from '../types';

export function getPostAuthor(post: PostEntity) {
	return post?._embedded?.author;
}

export function getPostTerms(post: PostEntity) {
	const terms: PostEntity['terms'] = {};

	if (
		typeof post?._embedded === 'undefined' ||
		typeof post._embedded['wp:term'] === 'undefined'
	) {
		return terms;
	}

	post._embedded['wp:term'].forEach((taxonomy) => {
		taxonomy.forEach((term) => {
			const taxonomySlug = term.taxonomy;

			if (typeof terms[taxonomySlug] === 'undefined') {
				terms[taxonomySlug] = [];
			}

			terms[taxonomySlug].push(term);
		});
	});

	return terms;
}
