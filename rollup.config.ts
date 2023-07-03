import packageJson from './package.json';
import { defineConfig } from 'rollup';
import cjs from '@rollup/plugin-commonjs';
import ts from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';

export default defineConfig([
	// Compile Typescript files:
	{
		input: 'src/index.ts',
		output: [
			{
				file: packageJson.main,
				format: 'cjs',
				sourcemap: false,
				exports: 'auto',
			},
			{
				file: packageJson.module,
				format: 'esm',
				sourcemap: false,
				exports: 'auto',
			},
		],
		plugins: [ cjs(), ts({ exclude: 'test' }), terser() ],
	},

	// Compile Decloration file:
	{
		input: 'src/index.ts',
		output: [{ file: packageJson.types, format: 'esm' }],
		plugins: [ dts() ],
	},
]);