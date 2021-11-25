import { renderHook } from '@testing-library/react-hooks/server';
import { useEffectOnce } from '../..';

describe('useAsync', () => {
	it('should be defined', () => {
		expect(useEffectOnce).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useEffectOnce(() => {}));
		expect(result.error).toBeUndefined();
	});
});
