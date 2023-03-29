import { FetchResponse } from '@10up/headless-core';

const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> =>
	input.status === 'fulfilled';

/**
 * The fetchBatch function recieves an array of PromiseObject and
 * optionally skips throwing exceptions for the ones passed with `throw: false`.
 *
 * @param promises Array of PromiseObject to be resolved.
 *
 * @returns {Promise} The resolved promises.
 */
export async function resolveBatch(
	promises: {
		func: Promise<{ key: string; data: FetchResponse<any>; isMainQuery: boolean }>;
		throw?: boolean;
	}[],
) {
	const promisesArray = Array.isArray(promises) ? promises : [promises];
	const promisesArrayFunc = promisesArray.map(({ func }) => func);
	const shouldThrowPromisesArray = promisesArray.map(({ throw: shouldThrow }) =>
		typeof shouldThrow === 'undefined' ? true : shouldThrow,
	);

	// using allSettled bc we still want to proceed if fetching certain promises fails
	const settledPromises = await Promise.allSettled(promisesArrayFunc);

	settledPromises.forEach((promise, index) => {
		const shouldThrow = shouldThrowPromisesArray[index];
		if (promise.status === 'rejected' && shouldThrow) {
			throw promise.reason;
		}
	});

	const fulfilledPromises = settledPromises.filter(isFulfilled);
	return fulfilledPromises.map(({ value }) => value);
}
