import type { QueryProps } from '@headstartwp/core';

export type NextQueryProps<P> = {
	routeParams?: {
		path?: string | string[];
		site?: string;
		[k: string]: unknown;
	};
} & Omit<QueryProps<P>, 'path'>;
