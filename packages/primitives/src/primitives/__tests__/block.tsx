import { render } from '@testing-library/react';
import Block, { useBlockPrimitiveProps } from '../block.js';

describe('<Block>', () => {
	it('simply render childrens', () => {
		const { asFragment } = render(
			<Block>
				<p>children</p>
			</Block>,
		);

		expect(asFragment()).toMatchSnapshot();
	});
});

describe('useBlockPrimitiveProps', () => {
	it('throws an error', () => {
		expect(() => {
			useBlockPrimitiveProps();
		}).toThrow();
	});
});
