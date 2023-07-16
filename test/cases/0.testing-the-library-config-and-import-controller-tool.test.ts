import Express from 'express';
import assert from 'assert';
import request from 'supertest';
import * as Decorators from '../../src';
import { hl, hld } from '../utils/highlight';
import createApp from '../utils/create-app';
import { CustomPlugin } from '../plugins/custom-plugin';

// Testing:
describe(hl('Testing of auxiliary modules. Using config.set, config.lock and ImportControllers'), () => {
	let app: Express.Application;

	// The method should overwrite the specified properties:
	it(hld('Testing config.set. The method should overwrite the specified properties.'), () => {
		Decorators.config.set({
			prefixApi: '/my/api/',
			plugins: [ new CustomPlugin() ],
		});

		assert.equal(Decorators.config.prefixApi, '/my/api/');
		assert.equal(Decorators.config.plugins.length, 1);
		assert.equal(Decorators.config.storage instanceof Decorators.Storage, true);
	});

	// The config.lock method should be called inside config.set:
	it(hld('Testing config.lock. The config must be immutable.'), () => {
		assert.throws(() => Decorators.config.prefixApi = '/some/api/', { name: 'TypeError' });
	});

	// Testing ImportControllers. Modules must be imported:
	it(hld('Testing ImportControllers for importing controllers according to a given pattern.'), async () => {
		const controllers = await Decorators.ImportControllers('./test/controllers/controller-as-default.ts');

		assert.equal(controllers.length, 1);
		assert.doesNotThrow(() => app = createApp(controllers), { name: 'TypeError' });
	});

	it(hld('The modified prefixApi is working correctly.'), async () => {
		const response = await request(app).get('/my/api/0');

		assert.equal(response.statusCode, 200);
		assert.equal(response.body.value, 'ok');
	})
});