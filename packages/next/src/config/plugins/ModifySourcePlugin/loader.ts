import path from 'path';

import { Operation, SerializableOperation } from './operations';

const { validate } = require('schema-utils');

const schema = {
	type: 'object',
	properties: {
		operations: {
			type: 'array',
			items: {
				type: 'object',
			},
		},
		moduleRequest: {
			type: 'string',
		},
		constants: {
			type: 'object',
		},
	},
	additionalProperties: false,
};

interface LoaderOptions {
	operations: SerializableOperation[];
	moduleRequest: string;
	constants: Record<string, string>;
}

interface modifyModuleSourceLoader {
	getOptions: () => LoaderOptions;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function modifyModuleSourceLoader(
	this: modifyModuleSourceLoader,
	source: string,
): string {
	const options: LoaderOptions = this.getOptions();

	validate(schema, options, {
		name: 'ModifySourcePlugin webpack loader',
	});

	const cleanPath = options.moduleRequest.split('?')[0];
	const fileName = path.basename(cleanPath);

	if (source.includes('__setHeadstartWPConfig')) {
		return source;
	}

	return options.operations.reduce((sourceText, serializableOp) => {
		const operation = Operation.fillConstants(Operation.fromSerializable(serializableOp), {
			...options.constants,
			FILE_PATH: cleanPath,
			FILE_NAME: fileName,
		});

		return Operation.apply(sourceText, operation);
	}, source);
}
