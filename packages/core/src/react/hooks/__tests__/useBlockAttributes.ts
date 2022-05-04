import { renderHook } from '@testing-library/react-hooks';
import { Element } from 'html-react-parser';
import { useBlockAttributes } from '../useBlockAttributes';

describe('useBlockAttributes', () => {
	const node = new Element('div', {
		class: 'wp-block-button has-custom-width wp-block-button__width-75 has-custom-font-size aligncenter is-style-outline has-text-color has-orange-color has-background has-black-background-color',
		style: 'font-size: 24px',
	});

	it('returns block attributes properly', () => {
		const { result } = renderHook(() => useBlockAttributes(node));
		expect(result.current).toEqual({
			className:
				'wp-block-button has-custom-width wp-block-button__width-75 has-custom-font-size aligncenter is-style-outline has-text-color has-orange-color has-background has-black-background-color',
			align: 'center',
			dimensions: { paddingBottom: '', paddingLeft: '', paddingRight: '', paddingTop: '' },
			color: {
				background: true,
				backgroundColor: 'black',
				gradientColor: '',
				gradients: false,
				link: false,
				linkColor: '',
				text: true,
				textColor: 'orange',
			},
			styles: 'outline',
			width: 75,
			typography: {
				fontSize: '24px',
				lineHeight: '',
			},
		});
	});
	it('returns only block attributes it is supproted', () => {
		const { result } = renderHook(() =>
			useBlockAttributes(node, {
				alignment: false,
				color: true,
				typography: false,
				width: false,
			}),
		);
		expect(result.current).toEqual({
			className:
				'wp-block-button has-custom-width wp-block-button__width-75 has-custom-font-size aligncenter is-style-outline has-text-color has-orange-color has-background has-black-background-color',
			dimensions: { paddingBottom: '', paddingLeft: '', paddingRight: '', paddingTop: '' },
			color: {
				background: true,
				backgroundColor: 'black',
				gradientColor: '',
				gradients: false,
				link: false,
				linkColor: '',
				text: true,
				textColor: 'orange',
			},
			styles: 'outline',
		});
	});
});
