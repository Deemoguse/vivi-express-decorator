import Express from 'express';
import { config } from './config';
import { fixPath } from '../utils/fix-path';
import { pluginEventCaller } from '../utils/plugin-event-caller';
import type { Http } from '../types/common/common-http';
import type { EntityController } from '../types/entities/entity-controller';

/**
 * Attaching controllers to an Express application instance.
 * @param app - Express application instance.
 * @param controllers - Controllers.
 * @throws ReferenceError
 */
export function AttachControllers (app: Express.Application, controllers: EntityController[]): void {
	const storage = config.storage.storage;
	const apiRouter = Express.Router();

	// Call attach start event:
	pluginEventCaller('attach:start', { app, storage: config.storage });

	// A loop that attaches each transmitted controller:
	for (const Controller of controllers) {
		const controllerMeta = storage.get(Controller);

		// Checks that check whether the passed class is registered
		// as a controller and whether it is active accordingly:
		if (!controllerMeta) {
			throw new ReferenceError (`Error: сlass "${Controller.name}" is not registered as a controller.`);
		}
		if (!controllerMeta.isActive) {
			continue;
		}

		// Call before attach controller event:
		pluginEventCaller('attach-controller:before', { app, storage: config.storage, meta: controllerMeta });

		// Creating a controller router and creating a controller class instance:
		const controllerRouter = Express.Router();
		const controllerInstance = new Controller();
		const controllerHttpMethods = Array.from(controllerMeta.httpMethods.values());

		// The cycle of attaching controller methods to the router to implement http methods:
		for (const httpMethodMeta of controllerHttpMethods) {
			// If the http method is not active, then skip the iteration:
			if (!httpMethodMeta.isActive) {
				continue;
			}

			// Call before attach HTTP-method event:
			pluginEventCaller('attach-http-method:before', { app, storage: config.storage, meta: httpMethodMeta });

			// We define the name of the HTTP method, the parent router
			// and optimize the path to the route of the HTTP method:
			const httpMethodInterface = httpMethodMeta.method!.toLocaleLowerCase() as Lowercase<Http>;
			const httpMethodParentRouter = controllerMeta.isApi || httpMethodMeta.isApi ? apiRouter : controllerRouter;
			const httpMethodRoutePath = controllerMeta.isApi || httpMethodMeta.isApi ? `${controllerMeta.path}/${httpMethodMeta.path}` : httpMethodMeta.path!;
			const httpMethodNormalizeRoutePath = fixPath(httpMethodRoutePath);

			// Attaching the HTTP method to the parent router:
			httpMethodParentRouter[httpMethodInterface](
				httpMethodNormalizeRoutePath,
				httpMethodMeta.middlewares,
				httpMethodMeta.function.bind(controllerInstance),
			);

			// Call after attach HTTP-method event:
			pluginEventCaller('attach-http-method:after', { app, storage: config.storage });
		}

		// Attaching the controller router to the application:
		app.use(
			fixPath(controllerMeta.path!),
			controllerMeta.middlewares,
			controllerRouter
		)

		// Call after attach controller event:
		pluginEventCaller('attach-controller:after', { app, storage: config.storage });
	}

	// Attaching the API controller router to the application:
	app.use(config.prefixApi, apiRouter);

	// Call attach end event:
	pluginEventCaller('attach:end', { app, storage: config.storage });
}