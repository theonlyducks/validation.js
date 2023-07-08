import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

import packageJson from './package.json' assert { type: 'json' };

export default {
	input: 'src/index.mjs',
	output: [
		{
			name: packageJson.name,
			file: packageJson.main,
			format: 'cjs',
			exports: 'auto'
		},
		{
			name: packageJson.name,
			file: packageJson.module,
			format: 'esm'
		}
	],
	plugins: [
		resolve(),
		babel({
			babelHelpers: 'bundled',
		}),
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
