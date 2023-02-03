import { setController }        from './repository';
import type { ClassController } from '../types/controller';

/**
 * Create a wash down of controller data
 * @param url - Route URL.
 **/
export function Controller (url: string): ClassDecorator
{
	return function (controller: ClassController | Function): void
	{
		controller.prototype._routerURL = url;
		setController(controller as ClassController, {
			controller  : controller as ClassController,
			middlewares : [],
			url,
		});
	};
}