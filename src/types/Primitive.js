export class Primitive {

	static MESSAGES = {
		isString: 'this prop is not String',
		isNumeric: 'this prop is not Number',
		isBoolean: 'this prop is not Boolean',
		isObject: 'this prop is not Object',
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
