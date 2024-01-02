import { $, hl, hld } from '../../utils';

let config = { ...$.config };

describe(hl('Testing config methods. Using config.lock and config.set.'), () => {
	// Unfreeze config object:
	beforeEach(() => config = { ...$.config });

	// Test `config.lock`:
	describe(hl('- <config.lock:|underline-bold> Testing the config.lock method:'), () => {
		// Checking the method for freezing the config:
		test(hld('After calling this method, the config becomes read-only.'), () => {
			config.lock();
			expect(() => config.prefixApi = '/my-api/').toThrow(TypeError);
		});
	});

	// Test `config.set`:
	describe(hl('- <config.set:|underline-bold> Testing the config.set method:'), () => {
		// Checking the method for configuring the config:
		test(hld('The method will set the config parameters.'), () => {
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

		test(hld('The config methods not specified remain unchanged.'), () => {
			class MyStorage extends $.Storage {};
			const myPlugin = new $.Plugin();

			config.set({
				storage: new MyStorage(),
				plugins: [ myPlugin ],
			});

			expect(config.prefixApi).toBe('/api');
		});

		test(hld('After calling the method, the config should be read-only.'), () => {
			config.set({});
			expect(() => config.prefixApi = '/my-api/').toThrow(TypeError);
		});
	});
});