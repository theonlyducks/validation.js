import { Validate } from '../src/validate.js';

describe('Validate Component', function () {

	describe('Primitive Types', function () {

		it('should be able a valid string', function () {
			const name = 'John Doe';
			const prop = new Validate();
			prop.ofValue(name).isString();
			prop.assertOne();
			expect(prop.hasErrors()).toBeFalsy();
		});

		it('should be able a invalid string', function () {
			expect(function () {
				const name = 1;
				const prop = new Validate();
				prop.ofValue(name).isString();
				prop.assertOne();
			}).toThrow(new Error("Assert error"));
		});

		it('should be able a valid number', function () {
			const age = 1;
			const prop = new Validate();
			prop.ofValue(age).isNumeric();
			prop.assertOne();
			expect(prop.hasErrors()).toBeFalsy();
		});

		it('should be able a invalid number', function () {
			expect(function () {
				const age = '1';
				const prop = new Validate();
				prop.ofValue(age).isNumeric();
				prop.assertOne();
			}).toThrow(new Error("Assert error"));
		});

		it('should be able a valid boolean', function () {
			const hasName = true;
			const prop = new Validate();
			prop.ofValue(hasName).isBoolean();
			prop.assertOne();
			expect(prop.hasErrors()).toBeFalsy();
		});

		it('should be able a invalid boolean', function () {
			expect(function () {
				const hasName = 'true';
				const prop = new Validate();
				prop.ofValue(hasName).isBoolean();
				prop.assertOne();
			}).toThrow(new Error("Assert error"));
		});

		it('should be able a valid object', function () {
			const user = {  };
			const prop = new Validate();
			prop.ofValue(user).isObject();
			prop.assertOne();
			expect(prop.hasErrors()).toBeFalsy();
		});

		it('should be able a invalid object', function () {
			expect(function () {
				const user = '{}';
				const prop = new Validate();
				prop.ofValue(user).isObject();
				prop.assertOne();
			}).toThrow(new Error("Assert error"));
		});

		it('should be able a valid object with prop', function () {
			const user = { name: 'Giovane'  };
			const prop = new Validate();
			prop.ofValue(user).isObject().objectHasProperty('name');
			prop.assertOne();
			expect(prop.hasErrors()).toBeFalsy();
		});

		it('should be able a invalid object with props', function () {
			expect(function () {
				const user = { age: 1 };
				const prop = new Validate();
				prop.ofValue(user).isObject().objectHasProperty('name');
				prop.assertOne();
			}).toThrow(new Error("Assert error"));
		});

	});

	describe('Empty Types', function () {

		it('should be able valid require', function () {
			const user = {
				name: 'John Doe'
			};
			const validate = new Validate();
			validate.addKey('name').required();
			validate.assert(user);
			expect(validate.hasErrors()).toBeFalsy();
		});

		it('should be able invalid require', function () {
			const user = { };
			const validate = new Validate();
			validate.addKey('name').required();
			validate.assert(user);
			expect(validate.hasErrors()).toBeFalsy();
		});

		it('should be able valid not empty', function () {
			const name = 'john.doe@gmail.com';
			const prop = new Validate();
			prop.ofValue(name).notEmpty();
			prop.assertOne();
			expect(prop.hasErrors()).toBeFalsy();
		});

		it('should be able invalid not empty', function () {
			expect(function () {
				const name = '';
				const prop = new Validate();
				prop.ofValue(name).notEmpty();
				prop.assertOne();
			}).toThrow(new Error("Assert error"));
		});

	});

	describe('Advanced Types', function () {

		it('should be able a valid email', function () {
			const name = 'john.doe@gmail.com';
			const prop = new Validate();
			prop.ofValue(name).isEmail();
			prop.assertOne();
			expect(prop.hasErrors()).toBeFalsy();
		});

		it('should be able a invalid email', function () {
			expect(function () {
				const name = 'john.doe';
				const prop = new Validate();
				prop.ofValue(name).isEmail();
				prop.assertOne();
			}).toThrow(new Error("Assert error"));
		});

		it('should be able a valid length', function () {
			const name = 'John Doe';
			const prop = new Validate();
			prop.ofValue(name).isLength({ min: 1, max: 10 });
			prop.assertOne();
			expect(prop.hasErrors()).toBeFalsy();
		});


		it('should be able a invalid length', function () {
			expect(function () {
				const name = 'John Doe';
				const prop = new Validate();
				prop.ofValue(name).isLength({ min: 1, max: 6 });
				prop.assertOne();
			}).toThrow(new Error("Assert error"));
		});

	});

});
