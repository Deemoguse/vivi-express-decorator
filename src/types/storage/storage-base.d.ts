import type { StorageControllersMap } from './storage-controllers-map';
import type { StorageSetApiParams, StorageSetControllerParams, StorageSetHttpMethodParams, StorageSetMiddlewareParams } from './storage-method-params';

/**
 * A set of required fields for storage implementation.
 */
export interface StorageBase {
	storage: StorageControllersMap;
	setIsApi(params: StorageSetApiParams): void;
	setController(params: StorageSetControllerParams): void;
	setHttpMethod(params: StorageSetHttpMethodParams): void;
	setMiddleware(params: StorageSetMiddlewareParams): void;
	removeInactiveControllers(): void;
}