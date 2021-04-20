import { Props } from './props.js';
import { Empty } from './empty.js';
import { Advance } from './advance.js'
import { Primitive } from './primitive.js';
import { AssertError } from './AssertError.js';

export class Validate {

    constructor() {
        this._props = [];
        this._value = null;
        this._errors = {};
        this._hasErrors = false;
        this._currentProps = null;
        this._currentGetProps = null;
    }

    addKey(key) {
        this._currentProps = new Props(key);
        this._props.push(this._currentProps);
        return this;
    }

    getKey(key) {
        for (let prop of this._props) {
            if(prop.getKey() === key) {
                this._currentGetProps = prop;
                break;
            }
        }
        return this._currentGetProps;
    }

    ofValue(value) {
        this._value = value;
        this._currentProps = new Props([value]);
        return this;
    }

    required() {
        this._currentProps.pushValidator('required', Empty.MESSAGES.isUndefined, Empty.isUndefined());
        return this;
    }

    notEmpty() {
        this._currentProps.pushValidator('isEmpty', Empty.MESSAGES.isEmpty, Empty.isEmpty());
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

    isEmail() {
        this._currentProps.pushValidator('isEmail', Advance.MESSAGES.isEmail, Advance.isEmail());
        return this;
    }

    isLength(options) {
        this._currentProps.pushValidator('isLength', Advance.MESSAGES.isLength, Advance.isLength(options));
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
            throw new AssertError({
                message: 'Assert error',
                data: this._errors
            });
        }
    }

    assertOne() {
        this._currentProps.assertValidators({ [this._value]: this._value });
        if(this._currentProps.hasErrors()) {
            this._hasErrors = true;
            this._errors[this._currentProps.getKey()] = this._currentProps.getErrorsValues();
        }
        if(this._hasErrors) {
            throw new AssertError({
                message: 'Assert error',
                data: this._errors
            });
        }
    }

    asyncAssertOne() {
        return new Promise(resolve => {
            try {
                this.assertOne();
                resolve();
            } catch (error) {
                throw new AssertError({
                    message: 'Assert error',
                    data: this._errors
                });
            }
        });
    }

}

// const name = 23;
// const prop = new Validate();
// prop.ofValue(name).isString().asyncAssertOne().then(() => {
//     console.log('valid');
// }).catch(errors => {
//     console.log(errors.data);
// });

const validate = new Validate();
validate
    .addKey('age').required().isNumeric().notEmpty().isLength({ min: 2, max: 4 })
    .addKey('name').required().isString().isLength({ min: 5, max: 8 })
    .addKey('email').required().isString().isEmail()
    .addKey('admin').isBoolean().notEmpty()
    .addKey('cards').required().isObject().isLength({ min: 1 }).objectHasProperty('name');

try {
    let data = {
        age: 23,
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
    console.log(error.data);
}

console.log(validate.hasErrors());
console.log(validate.getKey('age').hasErrors());