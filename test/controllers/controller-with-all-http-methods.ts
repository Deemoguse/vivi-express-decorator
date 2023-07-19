import * as Decorators from '../../src';

@Decorators.Controller('/')
export class ControllerWithAlHttpMethods {
	static methods = [ 'get', 'post', 'patch', 'put', 'head', 'delete', 'options', 'trace' ] as const;

	@Decorators.Get('/get')
	public async get(_: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}

	@Decorators.Post('/post')
	public async post(_: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}

	@Decorators.Patch('/patch')
	public async patch(_: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}

	@Decorators.Put('/put')
	public async put(_: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}

	@Decorators.Head('/head')
	public async head(_: any, res: Decorators.Response) {
		res.status(200).send();
	}

	@Decorators.Delete('/delete')
	public async delete(_: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}

	@Decorators.Options('/options')
	public async options(_: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}

	@Decorators.Trace('/trace')
	public async trace(_: any, res: Decorators.Response) {
		res.status(200).send({ value: 'ok' });
	}
}