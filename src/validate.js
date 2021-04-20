import { Props } from './props.js';
import { Primitive } from './primitive.js';

export class Validate {

    constructor() {
        this._props = [];
        this._errors = {};
        this._hasErrors = false;
        this._currentProps = null;
    }

    addKey(key) {
        this._currentProps = new Props(key);
        this._props.push(this._currentProps);
        return this;
    }

    required() {
        this._currentProps.pushValidator('required', 'This prop is required', function(value) {
            return value !== undefined;
        });
        return this;
    }

    isNumeric() {
        this._currentProps.pushValidator('isNumeric', Primitive.MESSAGES.isNumeric, Primitive.isNumeric());
        return this;
    }

    isString() {
        this._currentProps.pushValidator('isString', Primitive.MESSAGES.isString, Primitive.isString());
        return this;
    }

    isBoolean() {
        this._currentProps.pushValidator('isBoolean', Primitive.MESSAGES.isBoolean, Primitive.isBoolean());
        return this;
    }

    isObject() {
        this._currentProps.pushValidator('isObject', Primitive.MESSAGES.isObject, Primitive.isObject());
        return this;
    }

    objectHasProperty(prop) {
        this._currentProps.pushValidator('objectHasProperty', Primitive.MESSAGES.objectHasProperty, Primitive.objectHasProperty(prop));
        return this;
    }

    notEmpty() {
        this._currentProps.pushValidator('isEmpty', 'This prop is empty', function(value) {
            return !!value;
        });
        return this;
    }

    isEmail() {
        this._currentProps.pushValidator('isEmail', 'This prop is not Email', function(value) {
            const email = /\S+@\S+\.\S+/;
            return email.test(value);
        });
        return this;
    }

    isLength({ min, max }) {
        this._currentProps.pushValidator('isLength', 'This prop not required length', function(value) {
            return value.length >= min;
        });
        return this;
    }

    hasErrors() {
        return this._hasErrors;
    }

    assert(data) {
        this._props.forEach(prop => {
            prop.assertValidators(data);
            if(prop.hasErrors()) {
                this._hasErrors = true;
                this._errors[prop.getKey()] = prop.getErrorsValues();
            }
        });
        if(this._hasErrors) {
            throw new Error(JSON.stringify(this._errors));
        }
    }

}

const validate = new Validate();
validate
    .addKey('age').required().isNumeric().notEmpty()
    .addKey('name').required().isString().isLength({ min: 5 })
    .addKey('email').required().isString().isEmail()
    .addKey('admin').required().isBoolean()
    .addKey('cards').required().isObject().objectHasProperty('name');

try {
    let data = {
        age: 12,
        name: 'Giovane',
        email: 'giovanesantos1999@gmail.com',
        admin: false,
        cards: {
            name: ''
        }
    }
    validate.assert(data);
    console.log('valid');
} catch (error) {
    console.log(JSON.parse(error.message));
}
