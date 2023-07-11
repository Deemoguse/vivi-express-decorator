import { config } from '../modules/config';

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
