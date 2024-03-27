import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import RichText from '../rich-text.js';
import Block from '../block.js';

describe('RichText', () => {
	let attributes = {};
	const setAttributes = jest.fn((newAttributes) => {
		attributes = { ...attributes, ...newAttributes };
		return attributes;
	});

	it('supports inline editing', async () => {
		const user = userEvent.setup();

		render(
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

		await user.click(screen.getByLabelText('Heading...'));
		await waitFor(() => user.keyboard('heading'));

		expect(setAttributes).toHaveBeenCalled();
		expect(screen.getByText('heading')).toBeDefined();
	});

	it('works without a custom onPrimitiveChange', async () => {
		const user = userEvent.setup();

		render(
			<Block attributes={attributes} setAttributes={setAttributes}>
				<RichText name="heading2" tagName="h1" placeholder="Heading..." />
			</Block>,
		);

		await user.click(screen.getByLabelText('Heading...'));
		await waitFor(() => user.keyboard('heading 2'));

		expect(setAttributes).toHaveBeenCalled();
		expect(screen.getByText('heading 2')).toBeDefined();
	});
});
