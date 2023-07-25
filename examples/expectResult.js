import Validate from "../src/Validate.mjs";

// VALIDATE VARIABLE
const name = 'Giovane';
const prop = new Validate();
try {
	prop.ofValue(name)
		.isString()
		.isLength({ min: 1, max: 7 })
		.assertOne();
	console.log('valid');
} catch (errors) {
	console.error('errors', errors.data);
}

// VALIDATE OBJECT
const validate = new Validate();
validate
	.addKey('age').required().isNumeric().notEmpty().isLength({min: 2, max: 4})
	.addKey('name').required().isString().isLength({min: 5, max: 8})
	.addKey('email').required().isString().isEmail()
	.addKey('admin').isBoolean().notEmpty();
try {
	const data = {
		age: 23,
		name: 'Giovane',
		email: 'giovanesantos1999@gmail.com',
		admin: true
	};
	validate.assert(data);
	console.log('valid');
} catch (errors) {
	console.log('errors', errors.data);
}

// COVERT PROP STRING TO OTHER
const validate = new Validate();
validate
	.addKey('age').convertTo().isNumeric()
	.addKey('admin').convertTo().isBoolean();
try {
	let data = {
		age: '23',
		admin: 'true'
	};
	validate.assert(data);
	data = validate.getNew();
	console.log(data);
} catch (errors) {
	console.log('errors', errors.data);
}

// EXPRESSIONS
const name = 'Giovane';
const prop = new Validate();
try {
	console.log('valid');
} catch (errors) {
	console.error('errors', errors.data);
}
