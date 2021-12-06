import { useEffect } from 'react';
import { useSafeLayoutEffect } from '../..';

describe('useSafeLayoutEffect', () => {
	it('should be defined', () => {
		expect(useSafeLayoutEffect).toBeDefined();
	});

	it('should be useEffect', () => {
		expect(useSafeLayoutEffect).toBe(useEffect);
	});
});
