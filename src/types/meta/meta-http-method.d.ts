import type { Meta } from './meta';
import type { CommonHttp } from '../common/common-http';
import type { EntityHttpMethod } from '../entities/entity-http-method';

/**
 * Interface describing the controller method.
 */
export interface MetaHttpMethod extends Meta {
	/** Controller method function. */
	function: EntityHttpMethod,

	/** Method. */
	method?: CommonHttp,
}