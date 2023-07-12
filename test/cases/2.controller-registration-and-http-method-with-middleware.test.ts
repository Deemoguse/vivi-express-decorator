import assert from 'assert';
import request from 'supertest';
import startHttpServer from '../utils/server';
import { hl, hld } from '../utils/highlight';
import { ControllerWithMiddlewares, purposeHttpMethod, purposeController} from '../controllers/controller-with-middlewares';

// Testing:
describe(hl('Assigning a @Middleware decorator to controllers and its methods. Using @Controller, @Get and @Middleware decorators:'), () => {
	const { server, app } = startHttpServer([ ControllerWithMiddlewares ]);

	// Test controller with @Middleware decorator:
	it(hld(`Assigning @Middleware to controller.`), async () => {
		for (let i = 0; i < 5; i++) {;
			const response = await request(app).get('/middlewares/increment-1');
			assert.equal(response.status, 200);
		}

		// Checking the final value:
		assert.equal(purposeHttpMethod, 0);
		assert.equal(purposeController, 5);
	}, 15_000);

	// Test HTTP-method with @Middleware decorator:
	it(hld(`Assigning @Middleware to HTTP-method.`), async () => {
		for (let i = 0; i < 5; i++) {;
			const response = await request(app).get('/middlewares/increment-2');
			assert.equal(response.status, 200);
		}

		// Checking the final value:
		assert.equal(purposeHttpMethod, 5);
		assert.equal(purposeController, 10);
	}, 15_000);

	afterAll(() => server.close());
});