export function getRedirectStrategy() {
	return process.env.REDIRECT_STRATEGY || 'none';
}
