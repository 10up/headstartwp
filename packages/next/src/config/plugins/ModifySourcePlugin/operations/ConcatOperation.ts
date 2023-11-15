import { AbstractOperation } from './AbstractOperation';

export enum ConcatOperationType {
	'start' = 'start',
	'end' = 'end',
}

export class ConcatOperation extends AbstractOperation {
	constructor(
		public readonly type: keyof typeof ConcatOperationType,
		public readonly value: string,
	) {
		super();
	}

	public getSerializableProperties(): (keyof this & string)[] {
		return ['type', 'value'];
	}

	public getTextProperties(): (keyof this & string)[] {
		return ['value'];
	}

	public static getAllowedTypes(): ConcatOperationType[] {
		return [ConcatOperationType.start, ConcatOperationType.end];
	}
}
