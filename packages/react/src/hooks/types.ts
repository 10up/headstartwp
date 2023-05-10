import { SWRConfiguration } from 'swr';
import { FetchOptions } from '@headstartwp/core';

export interface HookResponse {
	data?: {};
	error?: string;
	loading: boolean;
	isMainQuery: boolean;
}

export interface FetchHookOptions<T> {
	fetchStrategyOptions?: Partial<FetchOptions>;
	swr?: SWRConfiguration<T>;
}
