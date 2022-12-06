import { renderHook } from '@testing-library/react-hooks';
import { useIsMounted } from '../..';

describe('useIsMounted', () => {
	it('should be defined', () => {
		expect(useIsMounted).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useIsMounted());
		expect(result.error).toBeUndefined();
	});

	it('should return true after it renders', () => {
		let firstRender: boolean | undefined;

		const { result } = renderHook(() => {
			const isMounted = useIsMounted();

			if (typeof firstRender === 'undefined') {
				firstRender = isMounted();
			}

			return isMounted;
		});

		expect(firstRender).toBe(false);
		expect(result.current()).toBe(true);
	});

	it('should return false after unmount', () => {
		const { result, unmount } = renderHook(() => useIsMounted());

		expect(result.current()).toBe(true);
		unmount();
		expect(result.current()).toBe(false);
	});
});
