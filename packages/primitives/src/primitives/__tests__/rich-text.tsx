import { render } from '@testing-library/react';
import RichText from '../rich-text.js';

describe('RichText', () => {
	it('render to a native html elements', () => {
		const { asFragment } = render(<RichText tagName="h1" value="This is a heading" />);

		expect(asFragment()).toMatchSnapshot();

		const { asFragment: asFragment2 } = render(
			<RichText tagName="p" value="This is a paragraph" />,
		);

		expect(asFragment2()).toMatchSnapshot();
	});
});
