import { PostEntity, TermEntity } from '../types';

/**
 * Returns the author object from the post object if it exists
 *
 * @param post The Post object
 *
 * @category Data Handling
 */
export function getPostAuthor(post: PostEntity) {
	return post?._embedded?.author;
}

/**
 * Returns the terms assoiacted with the post
 *
 * @param post The Post object
 *
 * @category Data Handling
 */
export function getPostTerms(post: PostEntity): Record<string, TermEntity[]> {
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
