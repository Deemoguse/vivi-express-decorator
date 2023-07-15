import { config } from '../modules/config';
import { pluginEventCaller } from '../utils/plugin-event-caller';
import type { StorageSetApiParams } from '../types/storage/storage-method-params';

/**
 * Declare the controller or the http method of the controller as part of the Api.
 */
export function Api () {
	return (target: any, name?: string, descriptor?: PropertyDescriptor): void => {
		const controller = target.constructor;

		if (descriptor?.value) {
			const params: StorageSetApiParams = { target: 'http-method', controller, httpMethod: descriptor?.value };
			pluginEventCaller('set-api:before', { storage: config.storage, params });
			config.storage.setIsApi(params);
			pluginEventCaller('set-api:after', { storage: config.storage });
		}
		else {
			const params: StorageSetApiParams = { target: 'controller', controller: target };
			pluginEventCaller('set-api:before', { storage: config.storage, params });
			config.storage.setIsApi(params);
			pluginEventCaller('set-api:after', { storage: config.storage });
		}
	};
}