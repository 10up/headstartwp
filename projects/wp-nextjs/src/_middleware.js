import { AppMiddleware } from '@10up/headless-next';

export async function middleware(...args) {
	return AppMiddleware(...args);
}
