export async function asyncForEach(
	array: Array<any>,
	callback: (el: any, index: number, array: Array<any>) => void,
) {
	for (let index = 0; index < array.length; index++) {
		// eslint-disable-next-line no-await-in-loop
		await callback(array[index], index, array);
	}
}
