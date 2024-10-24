import { rest } from 'msw';
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
export {
	server,
	rest,
	VALID_AUTH_TOKEN,
	DRAFT_POST_ID,
	VALID_REVALIDATE_AUTH_TOKEN,
	REVALIDATE_PATH,
	REVALIDATE_POST_ID,
};
