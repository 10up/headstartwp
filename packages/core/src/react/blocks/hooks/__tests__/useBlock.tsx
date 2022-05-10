import { renderHook } from '@testing-library/react-hooks';
import { Element } from 'html-react-parser';
import { SettingsProvider } from '../../../provider';
import { useBlock } from '../useBlock';

describe('useBlock', () => {
	const node = new Element('div', {
		'data-wp-block': JSON.stringify({ align: 'left', width: '100' }),
		'data-wp-block-name': 'core/button',
	});

	it('returns block name and attributes properly', () => {
		const { result } = renderHook(() => useBlock(node), {
			wrapper: ({ children }) => (
				<SettingsProvider settings={{ useWordPressPlugin: true }}>
					{children}
				</SettingsProvider>
			),
		});
		expect(result.current).toEqual({
			name: 'core/button',
			attributes: { align: 'left', width: '100' },
		});
	});

	it('warns if node is not a block', () => {
		const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
		const { result } = renderHook(() => useBlock(new Element('div', {})), {
			wrapper: ({ children }) => (
				<SettingsProvider settings={{ useWordPressPlugin: true }}>
					{children}
				</SettingsProvider>
			),
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
});
