import type { SWRConfiguration } from 'swr';
import type { FetchOptions } from '../../data';

export interface HookResponse {
	data?: {};
	error?: string;
	loading: boolean;
	isMainQuery: boolean;
}

export interface FetchHookOptions<T> {
	fetchStrategyOptions?: Partial<FetchOptions>;
	swr?: SWRConfiguration<T>;
	shouldFetch?: boolean;
}
