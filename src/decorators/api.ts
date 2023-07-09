import { config } from '../modules/config';
import type { EntityController } from '../types/entities/entity-controller';

/**
 * Declare the controller or the http method of the controller as part of the Api.
 * @param path - route path.
 */
export function Api () {
	return (target: any, _?: any, descriptor?: PropertyDescriptor): void => {
		const controller = target.constructor;
		if (descriptor?.value) {
			config.storage.setIsApi({ target: 'http-method', controller, httpMethod: descriptor?.value });
		} else {
			config.storage.setIsApi({ target: 'controller', controller: target });
		}
	};
}