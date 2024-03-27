import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Block, { useBlockPrimitiveProps } from '../block.js';
import RichText from '../rich-text.js';

describe('<Block>', () => {
	let attributes = {};
	const setAttributes = jest.fn((newAttributes) => {
		attributes = { ...attributes, ...newAttributes };
		return attributes;
	});

	it('simply render childrens', () => {
		const { asFragment } = render(
			<Block attributes={attributes} setAttributes={setAttributes}>
				<p>children</p>
			</Block>,
		);

		expect(asFragment()).toMatchSnapshot();
	});

	it('allow consumers to call setAttributes', async () => {
		const user = userEvent.setup();

		const { asFragment } = render(
			<Block attributes={attributes} setAttributes={setAttributes}>
				<RichText
					name="heading"
					tagName="h1"
					placeholder="Heading..."
					onPrimitiveChange={(name, value, setAttributes) => {
						setAttributes({ [name]: value });
					}}
				/>
			</Block>,
		);

		expect(asFragment()).toMatchSnapshot();
		await user.click(screen.getByLabelText('Heading...'));
		await waitFor(() => user.keyboard('heading'));

		expect(setAttributes).toHaveBeenCalled();
		expect(screen.getByText('heading')).toBeDefined();
		expect(asFragment()).toMatchSnapshot();
	});
});

describe('useBlockPrimitiveProps', () => {
	it('does throws an error without context', () => {
		const { result } = renderHook(() => useBlockPrimitiveProps());

		expect(() => result.current.setAttributes({})).toThrow(
			'You need to wrap your Block with `<Block />` before you can use `setAttributes`',
		);
	});
});
