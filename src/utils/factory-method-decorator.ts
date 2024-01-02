import { config } from '../modules/config';
import { pluginEventCaller } from './plugin-event-caller';
import type { CommonHttp } from '../types/common/common-http';
import type { StorageSetHttpMethodParams } from '../types/storage/storage-method-params';

/**
 * Produce a decorator function with the specified HTTP method.
 * @param method - HTTP method.
 * @throws {TypeError} The `path` is not a string.
 **/
export function factoryMethodDecorator (method: CommonHttp) {
	return (path: string) => {
		return (target: any, _name: string, descriptor: PropertyDescriptor) => {
			const params: StorageSetHttpMethodParams = { controller: target.constructor, function: descriptor.value, path, method };
			pluginEventCaller('set-http-method:before', { storage: config.storage, params });
			config.storage.setHttpMethod(params);
			pluginEventCaller('set-http-method:after', { storage: config.storage });
		};
	};
}
