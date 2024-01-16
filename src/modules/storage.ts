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
	public readonly storage: StorageControllersMap = new Map();

	/**
	 * Register a class as a controller.
	 * @param params - Parameters for controller registration.
	 */
	public setController (params: StorageSetControllerParams): void {
		const controllerMeta = this.tryGetOrCreateController(params.controller);
		if (controllerMeta.path) {
			throw new ReferenceError('Error: This class has already been registered');
		}

		controllerMeta.path = params.path;
		controllerMeta.isActive = true;
	}

	/**
	 * Register a class method as an HTTP controller method.
	 * @param params - Parameters for HTTP method registration.
	 */
	public setHttpMethod (params: StorageSetHttpMethodParams): void {
		const controllerMeta = this.tryGetOrCreateController(params.controller);
		const httpMethodMeta = this.tryGetOrCreateHttpMethod(controllerMeta.controller, params.method);

		if (httpMethodMeta.path && httpMethodMeta.httpMethod) {
			throw new ReferenceError('Error: This method has already been registered');
		}

		httpMethodMeta.path = params.path;
		httpMethodMeta.httpMethod = params.httpMethod;
		httpMethodMeta.isActive = true;
	}

	/**
	 * Add middleware for the controller or HTTP controller method.
	 * @param params - Parameters required to add middleware.
	 */
	public setMiddleware (params: StorageSetMiddlewareParams): void {
		const entity = this.tryGetOrCreateEntity(params.target, params.controller, params.method);

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
		const entity = this.tryGetOrCreateEntity(params.target, params.controller, params.method);
		entity.isApi = true;
	}

	/**
	 * The module should have a default export
	 */
	public removeInactiveControllers (): void {
		for (const controller of this.storage.keys()) {
			if (!this.storage.get(controller)?.isActive) {
				this.storage.delete(controller);
			}
		}
	}

	/**
	 * Get or create a controller metadata.
	 * @param controller - The class to register as a controller.
	 * @returns The controller metadata.
	 */
	protected tryGetOrCreateController (controller: EntityController): MetaController {
		if (!this.storage.has(controller)) {
			const baseController = Object.getPrototypeOf(controller);
			const controllerMeta = this.storage.has(baseController)
				? this.createControllerMetaObjectWithInheritHttpMethods(controller, baseController)
				: this.createBaseControllerMetaObject(controller);

			this.storage.set(controller, controllerMeta);
		}

		return this.storage.get(controller)!;
	}

	/**
	 * Get or create an HTTP method metadata.
	 * @param controller - A class that is registered as a controller.
	 * @param httpMethod - The method of the class that should be registered as a controller method.
	 * @returns The HTTP method metadata.
	 */
	protected tryGetOrCreateHttpMethod (
		controller: EntityController,
		httpMethod: EntityHttpMethod,
	): MetaHttpMethod {
		const controllerMeta = this.tryGetOrCreateController(controller);
		const httpMethodMeta = this.createBaseHttpMethodMetaObject(httpMethod);

		if (!controllerMeta.httpMethods.has(httpMethod)) {
			controllerMeta.httpMethods.set(httpMethod, httpMethodMeta);
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
	protected tryGetOrCreateEntity (
		target: StorageEntityTypes,
		controller: EntityController,
		httpMethod?: EntityHttpMethod,
	): MetaController | MetaHttpMethod {
		return target === 'http-method'
			? this.tryGetOrCreateHttpMethod(controller, httpMethod!)
			: this.tryGetOrCreateController(controller);
	}

	/**
	 * Create base controller metadata.
	 * @param controller - Origin controller class.
	 */
	protected createBaseControllerMetaObject (controller: EntityController): MetaController {
		return {
			isActive: false,
			isApi: false,
			path: undefined,
			controller,
			httpMethods: new Map(),
			middlewares: [],
		};
	}

	/**
	 * Create a controller metadata object with the inherited metadata of the HTTP methods of the base controller class.
	 * @param controller - Origin controller class.
	 * @param baseController - Base controller class.
	 * @returns
	 */
	protected createControllerMetaObjectWithInheritHttpMethods (
		controller: EntityController,
		baseController: EntityController,
	): MetaController {
		const controllerMeta = this.createBaseControllerMetaObject(controller);
		const baseControllerMeta = this.tryGetOrCreateController(baseController);

		// Inherit HTTP method metadata:
		controllerMeta.httpMethods = new Map(baseControllerMeta.httpMethods);

		return controllerMeta;
	}

	/**
	 * Create base HTTP method metadata.
	 * @param controller - Origin controller class.
	 */
	private _createBaseHttpMethodMetaObject (httpMethod: EntityHttpMethod): MetaHttpMethod {
		return {
			isActive: false,
			isApi: false,
			path: undefined,
			method: httpMethod,
			httpMethod: undefined,
			middlewares: [],
		};
	}
}