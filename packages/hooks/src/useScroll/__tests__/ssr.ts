import { renderHook } from '@testing-library/react-hooks/server';
import { useScroll } from '../..';

describe('useScroll', () => {
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
		expect(useScroll).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useScroll(() => {}, []));
		expect(result.error).toBeUndefined();
	});
});
