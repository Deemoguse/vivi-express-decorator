import * as Decorators from '../../src';
import { PluginEventNames } from '../../src/types/plugin/plugin-events-map';

// Interface for testing configuration:
interface CustomPluginOption {
	value1: number,
	value2: string,
}

// All plugin event names:
export const eventNames: PluginEventNames[] = [
	'attach-controller:after',
	'attach-controller:before',
	'attach-http-method:after',
	'attach-http-method:before',
	'attach:end',
	'attach:start',
	'set-api:after',
	'set-api:before',
	'set-controller:after',
	'set-controller:before',
	'set-http-method:after',
	'set-http-method:before',
	'set-middleware:after',
	'set-middleware:before',
];

// A class for testing events:
export class CustomPlugin extends Decorators.Plugin<CustomPluginOption> {
	public static values: Partial<Record<PluginEventNames, true | undefined>> = {};

	constructor () {
		super();

		// Set default config values:
		this.config = {
			value1: 0,
			value2: '0',
		};

		// Define events:
		eventNames.forEach(name => this.on(name, () => CustomPlugin.values[name] = true));
	}
}