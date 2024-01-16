import { $, hl, hld } from '../../utils';

class MyController { constructor () {}; method () {}}
class OtherController { constructor () {}; method () {}}
const fieldsAndMethods = [ 'storage', 'setIsApi', 'setMiddleware', 'setController', 'setHttpMethod' ] as const;

const getRegisteredControllerMeta = (storage: $.Storage) => storage.storage.get(MyController);
const getRegisteredHttpMethodMeta = (storage: $.Storage) => getRegisteredControllerMeta(storage)?.httpMethods.get(MyController.prototype.method);

// This test verifies the supplied metadata storage class:
describe(hl('The Storage contains all required methods and fields. Using Storage class.'), () => {

	// Checking the fields of the supplied metadata storage implementation:
	describe(hl('- Checking methods and fields of a class:'), () => {
		const storage = new $.Storage();

		// Test fields:
		fieldsAndMethods.forEach(key => {
			test(hld(`The Storage contains the ${key}.`), () => {
				expect(!!storage[key]).toBe(true);
			});
		});

		// Teste `storage` field:
		test(hld('Storage.storage must be a Map instance.'), () => {
			expect(storage.storage instanceof Map).toBe(true);
		});
	});

	// This test verifies the supplied metadata storage class:
	describe(hl('- <Controller:|underline-bold> Checking the setController method:'), () => {
		const storage = new $.Storage();

		storage.setController({ controller: MyController, path: '/' });
		const registeredControllerMeta = getRegisteredControllerMeta(storage)!;

		test(hld('When passing a new class, it must be registered as a controller.'), () => {
			expect(registeredControllerMeta).not.toBeUndefined();
		});
	});

	// This test verifies the supplied metadata storage class:
	describe(hl('- <Controller:|underline-bold> When extending a class, decorators are inherited properly:'), () => {
		const testInheritHttpMethods = (registerBaseClass?: boolean, testRegistrationOfExtendedController?: boolean) => {
			const storage = new $.Storage();
			const middleware = () => {};

			// Create extend class:
			class ExtendedClass extends MyController {};

			// Register middleware:
			if (registerBaseClass) {
				storage.setController({ controller: MyController, path: '/base' });
			}
			storage.setMiddleware({
				target: 'http-method',
				controller: MyController,
				method: MyController.prototype.method,
				middleware: middleware,
			});


			if (testRegistrationOfExtendedController) {
				// Get meta of controllers:
				const extendedControllerMeta = storage.storage.get(ExtendedClass)!;
				expect(extendedControllerMeta).toBeUndefined();
			}
			else {
				storage.setController({ controller: ExtendedClass, path: '/extended' });

				// Get meta of controllers:
				const extendedControllerMeta = storage.storage.get(ExtendedClass)!;
				const myControllerMeta = getRegisteredControllerMeta(storage)!;
				const myControllerHttpMethodMeta = getRegisteredHttpMethodMeta(storage)!;
				const extendedControllerHttpMethodMeta = storage.storage.get(ExtendedClass)!.httpMethods.get(ExtendedClass.prototype.method)!;

				// Test inherit HTTP methods:
				expect(myControllerMeta.httpMethods.entries()).toEqual(extendedControllerMeta.httpMethods.entries());

				// Test middleware functions:
				expect(myControllerHttpMethodMeta.middlewares[0]).not.toBeUndefined();
				expect(extendedControllerHttpMethodMeta.middlewares[0]).not.toBeUndefined();
				expect(myControllerHttpMethodMeta.middlewares[0]).toStrictEqual(extendedControllerHttpMethodMeta.middlewares[0]);
			}
		};

		test(hld('The extended controller class should not register as a controller.'), () => {
			testInheritHttpMethods(false, true);
		});

		test(hld('Extension of a class registered as a controller.'), () => {
			testInheritHttpMethods(true);
		});

		test(hld('Method decorators must inherit from a class that is not registered as a controller.'), () => {
			testInheritHttpMethods();
		});
	});

	// This test verifies the supplied metadata storage class:
	describe(hl('- <Controller:|underline-bold> An attempt to re-register the class should throw an error:'), () => {
		test('Re-registration, but the parameters match.', () => {
			const storage = new $.Storage();

			expect(() => {
				// Register class:
				storage.setController({ controller: MyController, path: '/' });

				// Re-register class:
				storage.setController({ controller: MyController, path: '/' });
			}).toThrow(Error);
		});

		test('Re-registration, but the parameters are different.', () => {
			const storage = new $.Storage();

			expect(() => {
				// Register class:
				storage.setController({ controller: MyController, path: '/' });

				// Re-register class:
				storage.setController({ controller: MyController, path: '/foo' });
			}).toThrow(Error);
		});
	});

	// A set of metadata data specific to each method call:
	([ 'setIsApi', 'setMiddleware', 'setHttpMethod' ] as const).forEach(method => {
		describe(hl(`- <Controller:|underline-bold> Checking that ${method} register the class as a controller, if this has not happened before:`), () => {
			const storage = new $.Storage();
			const middleware = () => {};

			// Call method:
			storage[method]({
				target: 'controller',
				controller: MyController,
				path: '/get',
				httpMethod: 'Get',
				method: MyController.prototype.method,
				middleware: middleware,
			});

			// Get data for test:
			const registeredControllerMeta = getRegisteredControllerMeta(storage)!;

			// Test each fields:
			test(hld('When passing a new class, it must be registered as a controller.'), () => {
				expect(registeredControllerMeta).not.toBeUndefined();
			});
			test(hld('The controller should be <inactive|red-bold>.'), () => {
				expect(registeredControllerMeta.isActive).toBe(false);
			});
			test(hld('The <path|yellow-bold> of the controller must be <undefined|magenta-bold>.'), () => {
				expect(registeredControllerMeta.path).toBeUndefined();
			});

			// Specificity:
			if (method === 'setHttpMethod') {
				test(hld('The <httpMethods|yellow-bold> field of the controller contains the HTTP-method that was registered.'), () => {
					expect(registeredControllerMeta.httpMethods.has(MyController.prototype.method)).toBe(true);
				});
			}
			else if (method === 'setMiddleware') {
				test(hld('The <middlewares|yellow-bold> field of the controller contains the middleware that was registered.'), () => {
					expect(registeredControllerMeta.middlewares).toContain(middleware);
				});
			}
			else if (method === 'setIsApi') {
				test(hld('The <isApi|yellow-bold> field of the controller equal the <true|magenta-bold>.'), () => {
					expect(registeredControllerMeta.isApi).toBe(true);
				});
			}
		});
	});

	// This test verifies the supplied metadata storage class:
	describe(hl('- <Http-Method:|underline-bold> Checking the setHttpMethod method:'), () => {
		const storage = new $.Storage();

		// Register HTTP-method
		storage.setHttpMethod({ controller: MyController, path: '/get', method: MyController.prototype.method, httpMethod: 'Get' });
		const registeredHttpMethodMeta = getRegisteredHttpMethodMeta(storage)!;

		test(hld('When passing a new method, it must be registered as an HTTP method.'), () => {
			expect(registeredHttpMethodMeta).not.toBeUndefined();
		});
	});

	// This test verifies the supplied metadata storage class:
	describe(hl('- <Http-Method:|underline-bold> Registering a method of an unregistered class:'), () => {
		const storage = new $.Storage();

		// Register method:
		storage.setHttpMethod({
			controller: MyController,
			path: '/get',
			httpMethod: 'Get',
			method: MyController.prototype.method,
		});

		// Test class:
		test(hld('The method class was registered as an <inactive|red-bold> controller.'), () => {
			const registeredControllerMeta = getRegisteredControllerMeta(storage)!;
			expect(registeredControllerMeta.isActive).toBe(false);
		});

		// Test method:
		test(hld('The method was registered as an <active|green-bold> HTTP-method of the controller.'), () => {
			const registeredHttpMethodMeta = getRegisteredHttpMethodMeta(storage)!;
			expect(registeredHttpMethodMeta.isActive).toBe(true);
		});
	});

	// This test verifies the supplied metadata storage class:
	describe(hl('- <Http-Method:|underline-bold> An attempt to re-register the method should throw an error:'), () => {
		test('Re-registration, but the parameters match.', () => {
			const storage = new $.Storage();

			expect(() => {
				// Register method:
				storage.setHttpMethod({
					controller: MyController,
					path: '/get',
					httpMethod: 'Get',
					method: MyController.prototype.method,
				});

				// Re-register method:
				storage.setHttpMethod({
					controller: MyController,
					path: '/get',
					httpMethod: 'Get',
					method: MyController.prototype.method,
				});
			}).toThrow(Error);
		});

		test('Re-registration, but the parameters are different.', () => {
			const storage = new $.Storage();

			expect(() => {
				// Register method:
				storage.setHttpMethod({
					controller: MyController,
					path: '/get',
					httpMethod: 'Get',
					method: MyController.prototype.method,
				});

				// Re-register method:
				storage.setHttpMethod({
					controller: MyController,
					path: '/post',
					httpMethod: 'Post',
					method: MyController.prototype.method,
				});
			}).toThrow(Error);
		});
	});

	// A set of metadata data specific to each method call:
	([ 'setIsApi', 'setMiddleware' ] as const).forEach(method => {
		describe(hl(`- <Http-Method:|underline-bold> Сhecking ${method}, register the class method as an HTTP method if it wasn't there before.`), () => {
			const storage = new $.Storage();
			const middleware = () => {};

			// Call method:
			storage[method]({
				target: 'http-method',
				middleware: middleware,
				method: MyController.prototype.method,
				controller: MyController,
			});

			// Get data for test:
			const registeredHttpMethodMeta = getRegisteredHttpMethodMeta(storage)!;

			// Test metadata fields:
			test(hld('When passing a new class, it must be registered as a controller.'), () => {
				expect(registeredHttpMethodMeta).not.toBeUndefined();
			});
			test(hld('The HTTP-method should be <inactive|red-bold>.'), () => {
				expect(registeredHttpMethodMeta.isActive).toBe(false);
			});
			test(hld('The <path|yellow-bold> and <method|yellow-bold> fields of the HTTP-method must be <undefined|magenta-bold>.'), () => {
				expect(registeredHttpMethodMeta.path).toBeUndefined();
				expect(registeredHttpMethodMeta.httpMethod).toBeUndefined();
			});

			// Specificity:
			if (method === 'setMiddleware') {
				test(hld('The <middlewares|yellow-bold> field of the controller contains the middleware that was registered.'), () => {
					expect(registeredHttpMethodMeta.middlewares).toContain(middleware);
				});
			}
			else if (method === 'setIsApi') {
				test(hld('The <isApi|yellow-bold> field of the controller equal the <true|magenta-bold>.'), () => {
					expect(registeredHttpMethodMeta.isApi).toBe(true);
				});
			}
		});
	});

	// A set of metadata data specific to each method call:
	([ 'setIsApi', 'setMiddleware' ] as const).forEach(method => {
		describe(hl(`- <Http-Method:|underline-bold> Checking the ${method} applied to the method, register the class as a controller if it did not exist before.`), () => {
			const storage = new $.Storage();
			const middleware = () => {};

			// Call method:
			storage[method]({
				target: 'http-method',
				middleware: middleware,
				method: MyController.prototype.method,
				controller: MyController,
			});

			// Get data for test:
			const registeredControllerMeta = getRegisteredControllerMeta(storage)!;

			// Test metadata fields:
			test(hld('When passing a new class, it must be registered as a controller.'), () => {
				expect(registeredControllerMeta).not.toBeUndefined();
			});
			test(hld('The HTTP-method should be <inactive|red-bold>.'), () => {
				expect(registeredControllerMeta.isActive).toBe(false);
			});
			test(hld('The <path|yellow-bold> and <method|yellow-bold> fields of the HTTP-method must be <undefined|magenta-bold>.'), () => {
				expect(registeredControllerMeta.path).toBeUndefined();
			});
		});
	});

	// Test `removeInactiveControllers`:
	describe(hl('- Checking <removeInactiveControllers|yellow-bold> method:'), () => {
		const storage = new $.Storage();

		// Registration of the controller directly:
		storage.setController({ controller: MyController, path: '/' });

		// Registration of the controller that will be inactive
		storage.setIsApi({ target: 'controller', controller: OtherController });

		// Remove inactive controllers:
		storage.removeInactiveControllers();

		// Testing:
		test(hld('The <active|green-bold> controller has not been deleted.'), () => {
			expect(storage.storage.has(MyController)).toBe(true);
		});
		test(hld('The <inactive|red-bold> controller has been deleted.'), () => {
			expect(storage.storage.has(OtherController)).toBe(false);
		});
	});
});