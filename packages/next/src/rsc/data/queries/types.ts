import type { QueryProps } from '@headstartwp/core';

export type NextQueryProps<P, Error extends boolean = true> = {
	routeParams?: {
		path?: string | string[];
		site?: string;
		[k: string]: unknown;
	};
	handleError?: Error;
} & Omit<QueryProps<P>, 'path'>;
