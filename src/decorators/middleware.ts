import { config } from '../modules/config';
import { pluginEventCaller } from '../utils/plugin-event-caller';
import type { EntityMiddleware } from '../types/entities/entity-middleware';
import type { StorageSetMiddlewareParams } from '../types/storage/storage-method-params';

/**
 * Adding middleware for the controller or HTTP controller method.
 */
export function Middleware (middleware: EntityMiddleware | EntityMiddleware[]) {
	return (target: any, name?: string, descriptor?: PropertyDescriptor): void => {
		const controller = target.constructor;

		if (descriptor?.value) {
			const params: StorageSetMiddlewareParams = { target: 'http-method', controller, httpMethod: descriptor?.value, middleware };
			pluginEventCaller('set-middleware:before', { storage: config.storage, params });
			config.storage.setMiddleware(params);
			pluginEventCaller('set-middleware:after', { storage: config.storage });
		}
		else {
			const params: StorageSetMiddlewareParams = { target: 'controller', controller: target, middleware };
			pluginEventCaller('set-middleware:before', { storage: config.storage, params });
			config.storage.setMiddleware(params);
			pluginEventCaller('set-middleware:after', { storage: config.storage });
		}
	};
}