import 'whatwg-fetch';

import { server } from '@10up/headless-core/test';

// @ts-expect-error
global.__10up__HEADLESS_CONFIG = {};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
