import { renderHook } from '@testing-library/react-hooks/server';
import { useKey } from '../..';

describe('useKey', () => {
	it('should be defined', () => {
		expect(useKey).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useKey({ current: null }, 'Escape', () => {}));
		expect(result.error).toBeUndefined();
	});
});
