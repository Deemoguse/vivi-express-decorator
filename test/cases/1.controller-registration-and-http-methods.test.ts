import assert from 'assert';
import request from 'supertest';
import createApp from '../utils/create-app';
import { hl, hld } from '../utils/highlight';
import { ControllerWithAlHttpMethods } from '../controllers/controller-with-all-http-methods';

// Testing:
describe(hl('Registration controller and HTTP-methods. Using @Controller and @Get, @Post, @Patch, etc. decorators:'), () => {

	// Test AttachControllers
	it(hld('AttachControllers testing .Only classes can be attached to the app.'), () => {
		assert.throws(() => createApp([ 0, 'asdsa', {}, () => {}, function () {}, [] ]), { name: 'ReferenceError' });
	})

	// Test HTTPS's methods:
	for (const method of ControllerWithAlHttpMethods.methods) {
		const app = createApp([ ControllerWithAlHttpMethods ]);
		const methodName = method.slice(0, 1).toUpperCase() + method.slice(1);
		it(hld(`Testing the ${methodName} method.`), async () => {
			const response = (await request(app)[method](`/${method}`));
			const data = await response.body;

			assert.equal(response.status, 200);
			if (method !== 'head') assert.equal(data.value, 'ok');
		}, 15_000);
	}
});