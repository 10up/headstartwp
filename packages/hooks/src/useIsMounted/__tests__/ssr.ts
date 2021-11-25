import { renderHook } from '@testing-library/react-hooks/server';
import { useIsMounted } from '../..';

describe('useIsMounted', () => {
	it('should be defined', () => {
		expect(useIsMounted).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useIsMounted());
		expect(result.error).toBeUndefined();
	});

	it('should return false within first render', () => {
		const { result } = renderHook(() => useIsMounted());
		expect(result.current).toBe(false);
	});
});
