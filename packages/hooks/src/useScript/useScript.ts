import { useEffect, useState } from 'react';

const cachedScripts: {
	[Key: string]: Promise<void> | undefined;
} = {};

function flushCache(optionalKey?: string) {
	if (optionalKey && cachedScripts[optionalKey]) {
		cachedScripts[optionalKey] = undefined;
		return;
	}

	Object.keys(cachedScripts).forEach((key) => {
		cachedScripts[key] = undefined;
	});
}

/**
 * Creates script tag for provided script to run. uses cache to not allow multiple instances of script.
 *
 * @param {string} src   - script needed to load on page
 * @param {number} delay - whether to delay script load
 * @param {options} options - target for script to be appended
 * @returns {[boolean, boolean]} [loading, error]
 */
export function useScript(src: string, delay = 0, position: 'head' | 'body' = 'body') {
	// Keeping track of script loaded and error state
	const [state, setState] = useState({
		loaded: false,
		error: false,
	});

	useEffect(() => {
		if (!src) {
			return () => {};
		}

		let isMounted = true;

		// If cachedScripts array already includes src that means another instance of
		// this hook already loaded this script, so no need to load again.
		if (typeof cachedScripts[src] === 'undefined') {
			// Create script
			const script = document.createElement('script');
			script.src = src;
			script.async = true;

			cachedScripts[src] = new Promise<void>((resolve, reject) => {
				// Script event listener callbacks for load and error
				const onScriptLoad = () => resolve();

				const onScriptError = () => {
					// Remove from cachedScripts we can try loading again
					cachedScripts[src] = undefined;
					script.remove();
					reject();
				};

				script.addEventListener('load', onScriptLoad);
				script.addEventListener('error', onScriptError);

				let target: HTMLElement = document.body;
				if (position !== undefined) {
					target = document[position] ?? document.body;
				}
				// Add script to document body
				if (delay) {
					setTimeout(() => {
						if (isMounted) {
							target.appendChild(script);
						}
					}, delay);
				} else {
					target.appendChild(script);
				}
			});
		}

		cachedScripts[src]!.then(
			() => {
				if (isMounted) {
					setState({
						loaded: true,
						error: false,
					});
				}
			},
			() => {
				if (isMounted) {
					setState({
						loaded: false,
						error: true,
					});
				}
			},
		);

		return () => {
			isMounted = false;
		};
	}, [src, delay, position]);

	return [state.loaded, state.error, flushCache];
}
