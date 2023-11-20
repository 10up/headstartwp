import { AbstractOperation } from './AbstractOperation';

export enum ReplaceOperationType {
	'once' = 'once',
	'all' = 'all',
}

export class ReplaceOperation extends AbstractOperation {
	constructor(
		public readonly type: keyof typeof ReplaceOperationType,
		public readonly searchValue: string,
		public readonly replaceValue: string,
	) {
		super();
	}

	public getSerializableProperties(): (keyof this & string)[] {
		return ['type', 'searchValue', 'replaceValue'];
	}

	public getTextProperties(): (keyof this & string)[] {
		return ['searchValue', 'replaceValue'];
	}

	public static getAllowedTypes(): ReplaceOperationType[] {
		return [ReplaceOperationType.all, ReplaceOperationType.once];
	}
}
