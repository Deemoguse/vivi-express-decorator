import packageJson from './package.json';
import { defineConfig, RollupOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import cjs from '@rollup/plugin-commonjs';
import ts from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const mode = process.env.mode || 'prod';
const config: Record<string, RollupOptions | RollupOptions[]> = {
	prod: [{
		input: 'src/index.ts',
		output: [{
			file: packageJson.main,
			format: 'cjs',
			sourcemap: false,
			exports: 'auto',
		}, {
			file: packageJson.module,
			format: 'esm',
			sourcemap: false,
			exports: 'auto',
		}],
		external: [ 'path', 'express', 'glob' ],
		plugins: [ cjs(), ts({ exclude: 'test' }), terser() ],
	}, {
		input: 'src/index.ts',
		output: [{ file: packageJson.types, format: 'esm' }],
		plugins: [ dts() ],
	}],

	test: [{
		input: 'src/index.ts',
		output: {
			file: 'dist/index.js',
			format: 'cjs',
			sourcemap: false,
			exports: 'auto',
		},
		external: [ 'path', 'express', 'glob' ],
		plugins: [ cjs(), ts({ exclude: 'test' }), terser() ],
	}, {
		input: 'src/index.ts',
		output: [{ file: 'dist/index.d.ts', format: 'esm' }],
		plugins: [ dts() ],
	}],
};

export default defineConfig(config[mode] as RollupOptions);