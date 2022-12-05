import { renderHook, act } from '@testing-library/react-hooks';
import { useScript } from '../..';

const getScripts = () => document.getElementsByTagName('script');

function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

describe('useScript', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	beforeEach(() => {
		const scripts = Array.from(document.getElementsByTagName('script'));
		scripts.forEach((script: HTMLScriptElement) => script.remove());
	});

	afterEach(() => {
		jest.clearAllTimers();
		const { result } = renderHook(() => useScript(''));
		// @ts-ignore - Manually flushing the script cache
		result.current[2]();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('should be defined', () => {
		expect(useScript).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useScript(''));
		expect(result.error).toBeUndefined();
	});

	it('should not append any script if the source is empty', () => {
		renderHook(() => useScript(''));
		const scripts = getScripts();

		expect(scripts).toHaveLength(0);
	});

	it('should append a script if it has a source', () => {
		renderHook(() => useScript('script'));
		const scripts = getScripts();
		const [script] = scripts;

		expect(scripts).toHaveLength(1);
		expect(script.src).toBe('http://localhost/script');
	});

	it('should not append the same script twice', () => {
		renderHook(() => useScript('script'));
		renderHook(() => useScript('script'));
		const scripts = getScripts();

		expect(scripts).toHaveLength(1);
	});

	it('should be possible to append different scripts', () => {
		renderHook(() => useScript('script'));
		renderHook(() => useScript('script-two'));
		const scripts = getScripts();

		expect(scripts).toHaveLength(2);
	});

	it('should delay the script append if a delay parameter is given', () => {
		renderHook(() => useScript('script', 100));

		expect(getScripts()).toHaveLength(0);
		jest.advanceTimersByTime(90);
		expect(getScripts()).toHaveLength(0);
		jest.runAllTimers();
		expect(getScripts()).toHaveLength(1);
	});

	it('should return the state of the loaded script', async () => {
		const spy = jest.spyOn(document.body, 'appendChild');
		jest.useRealTimers();
		const { result } = renderHook(() => useScript('script'));

		expect(result.current[0]).toBe(false);
		expect(result.current[1]).toBe(false);

		const script = spy.mock.calls[0][0] as HTMLScriptElement;
		await act(async () => {
			script.dispatchEvent(new Event('load'));
			// Without this the promise never runs and warns away
			await sleep(0);
		});

		expect(result.current[0]).toBe(true);
		expect(result.current[1]).toBe(false);
		jest.restoreAllMocks();
	});

	it('should return the state of the errored script', async () => {
		const spy = jest.spyOn(document.body, 'appendChild');
		jest.useRealTimers();
		const { result } = renderHook(() => useScript('script'));

		expect(result.current[0]).toBe(false);
		expect(result.current[1]).toBe(false);

		const script = spy.mock.calls[0][0] as HTMLScriptElement;
		await act(async () => {
			script.dispatchEvent(new Event('error'));
			// Without this the promise never runs and warns away
			await sleep(0);
		});

		expect(result.current[0]).toBe(false);
		expect(result.current[1]).toBe(true);
		jest.restoreAllMocks();
	});
});
