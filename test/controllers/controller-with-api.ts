import * as Decorators from '../../src';

@Decorators.Api()
@Decorators.Controller('/controller-with-api')
export class ControllerWithApi {
	@Decorators.Get('/get-1')
	public async get1 (req: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}

	@Decorators.Get('/get-2')
	public async get2 (req: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}
}

@Decorators.Controller('/controller-with-api-for-http-method')
export class ControllerWithApiForHttpMethod {
	@Decorators.Api()
	@Decorators.Get('/get')
	public async withApiGet (req: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}

	@Decorators.Get('/get')
	public async withoutApiGet (req: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}
}