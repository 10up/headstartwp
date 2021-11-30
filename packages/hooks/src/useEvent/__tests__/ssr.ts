import { renderHook } from '@testing-library/react-hooks/server';
import { useEvent } from '../..';

describe('useEvent', () => {
	it('should be defined', () => {
		expect(useEvent).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useEvent({ current: null }, 'click', () => {}));
		expect(result.error).toBeUndefined();
	});
});
