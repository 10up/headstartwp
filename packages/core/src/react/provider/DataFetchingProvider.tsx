'use client';

import { FC } from 'react';
import { SWRConfig, SWRConfiguration } from 'swr';

export { unstable_serialize as serializeKey } from 'swr';

export type DataFetchingProviderProps = {
	/**
	 * Pass any configuration to the SWR library. Globally.
	 *
	 * These settings can be overridden at the hook level.
	 */
	swrConfig: SWRConfiguration;

	data: SWRConfiguration['fallback'];

	children: React.ReactNode;
};

export const DataFetchingProvider: FC<DataFetchingProviderProps> = ({
	swrConfig,
	data,
	children,
}) => {
	return <SWRConfig value={{ fallback: data, ...swrConfig }}>{children}</SWRConfig>;
};
