import { Props } from './props.js';
import { Primitive } from './primitive.js';

class Core {

    constructor() {
        this._props = [];
        this._errors = {};
        this._hasErrors = false;
        this._currentProps = null;
        this._first = {
            primitive: false
        }
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
        this._currentProps.pushValidator('isNumeric', 'This prop is not Number', Primitive.isNumeric());
        return this;
    }

    isString() {
        this._currentProps.pushValidator('isString', 'This prop is not String', Primitive.isString());
        return this;
    }

    isBoolean() {
        this._currentProps.pushValidator('isBoolean', 'This prop is not Boolean', Primitive.isBoolean());
        return this;
    }

    notEmpty() {
        this._currentProps.pushValidator('isEmpty', 'This prop is empty', function(value) {
            return !!value;
        });
        return this;
    }

    isEmail() {
        this._currentProps.pushValidator('isBoolean', 'This prop is not Email', function(value) {
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

const validate = new Core();
validate
    .addKey('age').required().isNumeric().notEmpty()
    .addKey('name').required().isString().isLength({ min: 5 })
    .addKey('email').required().isString().isEmail()
    .addKey('admin').required().isBoolean();

try {
    let data = {
        age: 21,
        name: 'Giovane Santos',
        email: 'giovanesantos1999@gmail.com',
        admin: true
    }
    validate.assert(data);
    console.log('valid');
} catch (error) {
    console.log(JSON.parse(error.message));
}
