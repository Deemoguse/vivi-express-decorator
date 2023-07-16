import { config } from '../modules/config';
import { pluginEventCaller } from './plugin-event-caller';
import type { Http } from '../types/common/common-http';
import type { StorageSetHttpMethodParams } from '../types/storage/storage-method-params';

/**
 * Produce a decorator function with the specified HTTP method.
 * @param method - HTTP method.
 **/
export function factoryMethodDecorator (method: Http) {
	return (path: string) => {
		if (typeof path !== 'string') {
			throw new TypeError ('Error: the `path` argument must be a string');
		}

		return (target: any, name: string, descriptor: PropertyDescriptor) => {
			const params: StorageSetHttpMethodParams = { controller: target.constructor, function: descriptor.value, path, method };
			pluginEventCaller('set-http-method:before', { storage: config.storage, params });
			config.storage.setHttpMethod(params);
			pluginEventCaller('set-http-method:after', { storage: config.storage });
		};
	};
}
