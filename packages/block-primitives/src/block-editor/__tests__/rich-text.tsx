import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { RichText } from '../rich-text.js';

import * as WrapperModule from '../hooks/useBlockPrimitiveProps.js';

describe('RichText', () => {
	let attributes = {};
	const setAttributes = jest.fn((newAttributes) => {
		attributes = { ...attributes, ...newAttributes };
		return attributes;
	});

	jest.spyOn(WrapperModule, 'useBlockPrimitiveProps').mockReturnValue({
		setAttributes,
		attributes,
		clientId: 'clientId',
		isSelected: true,
	});

	it('supports inline editing', async () => {
		const user = userEvent.setup();

		render(
			<RichText
				name="heading"
				tagName="h1"
				placeholder="Heading..."
				onPrimitiveChange={(name, value, _setAttributes) => {
					_setAttributes({ [name]: value });
				}}
			/>,
		);

		await user.click(screen.getByLabelText('Heading...'));
		await waitFor(() => user.keyboard('heading'));

		expect(setAttributes).toHaveBeenCalled();
		expect(screen.getByText('heading')).toBeDefined();
	});

	it('works without a custom onPrimitiveChange', async () => {
		const user = userEvent.setup();

		render(<RichText name="heading2" tagName="h1" placeholder="Heading..." />);

		await user.click(screen.getByLabelText('Heading...'));
		await waitFor(() => user.keyboard('heading 2'));

		expect(setAttributes).toHaveBeenCalled();
		expect(screen.getByText('heading 2')).toBeDefined();
	});
});
