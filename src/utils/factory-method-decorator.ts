import { config } from '../modules/config';
import type { Http } from '../types/common/common-http';
import { pluginEventCaller } from './plugin-event-caller';
import type { StorageSetHttpMethodParams } from '../types/storage/storage-method-params';

/**
 * Produce a decorator function with the specified HTTP method.
 * @param method - HTTP method.
 **/
export function factoryMethodDecorator (method: Http) {
	return (path: string) => {
		return (target: any, name: string, descriptor: PropertyDescriptor) => {
			const params: StorageSetHttpMethodParams = { controller: target.constructor, function: descriptor.value, path, method };
			pluginEventCaller('set-http-method:before', { storage: config.storage, params });
			config.storage.setHttpMethod(params);
			pluginEventCaller('set-http-method:after', { storage: config.storage });
		};
	};
}
