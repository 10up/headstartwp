import { TextDecoder, TextEncoder } from 'util';
import { server } from './test/server';

// https://github.com/kkomelin/isomorphic-dompurify/issues/91#issuecomment-1012645198
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// @ts-expect-error
global.__10up__HEADLESS_CONFIG = {};

// `onUnhandledRequest: 'error'` rather than the default warn: under msw 1 an unmocked request
// fell through to a real network call and only warned, so a handler that stopped matching could
// pass silently. Failing loudly is the point of renovating the harness before touching core.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
