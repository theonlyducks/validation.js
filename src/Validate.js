import { Props } from './Props.js';
import { Empty } from './types/Empty.js';
import { Advance } from './types/Advance.js'
import { Primitive } from './types/Primitive.js';
import { AssertError } from './errors/AssertError.js';

export { AssertError };

export default class Validate {

	/**
	 *
	 */
	constructor() {
		this._props = [];
		this._value = null;
		this._errors = {};
		this._hasErrors = false;
		this._currentProps = null;
		this._currentGetProps = null;
	}

	/**
	 * Add key and create prop
	 *
	 * @param key
	 * @returns {Validate}
	 */
	addKey(key) {
		this._currentProps = new Props(key);
		this._props.push(this._currentProps);
		return this;
	}

	/**
	 * Return specific props of key
	 *
	 * @param key
	 * @returns {Props}
	 */
	getKey(key) {
		for (let prop of this._props) {
			if (prop.getKey() === key) {
				this._currentGetProps = prop;
				break;
			}
		}
		return this._currentGetProps;
	}

	/**
	 * Create one prop
	 *
	 * @param value
	 * @returns {Validate}
	 */
	ofValue(value) {
		this._value = value;
		this._currentProps = new Props([value]);
		return this;
	}

	/**
	 * Check if the property is set
	 *
	 * @returns {Validate}
	 */
	required() {
		this._currentProps.pushValidator('required', Empty.MESSAGES.isUndefined, Empty.isUndefined());
		return this;
	}

	/**
	 * Check if the property is empty
	 *
	 * @returns {Validate}
	 */
	notEmpty() {
		this._currentProps.pushValidator('isEmpty', Empty.MESSAGES.isEmpty, Empty.isEmpty());
		return this;
	}

	/**
	 * Check if the property is numeric
	 *
	 * @returns {Validate}
	 */
	isNumeric() {
		this._currentProps.pushValidator('isNumeric', Primitive.MESSAGES.isNumeric, Primitive.isNumeric());
		return this;
	}

	/**
	 * Check if the property is string
	 *
	 * @returns {Validate}
	 */
	isString() {
		this._currentProps.pushValidator('isString', Primitive.MESSAGES.isString, Primitive.isString());
		return this;
	}

	/**
	 * Check if the property is boolean
	 *
	 * @returns {Validate}
	 */
	isBoolean() {
		this._currentProps.pushValidator('isBoolean', Primitive.MESSAGES.isBoolean, Primitive.isBoolean());
		return this;
	}

	/**
	 * Check if the property is object
	 *
	 * @returns {Validate}
	 */
	isObject() {
		this._currentProps.pushValidator('isObject', Primitive.MESSAGES.isObject, Primitive.isObject());
		return this;
	}

	/**
	 *
	 *
	 * @param prop
	 * @returns {Validate}
	 */
	objectHasProperty(prop) {
		this._currentProps.pushValidator('objectHasProperty', Primitive.MESSAGES.objectHasProperty, Primitive.objectHasProperty(prop));
		return this;
	}

	/**
	 * Check if the property is email
	 *
	 * @returns {Validate}
	 */
	isEmail() {
		this._currentProps.pushValidator('isEmail', Advance.MESSAGES.isEmail, Advance.isEmail());
		return this;
	}

	/**
	 * Check if the property is max or min length
	 *
	 * @param options
	 * @returns {Validate}
	 */
	isLength(options) {
		this._currentProps.pushValidator('isLength', Advance.MESSAGES.isLength, Advance.isLength(options));
		return this;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 */
	hasErrors() {
		return this._hasErrors;
	}

	/**
	 * @throws AssertError
	 *
	 * @param data
	 */
	assert(data) {
		this._props.forEach(prop => {
			prop.assertValidators(data);
			if (prop.hasErrors()) {
				this._hasErrors = true;
				this._errors[prop.getKey()] = prop.getErrorsValues();
			}
		});
		if (this._hasErrors) {
			throw new AssertError({
				message: 'Assert error',
				data: this._errors
			});
		}
	}

	/**
	 * @throws AssertError
	 *
	 * @param data
	 * @returns {Promise<void>}
	 */
	async asyncAssert(data) {
		try {
			this.assert(data);
		} catch (error) {
			throw new AssertError({
				message: 'Assert error',
				data: this._errors
			});
		}
	}

	/**
	 * @throws AssertError
	 */
	assertOne() {
		this._currentProps.assertValidators({[this._value]: this._value});
		if (!this._currentProps.hasErrors()) return;
		this._errors[this._currentProps.getKey()] = this._currentProps.getErrorsValues();
		throw new AssertError({
			message: 'Assert error',
			data: this._errors
		});
	}

	/**
	 * @throws AssertError
	 *
	 * @returns {Promise<void>}
	 */
	async asyncAssertOne() {
		try {
			this.assertOne();
		} catch (error) {
			throw new AssertError({
				message: 'Assert error',
				data: this._errors
			});
		}
	}

}
