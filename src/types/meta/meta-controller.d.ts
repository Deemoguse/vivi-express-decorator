import type { Meta } from './meta';
import type { MetaHttpMethod } from './meta-http-method';
import type { EntityHttpMethod } from '../entities/entity-http-method';
import type { EntityController } from '../entities/entity-controller';

/**
 * Interface describing the controller.
 */
export interface MetaController extends Meta {
	/** Controller. */
	controller: EntityController,

	/** Controller Methods. */
	httpMethods: Map<EntityHttpMethod, MetaHttpMethod>
}