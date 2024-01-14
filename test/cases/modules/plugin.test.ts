import Express from 'express';
import { $, hl, hld } from '../../utils';

describe(hl('Testing Plugin class. Using <express|magenta-bold>, Plugin, Storage:'), () => {
	const app = Express();
	const plugin = new $.Plugin();
	const storage = new $.Storage();

	test(hld('Should correctly configure plugin.'), () => {
		const config = { key: 'value' };
		plugin.configurate(config);
		expect(plugin.config).toEqual(config);
	});

	test(hld('should correctly call event listeners.'), () => {
		const mockListener = jest.fn();
		const eventName: keyof $.PluginEventMap = 'attach-controller:after';
		const eventParams: $.PluginEventMap[typeof eventName] = { app, storage };

		plugin.on(eventName, mockListener);
		plugin.callEvent(eventName, { app, storage });

		expect(mockListener).toHaveBeenCalledWith(eventParams, plugin.config);
	});
});