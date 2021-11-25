import { renderHook } from '@testing-library/react-hooks/dom';
import { useEffectOnce } from '../..';

describe('useEffectOnce', () => {
	it('should be defined', () => {
		expect(useEffectOnce).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useEffectOnce(() => true));
		expect(result.error).toBeUndefined();
	});

	it('should only call the effect on render', () => {
		const spy = jest.fn(() => {});
		const { rerender } = renderHook(() => useEffectOnce(spy));
		expect(spy).toHaveBeenCalled();
		rerender();
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
