import path from 'path';
import { $, hl, hld } from '../../utils';

const getPathToControllers = (pattern: string): string => path.resolve(__dirname, `../../mock/controllers/${pattern}`);

describe(hl('Testing ImportControllers function. Using ImportControllers.'), () => {

	// Testing without waiting for errors:
	describe(hl('- Testing the import controller the import of which will not cause errors:'), () => {

		test('All controllers whose name starts with a number were imported.', async () => {
			const controllers = await $.ImportControllers(getPathToControllers('[1-9].controller.ts'));
			for (const Controller of controllers) {
				// It is known that the names of these controllers will be `One` or `Two`:
				expect([ 'One', 'Two' ].includes(Controller.name)).toBe(true);
			}
		});
	});

	// Testing with the expectation of errors:
	describe(hl('- Testing the import controller, the import of which will lead to errors:'), () => {

		test(hld('Attempting to import a module without exporting by default will cause a ReferenceError error.'), () => {
			expect(async () => await $.ImportControllers(getPathToControllers('3.no-default-export.controller.ts'))).toThrow(ReferenceError);
		});
	});
});