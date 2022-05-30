import { renderHook } from '@testing-library/react-hooks/server';
import { useOnMount } from '../..';

describe('useAsync', () => {
	it('should be defined', () => {
		expect(useOnMount).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useOnMount(() => {}));
		expect(result.error).toBeUndefined();
	});
});
