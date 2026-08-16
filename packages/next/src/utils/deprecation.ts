/**
 * One-time deprecation warnings for the pages-router API surface.
 *
 * v2 deprecates the pages-router helpers rather than removing them (see the v2 upgrade notes):
 * the code and the example projects keep working, and removal is targeted at a later major. The
 * point of the runtime warning is that a `@deprecated` JSDoc tag is invisible to anyone not
 * hovering the symbol in an editor — plenty of consumers will only find out at upgrade time
 * unless something says so while they run the app.
 */

/**
 * Keyed by API name, so each deprecated helper warns once per process rather than once per
 * request. `fetchHookData` is called on every page render; warning per call would bury the
 * message in its own repetition and slow dev servers down.
 */
const warned = new Set<string>();

/**
 * Logs a deprecation warning the first time `api` is used.
 *
 * Dev-only, matching `warn()` in `@headstartwp/core`: production logs are not the place to
 * discover this, and a server-rendered app would otherwise emit it into real request logs.
 *
 * @param api Name of the deprecated export, e.g. `fetchHookData`
 * @param replacement What to use instead, e.g. `queryPost from @headstartwp/next/app`
 */
export function warnDeprecatedPagesRouter(api: string, replacement: string) {
	if (process.env.NODE_ENV === 'production') {
		return;
	}

	if (warned.has(api)) {
		return;
	}

	warned.add(api);

	// eslint-disable-next-line no-console
	console.warn(
		`🚀 HeadstartWP: \`${api}\` is deprecated.\n` +
			`It supports the Next.js pages router, which is legacy. It still works in v2 and is ` +
			`scheduled for removal in v3.\n` +
			`Use ${replacement} instead. See https://headstartwp.fueled.com/learn/upgrade-guides/v2 ` +
			`for the migration guide.`,
	);
}

/**
 * Resets the warned-once state. Test-only — without it, the first suite to touch a deprecated
 * API silences the warning for every suite that runs after it in the same process.
 *
 * @internal
 */
export function resetDeprecationWarnings() {
	warned.clear();
}
