import { server } from '@headstartwp/core/test';

// @ts-expect-error
global.__10up__HEADLESS_CONFIG = {};

// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'));

// `onUnhandledRequest: 'error'` rather than the default warn — see the note in core's
// jest.setup.ts. `isomorphic-fetch` is gone: msw 2 needs the platform Fetch API, which the
// jest-fixed-jsdom environment supplies (configured in the root jest.config.js).
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
