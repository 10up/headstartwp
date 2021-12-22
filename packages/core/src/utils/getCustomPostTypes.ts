export function getCustomPostTypes(): string[] {
	// @ts-ignore
	return HEADLESS_CONFIG?.customPostTypes || [];
}
