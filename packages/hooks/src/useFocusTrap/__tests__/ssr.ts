import { renderHook } from '@testing-library/react-hooks/server';
import { useFocusTrap } from '../..';

describe('useFocusTrap', () => {
	it('should be defined', () => {
		expect(useFocusTrap).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useFocusTrap(false));
		expect(result.error).toBeUndefined();
	});
});
