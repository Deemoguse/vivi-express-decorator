import type { PluginEventMap, PluginEventNames } from './plugin-events-map';

/**
 * Event callback function.
 */
export type PluginEventCallback<Params, Config = any> =
	| ((params: Params, pluginConfig: Config) => void)
	;

/**
 * Array of event callback functions.
 */
export type PluginEventCallbackSet<T extends PluginEventNames, Config = any> =
	| Array<PluginEventCallback<PluginEventMap[T], Config>>
	;

/**
 * The type of object where the key is the name of the event,
 * and the value is an array of its callback functions.
 */
export type PluginEventSet<Config = any> =
	| { [K in PluginEventNames]?: PluginEventCallbackSet<K, Config> }
	;