export function getRedirectStrategy() {
	// @ts-ignore
	return HEADLESS_CONFIG?.redirectStrategy || 'none';
}
