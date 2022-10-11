/**
 * Removes field from objects or array of objects
 *
 * @param fields The list of fields
 * @param source The source data
 *
 * @returns
 */
export function removeFields<T>(fields: (keyof T)[] | '*'[], source: T[] | T) {
	const target: T[] | T = JSON.parse(JSON.stringify(source));

	fields.forEach((field) => {
		if (Array.isArray(target)) {
			target.forEach((_, index) => {
				if (typeof target[index][field] !== 'undefined') {
					delete target[index][field];
				}
			});
		} else if (typeof target[field] !== 'undefined') {
			delete target[field];
		}
	});

	return target;
}

/**
 * Accepts field from objects or array of objects
 *
 * @param fields The list of fields
 * @param source The source data
 *
 * @returns
 */
export function acceptFields<T>(fields: (keyof T)[] | '*'[], source: T[] | T) {
	const target = Array.isArray(source) ? ([] as T[]) : ({} as T);

	fields.forEach((field) => {
		if (Array.isArray(source) && Array.isArray(target)) {
			source.forEach((_, index) => {
				if (typeof source[index][field] !== 'undefined') {
					if (typeof target[index] === 'undefined') {
						target[index] = {} as T;
					}
					target[index][field] = source[index][field];
				}
			});
		} else if (
			!Array.isArray(source) &&
			!Array.isArray(target) &&
			typeof source[field] !== 'undefined'
		) {
			target[field] = source[field];
		}
	});

	return target;
}
