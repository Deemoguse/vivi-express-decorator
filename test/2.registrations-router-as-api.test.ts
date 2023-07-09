import colors from 'colors';
import assert from 'assert';
import request from 'supertest';
import startHttpServer from './utils/server';
import * as _D from '../src';
import type { Response, Request } from '../src';

// Testing:
describe(`Registering a router as an API method. The order of assignment of the decorator ${colors.bold.yellow('@Api')}:`, () =>
	{
		it(`The ${colors.bold.dim.yellow('@Api')} decorator is above the HTTP method decorator. This should not cause an error.`, async () =>
			{
				function _case ()
				{
					// Create controller :
					@_D.Controller('/test')
					class HttpRoute
					{
						@_D.Api()
						@_D.Get('/get')
						public async get (req: Request, res: Response): Promise<void>
						{}
					}
				}

				// Testing:
				expect(_case).not.toThrow(Error);
			},
		);

		it('Registering an HTTP method as an Api method.', async () =>
			{
				// Create class controller:
				@_D.Controller('/test')
				class HttpRoute
				{
					@_D.Api()
					@_D.Get('/get')
					public async get (req: Request, res: Response): Promise<void>
					{
						res.send({ value: 'ok' });
					}
				}

				// Start server
				const { server, app } = startHttpServer([ HttpRoute ]);

				// Request to "server":
				const response = await request(app).get('/api/test/get');
				const data = await response.body;

				// Testing:
				assert.equal(data.value, 'ok');

				server.close();
			},
		);

		it(`Registering an HTTP method as an Api method with changing the ${colors.bold.dim.yellow('apiURL')} property of the ${colors.bold.dim.yellow('config')} module.`, async () =>
			{
				_D.config.apiURL = '/my/api';

				// Create class controller:
				@_D.Controller('/test')
				class HttpRoute
				{
					@_D.Api()
					@_D.Get('/get')
					public async get (req: Request, res: Response): Promise<void>
					{
						res.send({ value: 'ok' });
					}
				}

				// Start server
				const { server, app } = startHttpServer([ HttpRoute ]);

				// Request to "server":
				const response = await request(app).get('/my/api/test/get');
				const data = await response.body;

				// Testing:
				assert.equal(data.value, 'ok');

				server.close();
			},
		);
	},
);