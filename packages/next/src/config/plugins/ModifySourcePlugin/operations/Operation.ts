import {
	AbstractOperation,
	SerializableOperation,
	SerializableProperties,
} from './AbstractOperation';
import { ConcatOperation } from './ConcatOperation';
import { ReplaceOperation } from './ReplaceOperation';

function isSerializableOfOperation<T extends AbstractOperation>(
	serializable: SerializableOperation,
	operation: { new (...args: any[]): T },
): serializable is SerializableOperation<T> {
	return serializable.operationName === operation.name;
}

function throwUnknownOperationType(op: AbstractOperation, opType: string): void {
	const allowedTypes =
		op instanceof ConcatOperation
			? ConcatOperation.getAllowedTypes()
			: ReplaceOperation.getAllowedTypes();

	throw new Error(
		`Incorrect operation type '${opType}' for ${
			op.constructor.name
		}. Allowed types: '${allowedTypes.join("', '")}'.`,
	);
}

export class Operation {
	public static makeSerializable<T extends AbstractOperation>(op: T): SerializableOperation {
		const propertyValues = op.getSerializableProperties().reduce((acc, val) => {
			return {
				...acc,
				[val]: op[val as keyof T],
			};
		}, {} as SerializableProperties<T>);

		return {
			operationName: op.constructor.name,
			...propertyValues,
		};
	}

	public static fromSerializable(serializable: SerializableOperation): AbstractOperation {
		if (isSerializableOfOperation(serializable, ConcatOperation)) {
			const { type, value } = serializable;

			return new ConcatOperation(type, value);
		}

		if (isSerializableOfOperation(serializable, ReplaceOperation)) {
			const { type, searchValue, replaceValue } = serializable;

			return new ReplaceOperation(type, searchValue, replaceValue);
		}

		throw new Error(`Incorrect serializable provided: ${JSON.stringify(serializable)}`);
	}

	public static fillConstants<
		T extends AbstractOperation,
		TConstants extends Record<string, string | number>,
	>(operation: T, constants: TConstants): T {
		const filledTextProps = operation.getTextProperties().reduce((acc, propName) => {
			let propValue = operation[propName as keyof T] as string;

			Object.keys(constants).forEach((constant) => {
				propValue = propValue.replace(
					new RegExp(`\\$${constant}`, 'g'),
					String(constants[constant]),
				);
			});

			return {
				...acc,
				[propName]: propValue,
			};
		}, {});

		const mergedObject = {
			...Operation.makeSerializable(operation),
			...filledTextProps,
		};

		return Operation.fromSerializable(mergedObject) as T;
	}

	public static apply(src: string, operation: AbstractOperation): string {
		if (operation instanceof ConcatOperation) {
			switch (operation.type) {
				case 'start':
					return operation.value + src;

				case 'end':
					return src + operation.value;

				default:
					throwUnknownOperationType(operation, operation.type);
			}
		}

		if (operation instanceof ReplaceOperation) {
			switch (operation.type) {
				case 'once':
					return src.replace(operation.searchValue, operation.replaceValue);

				case 'all':
					return src.replace(
						new RegExp(operation.searchValue, 'g'),
						operation.replaceValue,
					);

				default:
					throwUnknownOperationType(operation, operation.type);
			}
		}

		throw new Error(`Unknown operation instance: ${operation.constructor.name}`);
	}
}
