import type { MetaController } from '../meta/meta-controller';
import type { EntityController } from '../entities/entity-controller';

/**
 * List of registered controllers.
 */
export type StorageControllersMap =
	| Map<EntityController, MetaController>
	;