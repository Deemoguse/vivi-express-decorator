import { performance } from 'perf_hooks';
import { $, createApp, hl, hld } from '../../utils';

const CONTROLLER_COUNT = 500;
const TIMEOUT = 150;

describe(hl('Test perfomance:'), () => {
	// Test Perfomance:
	describe(hld(`- Goal: registration of ${CONTROLLER_COUNT} routes in <${TIMEOUT} ms|bold>:`), () => {
		const start = performance.now();

		// Create app with controller:
		const controllers: any[] = [];

		for (let i = 0; i < CONTROLLER_COUNT; i++) {
			@$.Controller(`/c${i}`)
			class Controller {
				static counter = 0;

				/* eslint-disable no-multi-spaces */
				response (res: $.Response, body: boolean = true) { res.status(200).send(body ? { result: 'OK' } : null); }
				@$.Get ('/get') public get (_: any, res: $.Response) { this.response(res); }

				@$.Middleware(() => Controller.counter += 1)
				@$.Put ('/put') public put (_: any, res: $.Response) { this.response(res); }

				@$.Api()
				@$.Middleware(() => Controller.counter += 1)
				@$.Post ('/post') public post (_: any, res: $.Response) { this.response(res); }
				/* eslint-enable no-multi-spaces */
			}
			controllers.push(Controller);
		}

		createApp(controllers);
		const delta = performance.now() - start;

		// Message:
		test(hl(`Total time: <${delta}|yellow-bold>`), () => {});
	});
});