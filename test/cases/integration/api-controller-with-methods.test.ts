import { $, createApp, hl, hld } from '../../utils';

@$.Api()
@$.Controller('/')
class Controller
{
	@$.Get('/get-1')
	public apiGet1 (_: any, res: $.Response) { res.status(200); res.send({ result: '1 API OK' }); }

	@$.Get('/get-2')
	public apiGet2 (_: any, res: $.Response) { res.status(200); res.send({ result: '2 API OK' }); }
}

describe(hl('Test request to the HTTP methods. Use @Controller, @Get & @Api decorators:'), () => {
	// Create app with controller:
	const app = createApp([ Controller ]);

	// Test Controller with middleware:
	test(hld('- Checking the Api Decorator with controller. Should return <`{ result: "API OK" }`|yellow-bold>'), async () => {
		const response1 = await app.get('/api/get-1');
		const response2 = await app.get('/api/get-2');

		expect(response1.body.result).toEqual('1 API OK');
		expect(response2.body.result).toEqual('2 API OK');
	});
});