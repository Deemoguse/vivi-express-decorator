import { config } from '../modules/config';
import { pluginEventCaller } from '../utils/plugin-event-caller';
import type { EntityController } from '../types/entities/entity-controller';
import type { StorageSetControllerParams } from '../types/storage/storage-method-params';

/**
 * Registering a class as a controller.
 * @param path - route path.
 */
export function Controller (path: string) {
	return (controller: EntityController): void => {
		const params: StorageSetControllerParams = { path, controller };
		pluginEventCaller('set-controller:before', { storage: config.storage, params });
		config.storage.setController(params);
		pluginEventCaller('set-controller:after', { storage: config.storage });
	};
}