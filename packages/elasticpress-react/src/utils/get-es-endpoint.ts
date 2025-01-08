import { EPConfig } from '../types';

export function getESEndpoint(config: EPConfig): string {
	const { node, indexName } = config;

	if (node.includes('elasticpress.io')) {
		return `${node}/api/v1/search/posts/${indexName}`;
	}

	return '';
}
