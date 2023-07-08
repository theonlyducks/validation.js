# Validation.js

> JavaScript validation engine

## Documentation

See

## Getting started

### Installation

```shell
yarn add valitaion.js
```

### Usage

```js
import Validate from "valitaion.js";

const name = 'John Doe'
const props = new Validate();
props.ofValue(name).isString().isEmail();

try {
    props.assertOne();
	console.log('valid');
} catch (error) {
	console.error('errors', errors.data);
}
```
