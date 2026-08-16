import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
	handlers,
	VALID_AUTH_TOKEN,
	DRAFT_POST_ID,
	VALID_REVALIDATE_AUTH_TOKEN,
	REVALIDATE_PATH,
	REVALIDATE_POST_ID,
} from './server-handlers';

const server = setupServer(...handlers);

/**
 * Opts a test file out of msw request interception, for suites that install their own
 * `global.fetch` mock.
 *
 * msw 1 intercepted at the `http`/XHR layer, so a `global.fetch` replaced by `jest.fn()` or
 * `jest-fetch-mock` was left alone and the two coexisted. msw 2 intercepts `fetch` itself, so it
 * now sits *in front of* those mocks: the mock stops receiving the real arguments (it gets a
 * `Request` from the interceptor instead) and, with `onUnhandledRequest: 'error'`, unmatched
 * requests throw rather than reaching it.
 *
 * Prefer real msw handlers where possible. This is for the cases that genuinely cannot use them —
 * asserting on Next.js-specific `fetch` options such as `cache` and `next.revalidate`, which msw
 * never sees.
 *
 * Call at the top of a `describe` block. Jest gives each test file its own module registry, so
 * closing here does not affect other files.
 */
export function disableRequestInterception() {
	beforeAll(() => server.close());
	afterAll(() => server.listen({ onUnhandledRequest: 'error' }));
}

// `http` and `HttpResponse` replace msw 1's `rest`, which this module used to re-export.
export {
	server,
	http,
	HttpResponse,
	VALID_AUTH_TOKEN,
	DRAFT_POST_ID,
	VALID_REVALIDATE_AUTH_TOKEN,
	REVALIDATE_PATH,
	REVALIDATE_POST_ID,
};
