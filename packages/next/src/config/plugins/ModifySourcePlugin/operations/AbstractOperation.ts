export type SerializableProperties<T extends AbstractOperation> = {
	[K in keyof T as T[K] extends string ? K : never]: T[K] extends string ? T[K] : never;
};

export type SerializableOperation<T extends AbstractOperation = any> = {
	operationName: string;
} & {
	[K in keyof T as T[K] extends string ? K : never]: T[K] extends string ? T[K] : never;
};

export abstract class AbstractOperation {
	public abstract getSerializableProperties(): string[];

	public abstract getTextProperties(): string[];
}
