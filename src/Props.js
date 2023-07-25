export class Props {

	/**
	 *
	 * @param key
	 */
	constructor(key) {
		this._key = key;
		this._validators = [];
		this._errors = {};
		this._hasErrors = false;
		this._required = false;
	}

	/**
	 * Return prop key
	 *
	 * @returns {string}
	 */
	getKey() {
		return this._key;
	}

	/**
	 * Return if props has error
	 *
	 * @returns {boolean}
	 */
	hasErrors() {
		return this._hasErrors;
	}

	/**
	 * Return if props has required
	 *
	 * @returns {boolean}
	 */
	hasRequired() {
		return this._required;
	}

	/**
	 * Return keys of the errors
	 *
	 * @returns {string[]}
	 */
	getErrorsKeys() {
		return Object.keys(this._errors);
	}

	/**
	 * Return messages of the errors
	 *
	 * @returns {*[]}
	 */
	getErrorsValues() {
		return Object.values(this._errors);
	}

	/**
	 * Add validator of the prop
	 *
	 * @param {string} id
	 * @param {string} text
	 * @param {function} func
	 */
	pushValidator(id, text, func) {
		this._validators.push({id, text, func});
	}

	/**
	 * Validate of all validator prop
	 *
	 * @param {object} data
	 */
	assertValidators(data) {
		this._validators.forEach(item => {
			let valid = true;
			if (!this._required && data[this._key] !== undefined) {
				valid = item.func(data[this._key], typeof data[this._key]);
			}
			if (!valid) {
				this._hasErrors = true;
				this._errors[item.id] = item.text;
			}
			if (!valid && item.id === 'required') {
				this._required = true;
			}
		})
	}

}
