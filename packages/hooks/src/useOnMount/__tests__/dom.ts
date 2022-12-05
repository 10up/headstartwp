import { renderHook } from '@testing-library/react-hooks';
import { useOnMount } from '../..';

describe('useEffectOnce', () => {
	it('should be defined', () => {
		expect(useOnMount).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useOnMount(() => true));
		expect(result.error).toBeUndefined();
	});

	it('should only call the effect on render', () => {
		const spy = jest.fn(() => {});
		const { rerender } = renderHook(() => useOnMount(spy));
		expect(spy).toHaveBeenCalled();
		rerender();
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
