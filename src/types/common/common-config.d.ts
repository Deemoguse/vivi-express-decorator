import type { PluginBase } from '../plugin/plugin-base';
import type { StorageBase } from '../storage/storage-base';
import type { SupportStageProposal } from '../support/support-stage-proposal';

/**
 * Configuration parameters for the 'set` method.
 */
export type CommonSetConfigOption =
	| Partial<Omit<CommonConfig, 'set' | 'lock'>>
	;

export interface CommonConfig {
	/**
	 * Which Stage Proposal should be use:
	 *
	 * - `'auto'` - Automatic detection of the current Decorator Stage Proposal.
	 * - `2` - Use Decorator **_Stage 2_** Proposal.
	 * - `3` - Use Decorator **_Stage 3_** Proposal.
	 *
	 * @default 'auto'
	 */
	support: SupportStageProposal,

	/**
	 * A static class that implements metadata {@link Storage} logic.
	 * @default StorageBase
	 */
	storage: StorageBase,

	/**
	 * The prefix by which the path of the controller method will be modified.
	 * @default '/api'
	 */
	prefixApi: string,

	/**
	 * A set of plugins, plugin events will be called in the order they are declared.
	 */
	plugins: PluginBase[],

	/**
	 * Lock the configuration and make it read-only.
	 * Use this to prevent accidental configuration editing.
	 * @readonly
	 */
	readonly lock: () => void,

	/**
	 * Set config parameters.
	 * After using this method, the configuration object will become read-only.
	 * @param config - Config params.
	 * @readonly
	 */
	readonly set: (config: CommonSetConfigOption) => void,
}