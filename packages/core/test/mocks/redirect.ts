import { compose, context } from 'msw';

export function redirect(destination, statusCode) {
	return compose(context.status(statusCode), context.set('Location', destination));
}
