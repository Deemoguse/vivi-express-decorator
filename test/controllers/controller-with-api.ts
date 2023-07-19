import * as Decorators from '../../src';

@Decorators.Controller('/')
export class ControllerWithApiForHttpMethod {
	@Decorators.Api()
	@Decorators.Get('/get-1')
	public async withApiGet (_: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}

	@Decorators.Get('/get-2')
	public async withoutApiGet (_: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}
}

@Decorators.Api()
@Decorators.Controller('/')
export class ControllerWithApi {
	@Decorators.Get('/get-1')
	public async get1 (_: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}

	@Decorators.Get('/get-2')
	public async get2 (_: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}
}