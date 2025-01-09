import { getESEndpoint } from '../get-es-endpoint';
import { EPConfig } from '../../types';

describe('getESEndpoint', () => {
	it('should return the correct endpoint for elasticpress.io', () => {
		const config: EPConfig = {
			node: 'https://elasticpress.io',
			indexName: 'test-index',
		};
		const result = getESEndpoint(config);
		expect(result).toBe('https://elasticpress.io/api/v1/search/posts/test-index');
	});

	it('should throw an error if node is not specified', () => {
		const config: EPConfig = {
			node: '',
			indexName: 'test-index',
		};
		expect(() => getESEndpoint(config)).toThrow('You must specify an ElasticSearch node');
	});

	it('should return an empty string if elasticpress.io is not the hostname', () => {
		const config: EPConfig = {
			node: 'https://example.com/elasticpress.io',
			indexName: 'test-index',
		};
		const result = getESEndpoint(config);
		expect(result).toBe('');
	});

	it('should return an empty string for non-elasticpress.io hosts', () => {
		const config: EPConfig = {
			node: 'https://example.com',
			indexName: 'test-index',
		};
		const result = getESEndpoint(config);
		expect(result).toBe('');
	});
});
