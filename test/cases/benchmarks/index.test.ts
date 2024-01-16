
import { benchmarkSuite } from 'jest-bench';
import { $, createApp, hl, hld } from '../../utils';

const CONTROLLER_COUNT = 500;

benchmarkSuite(hl('Test perfomance:'), {
	[hld(`Registration of ${CONTROLLER_COUNT} controllers with 3 routes (total 450 routes).`)]: (defference) => {
		// Create app with controller:
		const controllers: any[] = [];

		for (let i = 0; i < CONTROLLER_COUNT; i++) {
			@$.Controller(`/controller-${i}`)
			class Controller {
				static counter = 0;

				/* eslint-disable no-multi-spaces */
				response (res: $.Response, body: boolean = true) { res.status(200).send(body ? { result: 'OK' } : null); }
				@$.Get (`/get-${i}`) public get (_: any, res: $.Response) { this.response(res); }

				@$.Middleware(() => Controller.counter += 1)
				@$.Put (`/put-${i}`) public put (_: any, res: $.Response) { this.response(res); }

				@$.Api()
				@$.Middleware(() => Controller.counter += 1)
				@$.Post (`/pos-${i}`) public post (_: any, res: $.Response) { this.response(res); }
				/* eslint-enable no-multi-spaces */
			}
			controllers.push(Controller);
		}

		// Attach all Controllers:
		createApp(controllers);

		// End test:
		defference.resolve();
	},
});