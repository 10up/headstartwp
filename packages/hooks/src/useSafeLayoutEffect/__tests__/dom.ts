import { useLayoutEffect } from 'react';
import { useSafeLayoutEffect } from '../..';

describe('useSafeLayoutEffect', () => {
	it('should be defined', () => {
		expect(useSafeLayoutEffect).toBeDefined();
	});

	it('should be useLayoutEffect', () => {
		expect(useSafeLayoutEffect).toBe(useLayoutEffect);
	});
});
