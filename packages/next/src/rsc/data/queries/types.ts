import type { EndpointParams, QueryProps } from '@headstartwp/core';

export type NextQueryProps<P extends EndpointParams> = {
	routeParams?: {
		path?: string | string[];
		site?: string;
		lang?: string;
		[k: string]: unknown;
	};
	handleError?: boolean;
} & Omit<QueryProps<P>, 'path'>;
