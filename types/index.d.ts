declare class Props {
	getKey(): string;
	hasErrors(): boolean;
}

export class AssertError extends Error {
	data: []
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
	/**
	 * @throws AssertError
	 */
	assert(data: object): void;
	/**
	 * @throws AssertError
	 */
	asyncAssert(data: object): Promise<void>;
	/**
	 * @throws AssertError
	 */
	assertOne(): void;
	/**
	 * @throws AssertError
	 */
	asyncAssertOne(): Promise<void>;
}
