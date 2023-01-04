import 'whatwg-fetch';
import { TextDecoder, TextEncoder } from 'util';
import { server } from './test/server';

// https://github.com/kkomelin/isomorphic-dompurify/issues/91#issuecomment-1012645198
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// @ts-expect-error
global.__10up__HEADLESS_CONFIG = {};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
