import { config } from '../modules/config';
import type { EntityController } from '../types/entities/entity-controller';
import type { EntityMiddleware } from '../types/entities/entity-middleware';

/**
 * Adding middleware for the controller or HTTP controller method.
 * @param path - route path.
 */
export function Middleware (middleware: EntityMiddleware | EntityMiddleware[]) {
	return (target: any, _?: any, descriptor?: PropertyDescriptor): void => {
		const controller = target.constructor;
		if (descriptor?.value) {
			config.storage.setMiddleware({ target: 'http-method', controller, httpMethod: descriptor?.value, middleware });
		} else {
			config.storage.setMiddleware({ target: 'controller', controller: target, middleware });
		}
	};
}