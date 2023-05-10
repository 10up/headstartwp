import 'whatwg-fetch';
import { TextDecoder, TextEncoder } from 'util';
import { server } from '@headstartwp/core/test';
import { setHeadstartWPConfig } from '@headstartwp/core';

// https://github.com/kkomelin/isomorphic-dompurify/issues/91#issuecomment-1012645198
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

setHeadstartWPConfig({});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
