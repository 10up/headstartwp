/* eslint-disable max-classes-per-file */

export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'NotFoundError';
	}
}

export class FetchError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'FetchError';
	}
}

export class ConfigError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ConfigError';
	}
}

export class EndpointError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'EndpointError';
	}
}

export class FrameworkError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'FrameworkError';
	}
}

/**
 * Logs a warning in the console in dev mode
 *
 * @example warn("You should do/change something.")
 *
 * @param message - The message that describes the warning.
 */
export const warn = (message: string) => {
	if (process.env.NODE_ENV !== 'production') {
		// eslint-disable-next-line no-console
		console.warn(message);
	}
};
