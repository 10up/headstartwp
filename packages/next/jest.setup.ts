import 'whatwg-fetch';
import { server } from '../core/test/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
