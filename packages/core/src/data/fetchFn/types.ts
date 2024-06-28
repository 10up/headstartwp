import { FetchOptions } from '../strategies';

export type QueryProps<P> = {
	path?: string;
	params?: Partial<P>;
	options?: Partial<FetchOptions>;
};
