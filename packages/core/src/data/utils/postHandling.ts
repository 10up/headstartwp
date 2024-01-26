import { AttachmentEntity, AuthorEntity, PostEntity, TermEntity } from '../types';
import { removeFields } from './dataFilter';

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
 * Returns the terms associated with the post
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
		if (!Array.isArray(taxonomy)) {
			return;
		}

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

export function removeFieldsFromPostRelatedData(
	fieldsToRemove: (keyof TermEntity | keyof AuthorEntity)[],
	post: PostEntity,
) {
	if (post._embedded) {
		return {
			...post,
			_embedded: {
				...post._embedded,
				'wp:featuredmedia': post._embedded?.['wp:featuredmedia']
					? post._embedded?.['wp:featuredmedia']?.map((attachments) =>
							removeFields(fieldsToRemove, attachments as AttachmentEntity[]),
					  )
					: [],
				author: post._embedded.author
					? (removeFields(fieldsToRemove, post._embedded.author) as AuthorEntity[])
					: [],
				'wp:term': post._embedded?.['wp:term']
					? post._embedded['wp:term']?.map(
							(terms) => removeFields(fieldsToRemove, terms) as TermEntity[],
					  )
					: [],
			},
		};
	}

	return post;
}
