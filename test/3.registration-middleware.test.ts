import colors                                   from 'colors';
import assert                                   from 'assert';
import request                                  from 'supertest';
import startHttpServer                          from './utils/server';
import * as _D                                  from '../src';
import type { Response, Request, NextFunction } from '../src';

// Middleware functions:
let middlewareForMethodCounter     = 0;
let middlewareForControllerCounter = 0;

function middlewareForController (req: Request, res: Response, next: NextFunction): void
{
	middlewareForControllerCounter++;
	next();
}
function middlewareForMethod (req: Request, res: Response, next: NextFunction): void
{
	middlewareForMethodCounter++;
	next();
}

@_D.Middleware(middlewareForController)
@_D.Controller('/')
class HttpRoute
{
	@_D.Middleware(middlewareForMethod)
	@_D.Get('/test')
	public async get (req: Request, res: Response): Promise<void>
	{
		res.send();
	}

	@_D.Middleware(middlewareForMethod)
	@_D.Post('/test')
	public async post (req: Request, res: Response): Promise<void>
	{
		res.send();
	}
}

// Testing:
describe(`Assigning a ${colors.bold.yellow('@Middleware')} decorator to controllers and its methods.`, () =>
{
		it(`Assigning ${colors.bold.dim.yellow('@Middleware')} to HTTP methods.`, async () =>
			{
				// Reset values:
				middlewareForMethodCounter     = 0;
				middlewareForControllerCounter = 0;

				// Start server:
				const { server, app } = startHttpServer([ HttpRoute ]);

				// Requests for filling in the counter of the middleware function execution:
				for await (const i of Array.from(Array(5)).map((_, id) => id))
				{
					await request(app)[i % 2 ? 'get' : 'post']('/test');
				}

				// Testing:
				assert.equal(middlewareForMethodCounter, 5);

				server.close();
			},
		);

		it(`Assigning ${colors.bold.dim.yellow('@Middleware')} to controller.`, async () =>
			{
				// Reset values:
				middlewareForMethodCounter     = 0;
				middlewareForControllerCounter = 0;

				// Start server:
				const { server, app } = startHttpServer([ HttpRoute ]);

				// Requests for filling in the counter of the middleware function execution:
				for await (const i of Array.from(Array(5)))
				{
					await request(app).get('/test');
				}

				// Testing:
				assert.equal(middlewareForControllerCounter, 5);

				server.close();
			},
			10000,
		);
	},
);