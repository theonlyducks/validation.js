# Validation.js

> JavaScript validation engine

![Version](https://img.shields.io/github/package-json/v/theonlyducks/validation.js)
![Project Size](https://img.shields.io/bundlephobia/min/@theonlyducks/validation.js@latest)
![Dependencies](https://img.shields.io/github/languages/top/theonlyducks/validation.js)
![Licence](https://img.shields.io/github/license/theonlyducks/validation.js)

## Table of contents

- [Getting started](#getting-started)
- [Documentation](#documentation)

## Documentation

See

## Getting started

### Installation

```shell
yarn add @theonlyducks/valitaion.js
```

### Usage

#### Basic usage

```js
import Validate, { AssertError } from "valitaion.js";

const name = 'John Doe'
const props = new Validate();
props.ofValue(name).isString().isEmail();

try {
    props.assertOne();
    console.log('valid');
} catch (error) {
	if (error instanceof AssertError) {
		console.error('errors', errors.data);
	}
}
```

#### Advanced usage

```js
import Validate, { AssertError } from "valitaion.js";

const data = {
    name: 'John Doe',
	email: 'john.doe@gmail.com'
};

const validate = new Validate();
validate
	.addKey('name').required().notEmpty().isString()
	.addKey('email').required().notEmpty().isString().isEmail();

try {
    validate.assert(data);
	console.log('valid');
} catch (error) {
	if (error instanceof AssertError) {
		console.error('errors', errors.data);
	}
}
```

## Development

Install

```shell
yarn
```

Run tests

```shell
yarn test
```

## License

[MIT](https://opensource.org/licenses/MIT) © [The Only Ducks](https://github.com/theonlyducks)
