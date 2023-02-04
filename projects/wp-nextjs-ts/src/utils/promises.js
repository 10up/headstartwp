export async function resolveBatch(promises) {
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

	const fulfilledPromises = settledPromises.filter(({ status }) => status === 'fulfilled');
	return fulfilledPromises.map(({ value }) => value);
}
