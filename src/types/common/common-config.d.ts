import type { StorageBase } from '../storage/storage-base';

export interface CommonConfig {
	/**
	 * A static class that implements metadata {@link Storage} logic.
	 * @default Storage
	 */
	storage: StorageBase,

	/**
	 * The prefix by which the path of the controller method will be modified.
	 * @default '/api'
	 */
	prefixApi: string,

	/**
	 * The prefix by which the path of the controller method will be modified.
	 * @default '/api'
	 * @deprecated
	 */
	apiURL?: string,
}