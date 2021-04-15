export class Props {

    constructor(key) {
        this._key = key;
        this._validators = [];
        this._errors = {};
        this._hasErrors = false;
    }

    getKey() {
        return this._key;
    }

    pushValidator(id, text, func) {
        this._validators.push({ id, text, func });
    }

    assertValidators(data) {
        this._validators.forEach(item => {
            const valid = item.func(data[this._key]);
            if(!valid) {
                this._hasErrors = true;
                this._errors[item.id] = item.text;
            }
        })
    }

    hasErrors() {
        return this._hasErrors;
    }

    getErrorsKeys() {
        return Object.keys(this._errors);
    }

    getErrorsValues() {
        return Object.values(this._errors);
    }

}