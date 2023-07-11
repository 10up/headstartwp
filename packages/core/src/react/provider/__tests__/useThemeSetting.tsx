import * as React from 'react';
import { renderHook } from '@testing-library/react';
import { useThemeSetting } from '../useThemeSetting';
import { ThemeSettingsProvider } from '../ThemeSettingsProvider';

describe('useThemeSetting', () => {
	test('it returns default value if no context it set', () => {
		const { result } = renderHook(() => useThemeSetting('color.palette', null, []));

		expect(result.current).toEqual([]);
	});

	test('it returns default values if context is set but setting does not exit', () => {
		const wrapper = ({ children }) => (
			<ThemeSettingsProvider data={{ settings: { color: { background: true } } }}>
				{children}
			</ThemeSettingsProvider>
		);

		const { result: result1 } = renderHook(() => useThemeSetting('color.custom', null, false), {
			wrapper,
		});

		expect(result1.current).toBe(false);

		const { result: result2 } = renderHook(
			() => useThemeSetting('color.background', null, false),
			{
				wrapper,
			},
		);

		expect(result2.current).toBe(true);

		const { result: result3 } = renderHook(
			() => useThemeSetting('color.unknown', 'core/button', 'default value'),
			{
				wrapper,
			},
		);

		expect(result3.current).toBe('default value');
	});

	test('it returns values from settings', () => {
		const defaultPallete = [
			{
				name: 'Black',
				slug: 'black',
				color: '#000000',
			},
			{
				name: 'Cyan bluish gray',
				slug: 'cyan-bluish-gray',
				color: '#abb8c3',
			},
		];

		const blockPallete = [
			{
				name: 'white',
				slug: 'white',
				color: '#FFF',
			},
		];
		const wrapper = ({ children }) => (
			<ThemeSettingsProvider
				data={{
					settings: {
						color: {
							palette: {
								// TODO: fix theme json ts types
								// @ts-expect-error
								default: defaultPallete,
							},
						},

						blocks: {
							'core/button': {
								color: {
									palette: blockPallete,
								},
							},
						},
					},
				}}
			>
				{children}
			</ThemeSettingsProvider>
		);
		const { result: result1 } = renderHook(
			() => useThemeSetting('color.palette.default', null, []),
			{
				wrapper,
			},
		);

		expect(result1.current).toMatchObject(defaultPallete);

		const { result: result2 } = renderHook(
			() => useThemeSetting('color.palette', 'core/button', []),
			{
				wrapper,
			},
		);

		expect(result2.current).toMatchObject(blockPallete);
	});
});
