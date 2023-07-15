import { PluginEventMap, PluginEventNames } from "./plugin-events-map";

/**
 * Event callback function.
 */
export type PluginEventCallback<Params, Config> =
	| ((params: Params, config: Config) => void)
	;

/**
 * Array of event callback functions.
 */
export type PluginEventCallbackSet<T extends PluginEventNames, Config> =
	| Array<PluginEventCallback<PluginEventMap[T], Config>>
	;

/**
 * The type of object where the key is the name of the event,
 * and the value is an array of its callback functions.
 */
export type PluginEventSet<Config> =
	| { [K in PluginEventNames]?: PluginEventCallbackSet<K, Config> }
	;