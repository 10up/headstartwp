import { renderHook } from '@testing-library/react-hooks/server';
import { useEventListener } from '../..';

describe('useEventListener', () => {
	it('should be defined', () => {
		expect(useEventListener).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useEventListener({ current: null }, 'click', () => {}));
		expect(result.error).toBeUndefined();
	});
});
