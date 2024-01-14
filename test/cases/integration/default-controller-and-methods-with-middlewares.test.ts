import { $, createApp, hl, hld } from '../../utils';

let classCount = 0;
let methodCount = 10;
const incrementClassCount = (_req: any, _res: any, next: $.NextFunction) => (classCount += 1, next());
const incrementMethodCount = (_req: any, _res: any, next: $.NextFunction) => (methodCount += 1, next());

@$.Controller('/')
@$.Middleware(incrementClassCount)
class Controller
{
	@$.Get('/get')
	@$.Middleware(incrementMethodCount)
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

		expect(classCount).toEqual(6);
		expect(methodCount).toEqual(16);
	});
});