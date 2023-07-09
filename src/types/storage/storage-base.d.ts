import type { StorageControllersMap } from "./storage-controllers-map";

/**
 * A set of required fields for storage implementation.
 */
export interface StorageBase {
	storage: StorageControllersMap;
	setIsApi(...args: any[]): void;
	setController(...args: any[]): void;
	setHttpMethod(...args: any[]): void;
	setMiddleware(...args: any[]): void;
}