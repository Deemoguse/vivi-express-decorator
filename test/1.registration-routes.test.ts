import colors                     from 'colors';
import assert                     from 'assert';
import request                    from 'supertest';
import startHttpServer            from './utils/server';
import * as _D                    from '../src';
import type { Response, Request } from '../src';

@_D.Controller('/')
class HttpRoute
{
	@_D.Get('/get')
	public async get (req: Request, res: Response): Promise<void>
	{
		res.send({ value : 'ok' });
	}

	@_D.Post('/post')
	public async post (req: Request, res: Response): Promise<void>
	{
		res.send({ value : 'ok' });
	}

	@_D.Patch('/patch')
	public async patch (req: Request, res: Response): Promise<void>
	{
		res.send({ value : 'ok' });
	}

	@_D.Put('/put')
	public async put (req: Request, res: Response): Promise<void>
	{
		res.send({ value : 'ok' });
	}

	@_D.Head('/head')
	public async head (req: Request, res: Response): Promise<void>
	{
		res.status(200).send();
	}

	@_D.Delete('/delete')
	public async delete (req: Request, res: Response): Promise<void>
	{
		res.send({ value : 'ok' });
	}

	@_D.Connect('/connect')
	public async connect (req: Request, res: Response): Promise<void>
	{
		res.status(200).send();
	}

	@_D.Options('/options')
	public async options (req: Request, res: Response): Promise<void>
	{
		res.send({ value : 'ok' });
	}

	@_D.Trace('/trace')
	public async trace (req: Request, res: Response): Promise<void>
	{
		res.send({ value : 'ok' });
	}
}

// Testing:
describe(`Registration of routes. Using ${colors.bold.yellow('@Get')}, ${colors.bold.yellow('@Post')}, ${colors.bold.yellow('@Patch')}, etc. decorators:`, () =>
	{
		const { server, app } = startHttpServer([ HttpRoute ]);
		const methods = [ 'get', 'post', 'patch', 'put', 'head', 'delete', 'options', 'trace' ] as const;

		// Test HTTPS's methods:
		for (const method of methods)
		{
			it (`Testing the ${colors.bold.yellow.dim(method.toUpperCase())} method.`, async () =>
				{
					const response = await request(app)[method](`/${method}`);
					const data     = await response.body;

					if (method === 'head')
					{
						assert.equal(response.status, 200);
					}
					else
					{
						assert.equal(data.value, 'ok');
					}
				},
			);
		}

		server.close();
	},
);