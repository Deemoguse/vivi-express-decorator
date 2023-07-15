import { EntityMiddleware } from '../entities/entity-middleware';

/**
 * Interface describing the metadata.
 */
export interface Meta {
	/** Is active */
	isActive: boolean,

	/** This method is registered as API. */
	isApi?: boolean,

	/** Method Route. */
	path?: string,

	/** A set of middleware. */
	middlewares: Array<EntityMiddleware>,
}