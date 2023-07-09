import { config } from '../modules/config';
import type { EntityController } from '../types/entities/entity-controller';

/**
 * Registering a class as a controller.
 * @param path - route path.
 */
export function Controller (path: string) {
	return (controller: EntityController): void => {
		config.storage.setController({ path, controller });
	};
}