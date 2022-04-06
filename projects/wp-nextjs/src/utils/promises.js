export async function fetchBatch(promises) {
	const promisesArray = Array.isArray(promises) ? promises : [promises];
	const promisesArrayFunc = promisesArray.map(({ func }) => func);
	const shouldThrowPromisesArray = promisesArray.map(
		({ throw: shouldThrow }) => shouldThrow || true,
	);

	// using allSettled bc we still want to proceed if fetching certain promises fails
	const settledPromises = await Promise.allSettled(promisesArrayFunc);

	settledPromises.forEach((promise, index) => {
		const shouldThrow = shouldThrowPromisesArray[index];
		if (promise.status === 'rejected' && shouldThrow) {
			throw promise.reason;
		}
	});

	return settledPromises.filter(({ status }) => status === 'fulfilled').map(({ value }) => value);
}
