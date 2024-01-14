import colors from 'colors';
import presets from 'ts-jest/presets';
import { compilerOptions } from './tsconfig.json';
import type { JestConfigWithTsJest } from 'ts-jest';

// ENVs:
const skipBenchmarksTests = process.env.npm_config_skip_benchmarks_tests || process.env.SKIP_BENCHMARKS_TESTS === 'true';

/**
 * Create test project.
 * @param experimentalDecorators - use `experimentalDecorators`.
 * @param benchmarks - test Benchmarks.
 */
function createProject (experimentalDecorators: boolean, benchmarks: boolean): JestConfigWithTsJest {
	// Pattern for tests:
	const patters = {
		modules: '<rootDir>/test/cases/modules/*.test.ts',
		integration: '<rootDir>/test/cases/integration/*.test.ts',
		benchmarks: '<rootDir>/test/cases/benchmarks/*.test.ts',
	};

	// Colorized project name:
	const name = [
		` ${colors.bold(benchmarks ? 'Benchmark' : 'Auto-test' )} ${colors.bgWhite(' ')}`,
		`[ ${colors[experimentalDecorators ? 'green' : 'red'].bold('●')} ]`,
		`${colors.bold('Experimental Decorators')} -`,
		`${colors[experimentalDecorators ? 'green' : 'red'].bold(`${experimentalDecorators ? 'Enabled ' : 'Disabled'}`)}`,
	].join(' ');

	return {
		...presets.defaults,
		globals: { experimentalDecorators },
		displayName: colors.reset(name),
		testMatch: benchmarks ? [ patters.benchmarks ] : [ patters.modules, patters.integration ],
		testEnvironment: benchmarks ? 'jest-bench/environment' : 'node',
		transform: { '^.+\\.ts$': [ 'ts-jest', { tsconfig: { ...compilerOptions, experimentalDecorators }}]},
	};
}

export default {
	collectCoverage: true,
	collectCoverageFrom: [ 'src/**/*.ts', '!src/**/*.d.ts' ],
	// coverageReporters: [ 'cobertura', 'json-summary' ],

	projects: [
		createProject(true, false),
		createProject(false, false),

		// Benchmarks Tests:
		...(skipBenchmarksTests === false
			? [ createProject(true, true), createProject(false, true) ]
			: []
		),
	],
} as JestConfigWithTsJest;