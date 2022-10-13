import { acceptFields, removeFields } from '../dataFilter';

type TObject = {
	id: number;
	slug?: string;
	content?: {
		rendered: string;
	};
};
describe('removeFields', () => {
	it('removes fields from objects', () => {
		const data: TObject = {
			id: 1,
			slug: 'test',
			content: {
				rendered: 'content',
			},
		};

		expect(removeFields(['slug', 'content'], data)).toMatchObject({
			id: 1,
		});

		// ensure it does not modify source
		expect(data).toEqual({ ...data });
	});

	it('removes fields from array of objects', () => {
		const data: TObject[] = [
			{
				id: 1,
				slug: 'test',
				content: {
					rendered: 'content',
				},
			},
		];

		expect(removeFields(['slug', 'content'], data)).toEqual([
			{
				id: 1,
			},
		]);

		// ensure it does not modify source
		expect(data).toEqual([...data]);
	});
});

describe('acceptFields', () => {
	it('accepts fields from objects', () => {
		const data: TObject = {
			id: 1,
			slug: 'test',
			content: {
				rendered: 'content',
			},
		};

		expect(acceptFields(['slug', 'content'], data)).toMatchObject({
			slug: 'test',
			content: {
				rendered: 'content',
			},
		});

		// ensure it does not modify source
		expect(data).toEqual({ ...data });
	});

	it('accepts fields from array of objects', () => {
		const data: TObject[] = [
			{
				id: 1,
				slug: 'test',
				content: {
					rendered: 'content',
				},
			},
			{
				id: 2,
			},
			{
				id: 3,
				slug: 'test2',
			},
		];

		expect(acceptFields(['slug', 'id'], data)).toEqual([
			{
				id: 1,
				slug: 'test',
			},
			{
				id: 2,
			},
			{
				id: 3,
				slug: 'test2',
			},
		]);

		// ensure it does not modify source
		expect(data).toEqual([...data]);
	});
});
