import {Validate} from '../src/index.js';

let data = {
	age: 23,
	name: 'Giovane',
	email: 'giovanesantos1999@gmail.com',
	admin: true,
	cards: {
		name: ''
	}
}

const validate = new Validate();
validate
	.addKey('age').required().isNumeric().notEmpty().isLength({min: 2, max: 4})
	.addKey('name').required().isString().isLength({min: 5, max: 8})
	.addKey('email').required().isString().isEmail()
	.addKey('admin').isBoolean().notEmpty()
	.addKey('cards').required().isObject().isLength({min: 1}).objectHasProperty('name');

validate.asyncAssert(data)
	.then(() => console.log('valid'))
	.catch(errors => console.log('errors', errors.data));
