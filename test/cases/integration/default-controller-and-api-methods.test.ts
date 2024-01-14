import { $, createApp, hl, hld } from '../../utils';

@$.Controller('/')
class Controller
{
	@$.Get('/get')
	public get (_: any, res: $.Response) { res.status(200); res.send({ result: 'OK' }); }

	@$.Api()
	@$.Get('/get')
	public apiGet (_: any, res: $.Response) { res.status(200); res.send({ result: 'API OK' }); }
}

describe(hl('Test request to the HTTP methods. Use @Controller, @Get & @Api decorators:'), () => {
	// Create app with controller:
	const app = createApp([ Controller ]);

	// Test Controller with middleware:
	test(hld('- Checking the Get Decorator. Should return <`{ result: "OK" }`|yellow-bold>'), async () => {
		const response = await app.get('/get');
		expect(response.body.result).toEqual('OK');
	});

	// Test Controller with middleware:
	test(hld('- Checking the Api Decorator. Should return <`{ result: "API OK" }`|yellow-bold>'), async () => {
		const response = await app.get('/api/get');
		expect(response.body.result).toEqual('API OK');
	});
});