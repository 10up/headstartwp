import { FrameworkError } from '../../utils';

export const isProxy: any = Symbol('isProxy');

export function makeErrorCatchProxy<T extends Record<string, any>>(objectName = 'data') {
	return new Proxy<T>({} as T, {
		get(obj, prop) {
			if (prop === isProxy) {
				return true;
			}

			throw new FrameworkError(
				`You are trying to access "${objectName}.${String(
					prop,
				)}" but it is not avaliable yet. Did you forget to fetch data on the server? Otherwise, handle the loading and error states accordingly`,
			);
		},
	});
}
