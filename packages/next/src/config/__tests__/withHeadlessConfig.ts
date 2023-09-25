import { toStringWithFunctions } from '../withHeadlessConfig';

describe('toStringWithFunctions', () => {
	it('converts regular objects to strings', () => {
		const obj = {
			a: 'a',
			b: 'b',
			c: 'c',
		};
		expect(toStringWithFunctions(obj)).toMatchInlineSnapshot(`
      "{
        "a": "a",
        "b": "b",
        "c": "c"
      }"
    `);
	});
	it('converts functions to strings', () => {
		const obj = {
			a: 'test',
			fn: () => {
				// eslint-disable-next-line no-console
				console.log('test');
			},
			nested: {
				fn: () => {},
			},
		};
		expect(toStringWithFunctions(obj)).toMatchInlineSnapshot(`
      "{
        "a": "test",
        "fn": () => {
                      // eslint-disable-next-line no-console
                      console.log('test');
                  },
        "nested": {
          "fn": () => { }
        }
      }"
    `);
	});
});
