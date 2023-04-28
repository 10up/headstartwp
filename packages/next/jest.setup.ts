import 'whatwg-fetch';

import { server } from '@10up/headless-core/test';

// @ts-expect-error
global.__10up__HEADLESS_CONFIG = {};

// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
