import { config } from '../modules/config';
import type { Http } from '../types/common/common-http';
import type { EntityController } from '../types/entities/entity-controller';
import type { EntityHttpMethod } from '../types/entities/entity-http-method';

/**
 * Produce a decorator function with the specified HTTP method.
 * @param method - HTTP method.
 **/
export function factoryMethodDecorator (method: string) {
	return (path: string) => {
		return (target: any, name: string, descriptor: PropertyDescriptor) => {
			const controller = target.constructor;
			config.storage.setHttpMethod({ controller, function: descriptor.value, path, method });
		};
	};
}
