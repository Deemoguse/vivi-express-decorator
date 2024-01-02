import { $, createApp, capitalize, hl, hld } from '../../utils';

@$.Controller('/')
class Controller
{
	/* eslint-disable no-multi-spaces */
	static readonly methods         = [ 'get', 'put', 'post', 'patch', 'delete', 'head', 'trace', 'options' ] as const;
	static readonly methodsWithBody = [ 'get', 'put', 'post', 'patch', 'delete' ];
	response (res: $.Response, body: boolean = true) { res.status(200).send(body ? { result: 'OK' } : null); }

	@$.Get        ('/get')     public get     (_: any, res: $.Response) { this.response(res);        }
	@$.Put        ('/put')     public put     (_: any, res: $.Response) { this.response(res);        }
	@$.Post       ('/post')    public post    (_: any, res: $.Response) { this.response(res);        }
	@$.Patch      ('/patch')   public patch   (_: any, res: $.Response) { this.response(res);        }
	@$.Delete     ('/delete')  public delete  (_: any, res: $.Response) { this.response(res);        }
	@$.Head       ('/head')    public head    (_: any, res: $.Response) { this.response(res, false); }
	@$.Trace      ('/trace')   public trace   (_: any, res: $.Response) { this.response(res, false); }
	@$.Options    ('/options') public options (_: any, res: $.Response) { this.response(res, false); }
	@$.Connect    ('/connect') public connect (_: any, res: $.Response) { this.response(res, false); }
	/* eslint-enable no-multi-spaces */
}

describe(hl('Test request to the HTTP methods. Use @Controller, @Get, @Post, @Put & ect. decorators:'), () => {

	// Create app with controller:
	const app = createApp([ Controller ]);

	// Test HTTP methods:
	for (const method of Controller.methods) {
		test(hld(`- Test ${capitalize(method)} method`), async () => {
			const response = await app[method](`/${method}`);

			expect(response.status).toEqual(200);
			if (Controller.methodsWithBody.includes(method)) {
				expect(response.body.result).toEqual('OK');
			}
		});
	}
});