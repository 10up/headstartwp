import { EPConfig } from '../types';

export function getESEndpoint(config: EPConfig): string {
	const { node, indexName } = config;

	if (!node) {
		throw new Error('You must specify an ElasticSearch node');
	}

	const url = new URL(node);
	if (url.host.includes('elasticpress.io')) {
		return `${node}/api/v1/search/posts/${indexName}`;
	}

	return '';
}
