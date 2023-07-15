import { config } from '../modules/config';
import type { PluginEventMap, PluginEventNames } from '../types/plugin/plugin-events-map';

/**
 * Call event functions of all declared plugins
 * @param event - Event name.
 * @param params - Event params.
 */
export function pluginEventCaller<T extends PluginEventNames> (event: T, params: PluginEventMap[T]): void {
	const events = config.plugins.flatMap(plugin => plugin.callEvent);
	events.forEach(cb => cb(event, params));
}