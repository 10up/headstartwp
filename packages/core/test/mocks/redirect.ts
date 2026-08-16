/**
 * Builds a redirect response for the msw handlers.
 *
 * msw 2 removed the `compose`/`context` response-composition API in favour of returning a real
 * `Response`, so this constructs one directly. `HttpResponse.redirect()` exists but rejects
 * anything outside 3xx and is less explicit about the empty body, which matters here: these mock
 * redirects are consumed by `fetchRedirect`, which reads only the status and `Location`.
 */
export function redirect(destination: string, statusCode: number): Response {
	return new Response(null, {
		status: statusCode,
		headers: { Location: destination },
	});
}
