import { renderHook } from '@testing-library/react-hooks';
import { Element } from 'html-react-parser';
import { useBlockAttributes } from '../useBlockAttributes';

describe('useBlockAttributes', () => {
	const node = new Element('div', {
		class: 'wp-block-button has-custom-width wp-block-button__width-75 has-custom-font-size aligncenter is-style-outline has-text-color has-orange-color has-background has-black-background-color',
		style: 'font-size: 24px',
		'data-wp-block': JSON.stringify({}),
	});

	it('returns block attributes properly', () => {
		const { result } = renderHook(() => useBlockAttributes(node), {});
		expect(result.current).toMatchObject({
			align: 'center',
			colors: {
				backgroundColor: 'black',
				gradient: '',
				linkColor: '',
				textColor: 'orange',
			},
			blockStyle: 'outline',
			width: '75',
			typography: {
				fontSize: '',
				style: {
					fontSize: '24px',
					lineHeight: '',
				},
			},
		});
	});
});
