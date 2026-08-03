import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { jest } from '@jest/globals';

// @wordpress/element (pulled in transitively via @wordpress/block-editor, imported
// below via a dynamic import so this registration runs first) still statically
// imports several legacy root APIs from 'react-dom' that React 19 removed entirely:
// findDOMNode, render, hydrate, and unmountComponentAtNode. Nothing this file
// exercises actually calls them at runtime, but the static imports themselves fail
// to resolve under Node's strict ESM loader without them. This patches them back in
// for the test environment only, using unstable_mockModule (not jest.mock) since a
// dynamic `await import()` is required for a runtime mock to actually intercept an
// ES module import.
jest.unstable_mockModule('react-dom', async () => ({
	...(await jest.requireActual<typeof import('react-dom')>('react-dom')),
	findDOMNode: () => null,
	render: () => null,
	hydrate: () => null,
	unmountComponentAtNode: () => false,
}));

let attributes = {};
const setAttributes = jest.fn((newAttributes: Record<string, any>) => {
	attributes = { ...attributes, ...newAttributes };
	return attributes;
});
jest.unstable_mockModule('../hooks/useBlockPrimitiveProps.js', () => ({
	useBlockPrimitiveProps: () => ({
		setAttributes,
		attributes,
		clientId: 'clientId',
		isSelected: true,
	}),
}));

const { RichText } = await import('../rich-text.js');
describe('RichText', () => {
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
