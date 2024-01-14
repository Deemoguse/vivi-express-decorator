import type { MetaController } from '../meta/meta-controller';
import type { MetaHttpMethod } from '../meta/meta-http-method';
import type { EntityMiddleware } from '../entities/entity-middleware';

/**
 * Types of entities to which class properties can be accessed.
 */
export type StorageEntityTypes =
	| 'http-method'
	| 'controller'
	;

/**
 * Parameters required to register a class as a controller.
 */
export type StorageSetControllerParams =
	| Pick<MetaController, 'controller' | 'path'>
	;

/**
 * Parameters required to register a class method as a controller method.
 */
export type StorageSetHttpMethodParams =
	| Pick<MetaController, 'controller'>
	& Required<Pick<MetaHttpMethod, 'httpMethod' | 'path' | 'method'>>
	;

/**
 * Parameters required to register a middleware.
 */
export type StorageSetMiddlewareParams =
	| { readonly target: 'http-method' | 'controller' }
	& { readonly middleware: EntityMiddleware | EntityMiddleware[] }
	& { readonly controller: MetaController['controller'] }
	& { readonly method?: MetaHttpMethod['method'] }
	;

/**
 * Parameters required to declare the router as part of the Api.
 */
export type StorageSetApiParams =
	| { readonly target: 'http-method' | 'controller' }
	& { readonly controller: MetaController['controller'] }
	& { readonly method?: MetaHttpMethod['method'] }
	;