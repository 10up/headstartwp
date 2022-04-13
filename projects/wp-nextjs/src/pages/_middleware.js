import { AppMiddleware } from '@10up/headless-next/middlewares';

export async function middleware(...args) {
	return AppMiddleware(...args);
}
