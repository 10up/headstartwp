import { renderHook } from '@testing-library/react-hooks/dom';
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
		let secondRender: boolean | undefined;

		renderHook(() => {
			const isMounted = useIsMounted();

			if (typeof firstRender === 'undefined') {
				firstRender = isMounted;
			} else {
				secondRender = isMounted;
			}

			return isMounted;
		});

		expect(firstRender).toBe(false);
		expect(secondRender).toBe(true);
	});
});
