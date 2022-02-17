import { removeSourceUrl } from '..';

describe('removeSourceUrl', () => {
	it('removes source url', () => {
		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/',
				backendUrl: 'https://backendurl.com',
			}),
		).toEqual('/');

		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/post-name-1',
				backendUrl: 'https://backendurl.com',
			}),
		).toEqual('/post-name-1');

		expect(
			removeSourceUrl({
				link: 'https://backendurl.com/post-name-1/',
				backendUrl: 'http://backendurl.com',
			}),
		).toEqual('/post-name-1/');

		expect(
			removeSourceUrl({
				link: 'https://backendurl.com/post-name-1',
				backendUrl: 'https://backendurl.com',
			}),
		).toEqual('/post-name-1');

		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/post-name-1',
				backendUrl: 'https://backendurl.com/',
			}),
		).toEqual('/post-name-1');

		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/post-name-1?a=1&b=3&d=3',
				backendUrl: 'https://backendurl.com/',
			}),
		).toEqual('/post-name-1?a=1&b=3&d=3');

		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/post-name-1#id',
				backendUrl: 'https://backendurl.com/',
			}),
		).toEqual('/post-name-1#id');
	});

	it('removes source url when the backend url contains a folder', () => {
		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/folder/post-name-1',
				backendUrl: 'https://backendurl.com/folder',
			}),
		).toEqual('/post-name-1');

		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/folder/post-name-1/',
				backendUrl: 'https://backendurl.com/folder',
			}),
		).toEqual('/post-name-1/');

		expect(
			removeSourceUrl({
				link: 'https://backendurl.com/folder/post-name-1',
				backendUrl: 'https://backendurl.com/folder',
			}),
		).toEqual('/post-name-1');

		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/folder/post-name-1',
				backendUrl: 'https://backendurl.com/folder/',
			}),
		).toEqual('/post-name-1');

		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/folder/post-name-1?a=1&b=3&d=3',
				backendUrl: 'https://backendurl.com/folder',
			}),
		).toEqual('/post-name-1?a=1&b=3&d=3');

		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/folder/post-name-1#id',
				backendUrl: 'https://backendurl.com/folder/',
			}),
		).toEqual('/post-name-1#id');
	});

	it('adds subdirectory if frontity url contains it', () => {
		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/folder/post-name-1',
				backendUrl: 'https://backendurl.com/folder',
				publicUrl: 'https://publicurl.com/subdir/',
			}),
		).toEqual('/subdir/post-name-1');

		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/folder/post-name-1/',
				backendUrl: 'https://backendurl.com/folder',
				publicUrl: 'http://publicurl.com/subdir/',
			}),
		).toEqual('/subdir/post-name-1/');

		expect(
			removeSourceUrl({
				link: 'https://backendurl.com/folder/post-name-1',
				backendUrl: 'https://backendurl.com/folder',
				publicUrl: 'https://publicurl.com/subdir',
			}),
		).toEqual('/subdir/post-name-1');

		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/folder/post-name-1',
				backendUrl: 'https://backendurl.com/folder/',
				publicUrl: 'http://publicurl.com/subdir',
			}),
		).toEqual('/subdir/post-name-1');

		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/folder/post-name-1?a=1&b=3&d=3',
				backendUrl: 'https://backendurl.com/folder',
				publicUrl: 'https://publicurl.com/subdir/',
			}),
		).toEqual('/subdir/post-name-1?a=1&b=3&d=3');

		expect(
			removeSourceUrl({
				link: 'http://backendurl.com/folder/post-name-1#id',
				backendUrl: 'https://backendurl.com/folder/',
				publicUrl: 'http://publicurl.com/subdir/',
			}),
		).toEqual('/subdir/post-name-1#id');
	});
});
