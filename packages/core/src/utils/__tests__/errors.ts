/* eslint-disable no-console */
import { warn } from '..';

describe('warn', () => {
	test('In development, warn the full message', () => {
		console.warn = jest.fn();
		warn('This is a warning');
		expect(console.warn).toHaveBeenCalledTimes(1);
		expect(console.warn).toHaveBeenLastCalledWith('This is a warning');
	});

	test('In production, do not warn', () => {
		process.env.NODE_ENV = 'production';
		console.warn = jest.fn();
		warn('This is a warning');
		expect(console.warn).toHaveBeenCalledTimes(0);
	});
});
