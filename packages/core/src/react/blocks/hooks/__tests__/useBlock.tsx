import * as React from 'react';
import { renderHook } from '@testing-library/react';
import { Element } from 'html-react-parser';
import { SettingsProvider } from '../../../provider';
import { useBlock } from '../useBlock';

describe('useBlock', () => {
	const wrapper = ({ children }) => (
		<SettingsProvider settings={{ useWordPressPlugin: true }}>{children}</SettingsProvider>
	);

	it('returns block name and attributes properly', () => {
		const node = new Element('div', {
			'data-wp-block': JSON.stringify({ align: 'left', width: '100' }),
			'data-wp-block-name': 'core/button',
		});

		const { result } = renderHook(() => useBlock(node), {
			wrapper,
		});

		expect(result.current).toEqual({
			name: 'core/button',
			attributes: { align: 'left', width: '100' },
		});
	});

	it('warns if node is not a block', () => {
		const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
		const { result } = renderHook(() => useBlock(new Element('div', {})), {
			wrapper,
		});
		expect(consoleWarnMock).toHaveBeenCalledWith(
			'[useBlock] You are using the useBlock hook in a node that is not a block.',
		);
		expect(result.current).toEqual({
			name: '',
			attributes: {},
		});
		consoleWarnMock.mockRestore();
	});

	it('renames "style" attribute as "styleConfig"', () => {
		const node = new Element('div', {
			'data-wp-block': JSON.stringify({
				style: { spacing: { padding: '10px', margin: '20px' } },
			}),
			'data-wp-block-name': 'core/button',
		});

		const { result } = renderHook(() => useBlock(node), {
			wrapper,
		});

		expect(result.current).toEqual({
			name: 'core/button',
			attributes: { styleConfig: { spacing: { padding: '10px', margin: '20px' } } },
		});
	});
});
