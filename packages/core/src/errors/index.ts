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
