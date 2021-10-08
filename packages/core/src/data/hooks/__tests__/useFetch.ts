import { renderHook } from '@testing-library/react-hooks';
import { useFetch, buildGetEndpointURL, defaultGetParamsFromURL } from '../useFetch';

jest.mock('next/router', () => ({
	useRouter() {
		return {
			route: '/',
			pathname: '',
			query: {},
			asPath: '',
		};
	},
}));

describe('buildGetEndpointURL', () => {
	const endpoint = '/wp-json/wp/v2/posts';
	it('builds a url from params properly', () => {
		expect(buildGetEndpointURL(endpoint, { _embed: false })).toEqual(endpoint);
		expect(buildGetEndpointURL(endpoint, { _embed: true })).toEqual(`${endpoint}?_embed=true`);
		expect(buildGetEndpointURL(endpoint, { _embed: true, slug: 'test' })).toEqual(
			`${endpoint}?slug=test&_embed=true`,
		);
		expect(
			buildGetEndpointURL(endpoint, { _embed: true, slug: 'test', category: '1' }),
		).toEqual(`${endpoint}?slug=test&category=1&_embed=true`);
		expect(
			buildGetEndpointURL(endpoint, {
				_embed: true,
				slug: 'test',
				category: '1',
				status: 'publish',
			}),
		).toEqual(`${endpoint}?slug=test&category=1&status=publish&_embed=true`);
	});
});

describe('defaultGetParamsFromURL', () => {
	it('extract extracts posts param from the url', () => {
		expect(defaultGetParamsFromURL({ args: ['post-name'] })).toEqual({ slug: 'post-name' });
		expect(defaultGetParamsFromURL({ args: ['parent-page', 'post-name'] })).toEqual({
			slug: 'post-name',
		});
	});
});

describe('useFetch', () => {
	it('fetches data properly', async () => {
		const { result, waitForNextUpdate } = renderHook(() =>
			useFetch('/wp-json/wp/v2/posts', {}),
		);
		expect(result.current.data).toBeUndefined();
		await waitForNextUpdate();
		expect(result.current.data).toMatchSnapshot();
	});
});
