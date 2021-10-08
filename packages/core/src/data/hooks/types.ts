import { Entity } from '../types';

export interface EndpointParams {
	_embed?: boolean;
	[k: string]: unknown;
}

export type GetParamsFromURL = (params: { args?: string[] }) => EndpointParams;

export type BuildEndpointURL = (endpoint: string, params: EndpointParams) => string;

export type FetcherFunction = (url: string) => Promise<Entity>;
