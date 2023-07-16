import type { PluginBase } from '../types/plugin/plugin-base';
import type { PluginEventCallback, PluginEventSet } from '../types/plugin/plugin-events';
import type { PluginEventMap, PluginEventNames } from '../types/plugin/plugin-events-map';

/**
 * Create a new plugin for decorators.
 */
export class Plugin<Config extends object = any> implements PluginBase<Config> {
	// Plugin event set:
	private events: PluginEventSet<Config> = {};

	// Plugin config and configuration method:
	public config: Config = {} as Config;
	public configurate (config: Partial<Config>) {
		this.config = config as Config;
		return this;
	};

	/**
	 * Declare an event listener for the plugin
	 * @param event - Event name.
	 * @param cb - Event function.
	 */
	public on<T extends PluginEventNames> (event: T, cb: PluginEventCallback<PluginEventMap[T], Config>): void {
		if (!this.events[event]) this.events[event] = [];
		this.events[event]!.push(cb);
	}

	/**
	 * Call all declared event functions.
	 * @param event - Event name.
	 * @param params - Event params.
	 */
	public callEvent<T extends PluginEventNames> (event: T, params: PluginEventMap[T]): void {
		this.events[event]?.forEach(cb => cb(params, this.config));
	}
}