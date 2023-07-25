export class Primitive {

	static MESSAGES = {
		isString: 'This prop is not String',
		isNumeric: 'This prop is not Number',
		isBoolean: 'This prop is not Boolean',
		isObject: 'This prop is not Object',
		objectHasProperty: 'This object not have prop'
	}

	static isString() {
		return function (value) {
			return typeof value === 'string';
		}
	}

	static isNumeric() {
		return function (value) {
			return typeof value === 'number';
		}
	}

	static isBoolean() {
		return function (value) {
			return typeof value === 'boolean';
		}
	}

	static isObject() {
		return function (value) {
			return typeof value === 'object';
		}
	}

	static objectHasProperty(prop) {
		return function (value) {
			if (typeof value === 'object') {
				return value[prop] !== undefined;
			}
			return false;
		}
	}

}
