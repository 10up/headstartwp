import { renderHook } from '@testing-library/react-hooks/server';
import { useOnClickOutside } from '../..';

describe('useOnClickOutside', () => {
	it('should be defined', () => {
		expect(useOnClickOutside).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useOnClickOutside({ current: null }, () => {}));
		expect(result.error).toBeUndefined();
	});
});
