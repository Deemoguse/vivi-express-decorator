import * as Decorators from '../../src';
import type { EntityMiddleware } from '../../src/types/entities/entity-middleware';

// Purposes:
export let purposeHttpMethod = 0;
export let purposeController = 0;

// Increment of a value for a specific purpose:
function inrementMiddleware (purpose: 'controller' | 'http-method'): EntityMiddleware {
	return (req, res, next) => {
		purpose === 'http-method'
			? purposeHttpMethod += 1
			: purposeController += 1
			;
		next();
	}
};

@Decorators.Controller('/middlewares')
@Decorators.Middleware(inrementMiddleware('controller'))
export class ControllerWithMiddlewares {
	@Decorators.Get('/increment-1')
	public async increment1 (req: any, res: Decorators.Response) {
		res.status(200).send();
	}

	@Decorators.Get('/increment-2')
	@Decorators.Middleware(inrementMiddleware('http-method'))
	public async increment2 (req: any, res: Decorators.Response) {
		res.status(200).send();
	}
}