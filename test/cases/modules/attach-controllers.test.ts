import Express from 'express';
import request from 'supertest';
import { $, hl, hld } from '../../utils';
import { AttachControllers } from '../../../src';

@$.Controller('/')
class MyController {
	@$.Get('/')
	method (req: $.Request, res: $.Response) {
		res.status(200).send();
	}
}
class OtherController {
	method (req: $.Request, res: $.Response) {
		res.status(200).send();
	}
}

describe(hl('Testing AttachControllers function. Using @Controller and @Get decorators, using AttachControllers:'), () => {

	// Checking without waiting for errors:
	describe(hl('- Attaching <registered|green-bold> controller:'), () => {
		const app = Express();

		// Attach controllers:
		AttachControllers(app, [ MyController ]);

		// Test response:
		test(hld('The HTTP method is initialized and returns 200 status.'), async () => {
			const response = await request(app).get('/');
			expect(response.status).toBe(200);
		});
	});

	// Checking with the expectation of errors:
	describe(hl('- Attaching <unregistered|red-bold> controller:'), () => {
		const app = Express();

		// Test error type:
		test(hld('An attempt to attach an unregistered one to a controller causes an ReferenceError.'), async () => {
			expect(() => AttachControllers(app, [ OtherController ])).toThrow(ReferenceError);
		});
	});
});