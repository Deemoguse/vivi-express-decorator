import assert from 'assert';
import request from 'supertest';
import createApp from '../utils/create-app';
import { hl, hld } from '../utils/highlight';
import { ControllerWithApi, ControllerWithApiForHttpMethod } from '../controllers/controller-with-api';

// Testing:
describe(hl('Registration controller and HTTP-methods as API. Using @Controller, @Get and @Api decorators:'), () => {
	const app = createApp([ ControllerWithApi, ControllerWithApiForHttpMethod ]);

	// Test HTTPS's methods:
	it(hld('Testing the Get method with @Api.'), async () => {
		const response1 = await request(app).get('/api/get-1');
		const response2 = await request(app).get('/get-2');

		assert.equal(response1.statusCode, 200);
		assert.equal(response1.body.value, 'ok');

		assert.equal(response2.statusCode, 200);
		assert.equal(response2.body.value, 'ok');
	}, 15_000);

	// Test controllers:
	it(hld('Testing the controller with @Api.'), async () => {
		const response1 = await request(app).get('/api/get-1');
		const response2 = await request(app).get('/api/get-2');

		assert.equal(response1.statusCode, 200);
		assert.equal(response1.body.value, 'ok');

		assert.equal(response2.statusCode, 200);
		assert.equal(response2.body.value, 'ok');
	}, 15_000);
});