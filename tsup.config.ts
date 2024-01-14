import fs from 'fs';
import path from 'path';
import tsup from 'tsup';
import colors from 'colors';
import packageJson from './package.json';

// Remove "dist" folder:
fs.rmSync('dist', { recursive: true });

/**
 * Create params by output file format.
 * @param output  - `main` or `module` field on `packageJson`.
 * @param format - Output file format.
 */
function createOptions (
	output: typeof packageJson.main,
	format: tsup.Format | 'types',
): tsup.Options {
	return {
		entry: [ 'src/index.ts' ],
		outDir: path.dirname(output),
		format: format === 'types' ? 'cjs' : format,
		dts: format === 'types' ? { only: true } : false,
		outExtension: () => ({ js: '.js' }),
		external: [ 'express', 'glob' ],
		minify: true,
		onSuccess: async () => console.log(`${colors.bold.green(`[ TSUP ][ ${format} ]:`)} ${colors.green('build success!')}`),
		silent: true,
	};
}

export default tsup.defineConfig([
	createOptions(packageJson.main, 'cjs'),
	createOptions(packageJson.module, 'esm'),
	createOptions(packageJson.types, 'types'),
]);