import { config } from '../modules/config';

/**
 * Declare the controller or the http method of the controller as part of the Api.
 */
export function Api () {
	return (target: any, name?: string, descriptor?: PropertyDescriptor): void => {
		const controller = target.constructor;
		if (descriptor?.value) {
			config.storage.setIsApi({ target: 'http-method', controller, httpMethod: descriptor?.value });
		} else {
			config.storage.setIsApi({ target: 'controller', controller: target });
		}
	};
}