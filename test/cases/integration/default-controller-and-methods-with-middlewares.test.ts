import { $, createApp, hl, hld } from '../../utils';

@$.Controller('/')
@$.Middleware(Controller._incrementClassCount)
class Controller
{
	public static classCount = 0;
	public static methodCount = 10;

	private static _incrementClassCount (_req: any, _res: any, next: $.NextFunction) {
		Controller.classCount += 1; next();
	}
	private static _incrementMethodCount (_req: any, _res: any, next: $.NextFunction) {
		Controller.methodCount += 1; next();
	}

	@$.Get('/get')
	@$.Middleware(Controller._incrementMethodCount)
	public get (_: any, res: $.Response) { res.status(200).send({ result: 'OK' }); }
}

describe(hl('Test request to the HTTP methods. Use @Controller, @Get & @Middleware decorators:'), () => {

	// Test Controller with middleware:
	test(hld('- Checking the controller and method with middlewares. The counters must be equal to <6|green-bold> and <16|green-bold>'), async () => {
		// Create app with controller:
		const app = createApp([ Controller ]);
		const promises = Array(6).fill(() => app.get('/get'));

		//	Increment counts:
		await Promise.all(promises.map((el) => el()));

		expect(Controller.classCount).toEqual(6);
		expect(Controller.methodCount).toEqual(16);
	});
});