import { postMatchers } from '../matchers';
import { parsePath } from '../parsePath';

describe('parsePath', () => {
	it('parses post paths', () => {
		expect(parsePath(postMatchers, '/parent-post/post-name')).toEqual({ slug: 'post-name' });
		expect(parsePath(postMatchers, '/2017/12/23/post-name')).toEqual({
			day: '23',
			month: '12',
			year: '2017',
			slug: 'post-name',
		});
	});
});
