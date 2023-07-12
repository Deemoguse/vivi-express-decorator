import assert from 'assert';
import request from 'supertest';
import startHttpServer from './utils/server';
import { hl, hld } from './utils/highlight';
import { ControllerWithAlHttpMethods } from './controller/controller-with-all-http-methods';

// Testing:
describe(hl('Registration controller and HTTP-methods. Using @Controller and @Get, @Post, @Patch, etc. decorators:'), () => {
	const { server, app } = startHttpServer([ ControllerWithAlHttpMethods ]);

	// Test HTTPS's methods:
	for (const method of ControllerWithAlHttpMethods.methods) {
		const methodName = method.slice(0, 1).toUpperCase() + method.slice(1);
		it(hld(`Testing the ${methodName} method.`), async () => {
			const response = await request(app)[method](`/${method}`);
			const data = await response.body;

			assert.equal(response.status, 200);
			if (method !== 'head') assert.equal(data.value, 'ok');
		}, 15_000);
	}
	afterAll(() => server.close());
});