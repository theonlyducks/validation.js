export class Empty {

	static MESSAGES = {
		isEmpty: 'This prop is empty',
		isUndefined: 'This prop is required'
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
