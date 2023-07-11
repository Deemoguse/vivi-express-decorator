import { config } from '../modules/config';
import type { EntityMiddleware } from '../types/entities/entity-middleware';

/**
 * Adding middleware for the controller or HTTP controller method.
 */
export function Middleware (middleware: EntityMiddleware | EntityMiddleware[]) {
	return (target: any, name?: string, descriptor?: PropertyDescriptor): void => {
		const controller = target.constructor;
		if (descriptor?.value) {
			config.storage.setMiddleware({ target: 'http-method', controller, httpMethod: descriptor?.value, middleware });
		} else {
			config.storage.setMiddleware({ target: 'controller', controller: target, middleware });
		}
	};
}