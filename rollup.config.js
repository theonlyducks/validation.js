const { terser } = require('rollup-plugin-terser');
const { babel } = require('@rollup/plugin-babel');
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require('@rollup/plugin-node-resolve');

const  packageJson = require('./package.json');

module.exports = {
	input: packageJson.main,
	output: [
		{
			name: packageJson.name,
			file: './dist/validation.cjs.js',
			format: 'cjs',
			exports: 'auto'
		},
		{
			name: packageJson.name,
			file: './dist/validation.esm.js',
			format: 'esm'
		}
	],
	plugins: [
		resolve(),
		babel({
			babelHelpers: 'bundled',
		}),
		commonjs(),
		terser({
			compress: {
				drop_console: true,
			},
			output: {
				comments: false
			}
		})
	]
}
