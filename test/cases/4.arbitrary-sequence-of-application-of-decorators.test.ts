import assert from 'assert';
import request from 'supertest';
import createApp from '../utils/create-app';
import { hl, hld } from '../utils/highlight';
import { СontrollerDecoratorsInDifferentSequence, middlewareСallsNumber, sequence } from '../controllers/сontroller-with-methods-with-decorators-in-different-sequence';

// Testing:
describe(hl('Decorators can be used in different sequences. Using @Controller, @Get, @Api and @Middleware decorators:'), () => {
	const app = createApp([ СontrollerDecoratorsInDifferentSequence ]);
	const appRequest = request(app);

	// Test HTTPS's methods:
	for (let i = 0; i < 6; i++) {
		it(hld(`Sequence: ${sequence[i]}`), async () => {
			const response = await appRequest.get(`/api/${i}`);
			assert.equal(response.statusCode, 200);
			assert.equal(response.body.value, 'ok');
			assert.equal(middlewareСallsNumber, i + 1);
		}, 15_000);
	}
});