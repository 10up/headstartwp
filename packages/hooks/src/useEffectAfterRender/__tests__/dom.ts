import { renderHook } from '@testing-library/react-hooks';
import { useEffectAfterRender } from '../..';

describe('useEffectAfterRender', () => {
	it('should be defined', () => {
		expect(useEffectAfterRender).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useEffectAfterRender(() => {}));
		expect(result.error).toBeUndefined();
	});

	it('should not call after mount but after render', () => {
		const cb = jest.fn();
		const { rerender } = renderHook(({ value }) => useEffectAfterRender(cb, [value]), {
			initialProps: {
				value: 1,
			},
		});
		expect(cb).not.toHaveBeenCalled();

		rerender({ value: 10 });
		expect(cb).toHaveBeenCalled();
	});
});
