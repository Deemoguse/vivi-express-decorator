import * as Decorators from '../../src';

// number of middleware calls:
export let middlewareСallsNumber = 0;

// Sequence of application of decorators:
export const sequence = [ '@Api > @Middleware > @Get', '@Get > @Api > @Middleware', '@Middleware > @Get > @Api', '@Middleware > @Api > @Get', '@Api > @Get > @Middleware', '@Api > @Middleware > @Get' ];

@Decorators.Controller('/')
export class СontrollerDecoratorsInDifferentSequence {

	@Decorators.Api()
	@Decorators.Middleware((res, req, next) => { middlewareСallsNumber += 1; next() })
	@Decorators.Get('/0')
	public async method1(_: any, res: Decorators.Response) {
		res.send({ value: 'ok' });
	}

	@Decorators.Get('/1')
	@Decorators.Api()
	@Decorators.Middleware((res, req, next) => { middlewareСallsNumber += 1; next() })
	public async method2 (_: any, res: Decorators.Response) {
	  res.send({ value: 'ok' });
	}

	@Decorators.Middleware((res, req, next) => { middlewareСallsNumber += 1; next() })
	@Decorators.Get('/2')
	@Decorators.Api()
	public async method3 (_: any, res: Decorators.Response) {
	  res.send({ value: 'ok' });
	}

	@Decorators.Middleware((res, req, next) => { middlewareСallsNumber += 1; next() })
	@Decorators.Api()
	@Decorators.Get('/3')
	public async method4 (_: any, res: Decorators.Response) {
	  res.send({ value: 'ok' });
	}

	@Decorators.Api()
	@Decorators.Get('/4')
	@Decorators.Middleware((res, req, next) => { middlewareСallsNumber += 1; next() })
	public async method5 (_: any, res: Decorators.Response) {
	  res.send({ value: 'ok' });
	}

	@Decorators.Api()
	@Decorators.Middleware((res, req, next) => { middlewareСallsNumber += 1; next() })
	@Decorators.Get('/5')
	public async method6 (_: any, res: Decorators.Response) {
	  res.send({ value: 'ok' });
	}
}