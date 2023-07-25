export class Empty {

	static MESSAGES = {
		isEmpty: 'this prop is empty',
		isUndefined: 'this prop is required'
	}

	static isEmpty() {
		return function (value, type) {
			if (type !== 'boolean') {
				return !!value;
			}
			return true;
		}
	}

	static isUndefined() {
		return function (value) {
			return value !== undefined;
		}
	}

}
