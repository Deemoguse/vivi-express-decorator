import { $, hl, hld } from '../../utils';

// The global variable is defined by the test context in rollup.config.ts
// eslint-disable-next-line no-var
declare global { var experimentalDecorators: number; }
const expectedResult = globalThis.experimentalDecorators ? 2 : 3;

describe(hl('Testing Support class.'), () => {
	// Resetting the initial value to start the definition:
	afterEach(() => {
		$.Support.stageProposal = 'auto';
	});

	test(hld('- The definition works after the first application to the controller class:'), () => {
		@$.Controller('/')
		class Controller {
		};

		expect($.Support.stageProposal).toEqual(expectedResult);
	});

	test(hld('- The definition works after the first application to the controller method:'), () => {
		class Controller {
			@$.Get('/')
			method () {}
		};

		expect($.Support.stageProposal).toEqual(expectedResult);
	});

	test(hld('- The definition works after the first application to the controller method:'), () => {
		expect(() => {
			const fn = $.Support.provide({
				decoratorStage2: (a: any, b: any, c: any): void => {},
				decoratorStage3: (a: any, b: any, c: any): void => {},
			});
			fn(null, null, null);
		}).toThrow(Error);
	});
});