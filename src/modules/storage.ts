import type { StorageBase } from '../types/storage/storage-base';
import type { MetaController } from '../types/meta/meta-controller';
import type { MetaHttpMethod } from '../types/meta/meta-http-method';
import type { EntityHttpMethod } from '../types/entities/entity-http-method';
import type { EntityController } from '../types/entities/entity-controller';
import type { StorageControllersMap } from '../types/storage/storage-controllers-map';
import type { StorageSetApiParams, StorageSetControllerParams, StorageEntityTypes, StorageSetHttpMethodParams, StorageSetMiddlewareParams } from '../types/storage/storage-method-params';

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
	public setController (params: StorageSetControllerParams): void {
		const controllerMeta = this._tryGetOrCreateController(params.controller);

		if (controllerMeta.path) {
			throw new ReferenceError(`Error: This class has already been registered as controller with "${controllerMeta.path}"`);
		}

		controllerMeta.path = params.path;
		controllerMeta.isActive = true;
	}

	/**
	 * Register a class method as an HTTP controller method.
	 * @param params - Parameters for HTTP method registration.
	 */
	public setHttpMethod (params: StorageSetHttpMethodParams): void {
		const controllerMeta = this._tryGetOrCreateController(params.controller);
		const httpMethodMeta = this._tryGetOrCreateHttpMethod(controllerMeta.controller, params.function);

		if (httpMethodMeta.path && httpMethodMeta.method) {
			throw new ReferenceError(`Error: This method has already been registered as ${httpMethodMeta.method} with "${httpMethodMeta.path}"`);
		}

		httpMethodMeta.path = params.path;
		httpMethodMeta.method = params.method;
		httpMethodMeta.isActive = true;
	}

	/**
	 * Add middleware for the controller or HTTP controller method.
	 * @param params - Parameters required to add middleware.
	 */
	public setMiddleware (params: StorageSetMiddlewareParams): void {
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
	public setIsApi (params: StorageSetApiParams): void {
		const entity = this._tryGetOrCreateEntity(params.target, params.controller, params.httpMethod);
		entity.isApi = true;
	}

	/**
	 * The module should have a default export
	 */
	public removeInactiveControllers (): void {
		Array.from(this.storage.keys()).forEach(controller => {
			if (!this.storage.get(controller)?.isActive) {
				this.storage.delete(controller);
			}
		});
	}

	/**
	 * Get or create a controller metadata.
	 * @param controller - The class to register as a controller.
	 * @returns The controller metadata.
	 */
	private _tryGetOrCreateController (controller: EntityController): MetaController {
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
	 */
	private _tryGetOrCreateHttpMethod (
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
	private _tryGetOrCreateEntity (
		target: StorageEntityTypes,
		controller: EntityController,
		httpMethod?: EntityHttpMethod,
	): MetaController | MetaHttpMethod {
		return target === 'http-method'
			? this._tryGetOrCreateHttpMethod(controller, httpMethod!)
			: this._tryGetOrCreateController(controller);
	}
}