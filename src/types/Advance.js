export class Advance {

	static MESSAGES = {
		isEmail: 'This prop is not Email',
		isLength: 'This prop not required length'
	}

	static isEmail() {
		return function (value) {
			const email = /\S+@\S+\.\S+/;
			return email.test(value);
		}
	}

	static isLength({min, max = null}) {
		return function (value, type) {
			let length = value.length;
			if (type === 'number') {
				length = value.toString().length
			}
			if (type === 'object') {
				length = Object.keys(value).length >= min
			}
			if (type === 'boolean') {
				return true;
			}
			if (max) {
				return length >= min && length <= max;
			}
			return length >= min;
		}
	}

}
