import { renderHook } from '@testing-library/react-hooks/server';
import { useOnWindowResize } from '../..';

describe('useOnWindowResize', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('should be defined', () => {
		expect(useOnWindowResize).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useOnWindowResize(() => {}));
		expect(result.error).toBeUndefined();
	});
});
