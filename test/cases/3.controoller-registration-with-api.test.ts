import assert from 'assert';
import request from 'supertest';
import startHttpServer from '../utils/server';
import { hl, hld } from '../utils/highlight';
import { ControllerWithApi, ControllerWithApiForHttpMethod } from '../controllers/controller-with-api';

// Testing:
describe(hl('Registration controller and HTTP-methods as API. Using @Controller, @Get and @Api decorators:'), () => {
	const { server, app } = startHttpServer([ ControllerWithApi, ControllerWithApiForHttpMethod ]);

	// Test HTTPS's methods:
	it(hld('Testing the Get method with @Api.'), async () => {
		const response1 = await request(app).get('/controller-with-api-for-http-method/get');
		const response2 = await request(app).get('/api/controller-with-api-for-http-method/get');
		assert.equal(response1.body.value, 'ok');
		assert.equal(response2.body.value, 'ok');
	}, 15_000);

	// Test controllers:
	it(hld('Testing the controller with @Api.'), async () => {
		const response1 = await request(app).get('/api/controller-with-api/get-1');
		const response2 = await request(app).get('/api/controller-with-api/get-2');
		assert.equal(response1.body.value, 'ok');
		assert.equal(response2.body.value, 'ok');
	}, 15_000);

	afterAll(() => server.close());
});