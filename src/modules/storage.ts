import type { StorageBase } from '../types/storage/storage-base';
import type { MetaController } from '../types/meta/meta-controller';
import type { MetaHttpMethod } from '../types/meta/meta-http-method';
import type { EntityHttpMethod } from '../types/entities/entity-http-method';
import type { EntityController } from '../types/entities/entity-controller';
import type { EntityMiddleware } from '../types/entities/entity-middleware';
import type { StorageControllersMap } from '../types/storage/storage-controllers-map';

/**
 * Types of entities to which class properties can be accessed.
 */
export type EntityTypes =
	| 'http-method'
	| 'controller';

/**
 * Parameters required to register a class as a controller.
 */
export type ControllerParams =
	| Pick<MetaController, 'controller' | 'path'>;

/**
 * Parameters required to register a class method as a controller method.
 */
export type HttpMethodParams =
	| Pick<MetaController, 'controller'>
	& Pick<MetaHttpMethod, 'function' | 'path' | 'method'>;

/**
 * Parameters required to register a middleware.
 */
export type MiddlewareParams =
	| { target: 'http-method' | 'controller', middleware: EntityMiddleware | EntityMiddleware[] }
	& { controller: MetaController['controller'] }
	& { httpMethod?: MetaHttpMethod['function'] }

/**
 * Parameters required to declare the router as part of the Api.
 */
export type ApiParams =
	| { target: 'http-method' | 'controller' }
	& { controller: MetaController['controller'] }
	& { httpMethod?: MetaHttpMethod['function'] }

/**
 * Storage for controller metadata.
 */
export class Storage implements StorageBase {
	// Storage for storing controller metadata:
	public storage: StorageControllersMap = new Map();

	/**
	 * Register a class as a controller.
	 * @param params - Parameters for controller registration.
	 */
	public setController(params: ControllerParams): void {
		const controllerMeta = this._tryGetOrCreateController(params.controller);
		controllerMeta.path = params.path;
		controllerMeta.isActive = true;
	}

	/**
	 * Register a class method as an HTTP controller method.
	 * @param params - Parameters for HTTP method registration.
	 */
	public setHttpMethod(params: HttpMethodParams): void {
		const controllerMeta = this._tryGetOrCreateController(params.controller);
		const httpMethodMeta = this._tryGetOrCreateHttpMethod(controllerMeta.controller, params.function);
		httpMethodMeta.path = params.path;
		httpMethodMeta.method = params.method;
		httpMethodMeta.isActive = true;
	}

	/**
	 * Add middleware for the controller or HTTP controller method.
	 * @param params - Parameters required to add middleware.
	 */
	public setMiddleware(params: MiddlewareParams): void {
		const entity = this._tryGetOrCreateEntity(params.target, params.controller, params.httpMethod);

		if (Array.isArray(params.middleware)) {
			entity.middlewares.push(...params.middleware);
		} else {
			entity.middlewares.push(params.middleware);
		}
	}

	/**
	 * Declare the controller or the HTTP method of the controller as part of the API.
	 * @param params - Parameters required to declare the router as part of the API.
	 */
	public setIsApi(params: ApiParams): void {
		const entity = this._tryGetOrCreateEntity(params.target, params.controller, params.httpMethod);
		entity.isApi = true;
	}

	/**
	 * Get or create a controller metadata.
	 * @param controller - The class to register as a controller.
	 * @returns The controller metadata.
	 * @throws ReferenceError if the same class is registered as a controller more than once.
	 */
	private _tryGetOrCreateController(controller: EntityController): MetaController {
		if (!this.storage.has(controller)) {
			this.storage.set(controller, {
				isActive: false,
				isApi: false,
				path: undefined,
				controller,
				httpMethods: new Map(),
				middlewares: [],
			});
		}

		return this.storage.get(controller)!;
	}

	/**
	 * Get or create an HTTP method metadata.
	 * @param controller - A class that is registered as a controller.
	 * @param httpMethod - The method of the class that should be registered as a controller method.
	 * @returns The HTTP method metadata.
	 * @throws ReferenceError if the method is created on a class that is not registered as a controller.
	 */
	private _tryGetOrCreateHttpMethod(
		controller: EntityController,
		httpMethod: EntityHttpMethod,
	): MetaHttpMethod {
		const controllerMeta = this._tryGetOrCreateController(controller);

		if (!controllerMeta.httpMethods.has(httpMethod)) {
			controllerMeta.httpMethods.set(httpMethod, {
				isActive: false,
				isApi: false,
				path: undefined,
				function: httpMethod,
				method: undefined,
				middlewares: [],
			});
		}

		return controllerMeta.httpMethods.get(httpMethod)!;
	}

	/**
	 * Get an entity by type.
	 * @param target - Entity type.
	 * @param controller - Controller class.
	 * @param httpMethod - HTTP controller method.
	 * @returns The entity metadata.
	 */
	private _tryGetOrCreateEntity(
		target: EntityTypes,
		controller: EntityController,
		httpMethod?: EntityHttpMethod,
	): MetaController | MetaHttpMethod {
		return target === 'http-method'
			? this._tryGetOrCreateHttpMethod(controller, httpMethod!)
			: this._tryGetOrCreateController(controller);
	}
}