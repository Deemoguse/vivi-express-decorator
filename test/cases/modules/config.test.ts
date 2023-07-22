import { $, hl, hld } from '../../utils';

let config = { ...$.config };

// Unfreeze config object:
beforeEach(() => config = { ...$.config });

describe(hl('Testing config methods. Using config.lock and config.set:'), () => {

	test(hld('Testing the config.lock method - after calling this method, the config becomes read-only.'), () => {
		config.lock();
		expect(() => config.prefixApi = '/my-api/').toThrow(TypeError);
	});

	test(hld('Testing the config.set method - the method will set the config parameters.'), () => {
		class MyStorage extends $.Storage {};
		const myPrefixApi = '/my-api';
		const myPlugin = new $.Plugin();

		config.set({
			storage: new MyStorage(),
			prefixApi: myPrefixApi,
			plugins: [ myPlugin ],
		});

		expect(config.storage instanceof MyStorage).toBe(true);
		expect(config.prefixApi).toBe(myPrefixApi);
		expect(config.plugins[0]).toBe(myPlugin);
	});

	test(hld('Testing the config.set method - the config methods not specified remain unchanged.'), () => {
		class MyStorage extends $.Storage {};
		const myPlugin = new $.Plugin();

		config.set({
			storage: new MyStorage(),
			plugins: [ myPlugin ],
		});

		expect(config.prefixApi).toBe('/api');
	});
});