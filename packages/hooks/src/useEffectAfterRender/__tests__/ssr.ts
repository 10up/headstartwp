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
});
