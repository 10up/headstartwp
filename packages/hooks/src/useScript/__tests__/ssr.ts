import { renderHook } from '@testing-library/react-hooks/server';
import { useScript } from '../..';

describe('useScript', () => {
	it('should render', () => {
		const { result } = renderHook(() => useScript(''));
		expect(result.error).toBeUndefined();
	});
});
