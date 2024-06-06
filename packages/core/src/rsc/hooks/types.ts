import { FetchOptions } from '../../data';

export interface HookResponse {
	data?: {};
	isMainQuery: boolean;
}

export interface FetchHookOptions {
	fetchStrategyOptions?: Partial<FetchOptions>;
}
