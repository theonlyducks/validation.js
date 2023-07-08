import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';

import packageJson from './package.json' assert { type: 'json' };

export default {
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
