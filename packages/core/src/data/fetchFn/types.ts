import { EndpointParams, FetchOptions } from '../strategies';

export type QueryProps<P extends EndpointParams> = {
	path?: string;
	params?: Partial<P>;
	options?: Partial<FetchOptions>;
};
