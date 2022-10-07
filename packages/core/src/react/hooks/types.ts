import { SWRConfiguration } from 'swr';
import { FetchOptions } from '../../data';

export interface HookResponse {
	data?: {};
	error?: string;
	loading: boolean;
}

export interface FetchHookOptions<T> {
	fetchStrategyOptions?: Partial<FetchOptions>;
	swr?: SWRConfiguration<T>;
}
