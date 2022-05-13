import { DependencyList, useEffect, useRef } from 'react';

/**
 * Custom hook that reacts to changes on an array of dependencies after it
 * has rendered so it skips the "mount" phase.
 *
 * @param  effect - Effect to run after render and the dependencies change
 * @param  deps   -  Dependencies to watch
 */
export function useEffectAfterRender(effect: (...rest: any) => any, deps?: DependencyList) {
	const didRender = useRef(false);
	const dependencies = Array.isArray(deps) ? [effect, ...deps] : [effect];

	useEffect(() => {
		if (!didRender.current) {
			didRender.current = true;
			return;
		}

		effect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);
}
