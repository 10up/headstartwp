import 'whatwg-fetch';
import { server } from './test/server';

global.__10up__HEADLESS_CONFIG = {};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
