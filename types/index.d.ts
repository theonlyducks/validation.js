declare class Props {
	getKey(): string;
	hasErrors(): boolean;
}

export default class Validate {
	addKey(key: string): Validate;
	getKey(key: string): Props;
	ofValue(value: any): Validate;
	required(): Validate;
	notEmpty(): Validate;
	isNumeric(): Validate;
	isString(): Validate;
	isBoolean(): Validate;
	isObject(): Validate;
	objectHasProperty(prop: string): Validate;
	isEmail(): Validate;
	isLength(options: { min?: number, max?: number }): Validate;
	hasErrors(): boolean;
	assert(data: object): void;
	asyncAssert(data: object): Promise<void>;
	assertOne(): void;
	asyncAssertOne(): Promise<void>;
}
