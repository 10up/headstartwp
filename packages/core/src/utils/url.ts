/** This code has been extracted from the @wordpress/url package */

/**
 * Sets a value in object deeply by a given array of path segments. Mutates the
 * object reference.
 *
 * @param {Record<string,*>} object Object in which to assign.
 * @param {string[]}         path   Path segment at which to set value.
 * @param {*}                value  Value to set.
 */
function setPath(object: Record<string, any>, path: string[], value: any) {
	const { length } = path;
	const lastIndex = length - 1;
	for (let i = 0; i < length; i++) {
		let key = path[i];

		if (!key && Array.isArray(object)) {
			// If key is empty string and next value is array, derive key from
			// the current length of the array.
			key = object.length.toString();
		}

		key = ['__proto__', 'constructor', 'prototype'].includes(key) ? key.toUpperCase() : key;

		// If the next key in the path is numeric (or empty string), it will be
		// created as an array. Otherwise, it will be created as an object.
		const isNextKeyArrayIndex = !isNaN(Number(path[i + 1]));

		object[key] =
			i === lastIndex
				? // If at end of path, assign the intended value.
					value
				: // Otherwise, advance to the next object in the path, creating
					// it if it does not yet exist.
					object[key] || (isNextKeyArrayIndex ? [] : {});

		if (Array.isArray(object[key]) && !isNextKeyArrayIndex) {
			// If we current key is non-numeric, but the next value is an
			// array, coerce the value to an object.
			object[key] = { ...object[key] };
		}

		// Update working reference object to the next in the path.
		// eslint-disable-next-line no-param-reassign
		object = object[key];
	}
}

export function getQueryString(url: string) {
	let query;
	try {
		query = new URL(url, 'http://example.com').search.substring(1);
	} catch (error) {
		// do nothing
	}

	if (query) {
		return query;
	}

	return '';
}

/**
 * Returns an object of query arguments of the given URL. If the given URL is
 * invalid or has no querystring, an empty object is returned.
 *
 * @param {string} url URL.
 *
 * @example
 * ```js
 * const foo = getQueryArgs( 'https://wordpress.org?foo=bar&bar=baz' );
 * // { "foo": "bar", "bar": "baz" }
 * ```
 *
 * @returns Query args object.
 */
export function getQueryArgs(url: string): Record<string, any> {
	return (
		(getQueryString(url) || '')
			// Normalize space encoding, accounting for PHP URL encoding
			// corresponding to `application/x-www-form-urlencoded`.
			//
			// See: https://tools.ietf.org/html/rfc1866#section-8.2.1
			.replace(/\+/g, '%20')
			.split('&')
			.reduce((accumulator, keyValue) => {
				const [key, value = ''] = keyValue
					.split('=')
					// Filtering avoids decoding as `undefined` for value, where
					// default is restored in destructuring assignment.
					.filter(Boolean)
					.map(decodeURIComponent);

				if (key) {
					const segments = key.replace(/\]/g, '').split('[');
					setPath(accumulator, segments, value);
				}

				return accumulator;
			}, Object.create(null))
	);
}

/**
 * Generates URL-encoded query string using input query data.
 *
 * It is intended to behave equivalent as PHP's `http_build_query`, configured
 * with encoding type PHP_QUERY_RFC3986 (spaces as `%20`).
 *
 * @example
 * ```js
 * const queryString = buildQueryString( {
 *    simple: 'is ok',
 *    arrays: [ 'are', 'fine', 'too' ],
 *    objects: {
 *       evenNested: {
 *          ok: 'yes',
 *       },
 *    },
 * } );
 * // "simple=is%20ok&arrays%5B0%5D=are&arrays%5B1%5D=fine&arrays%5B2%5D=too&objects%5BevenNested%5D%5Bok%5D=yes"
 * ```
 *
 * @param {Record<string,*>} data Data to encode.
 *
 * @returns {string} Query string.
 */
export function buildQueryString(data: Record<string, any>) {
	let string = '';

	const stack = Object.entries(data);

	let pair;
	// eslint-disable-next-line no-cond-assign
	while ((pair = stack.shift())) {
		// eslint-disable-next-line prefer-const
		let [key, value] = pair;

		// Support building deeply nested data, from array or object values.
		const hasNestedData = Array.isArray(value) || (value && value.constructor === Object);

		if (hasNestedData) {
			// Push array or object values onto the stack as composed of their
			// original key and nested index or key, retaining order by a
			// combination of Array#reverse and Array#unshift onto the stack.
			const valuePairs = Object.entries(value).reverse();
			for (const [member, memberValue] of valuePairs) {
				stack.unshift([`${key}[${member}]`, memberValue]);
			}
		} else if (value !== undefined) {
			// Null is treated as special case, equivalent to empty string.
			if (value === null) {
				value = '';
			}

			string += `&${[key, value].map(encodeURIComponent).join('=')}`;
		}
	}

	// Loop will concatenate with leading `&`, but it's only expected for all
	// but the first query parameter. This strips the leading `&`, while still
	// accounting for the case that the string may in-fact be empty.
	return string.substr(1);
}

export function addQueryArgs(url: string, args: Record<string, any>): string {
	// If no arguments are to be appended, return original URL.
	if (!args || !Object.keys(args).length) {
		return url;
	}

	let baseUrl = url;

	let finalArgs = { ...args };
	// Determine whether URL already had query arguments.
	const queryStringIndex = url.indexOf('?');
	if (queryStringIndex !== -1) {
		// Merge into existing query arguments.
		finalArgs = Object.assign(getQueryArgs(url), finalArgs);

		// Change working base URL to omit previous query arguments.
		baseUrl = baseUrl.substring(0, queryStringIndex);
	}

	return `${baseUrl}?${buildQueryString(finalArgs)}`;
}
