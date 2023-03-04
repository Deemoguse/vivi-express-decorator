import { normalize }                    from 'path';
import { Router }                       from 'express';
import { config }                       from './config';
import { getController, getMethodList } from './repository';
import type { Express }                 from 'express';
import type { ClassController }         from '../types/controller';

export function AttachController (app: Express, controllers: ClassController[]): void
{
	// The router to which the methods defined as API will be registered:
	const apiRouter = Router();

	// Registration of controllers and its methods:
	controllers.forEach(controller =>
		{
			const controllerData = getController(controller);

			// If the controller was found, we register it in the
			// transferred instance of the express application:
			if (controllerData)
			{
				const controllerRouter   = Router();
				const controllerInstance = new controllerData.controller();
				const controllerMethods  = getMethodList(controller)!;

				// It is important to bind the controller instance to
				// all its methods to avoid undesirable behavior:
				controllerMethods.forEach(methodRecord =>
					{
						const router            = methodRecord.isApi ? apiRouter : controllerRouter;
						const routeURL          = methodRecord.isApi ? `${controllerData.url}/${methodRecord.url}` : methodRecord.url;
						const normalizeRouteURL = `/${normalize(routeURL).split(/[\\/]/).filter(w => w.match(/\w+/)).join('/')}`;

						(router[methodRecord.method as keyof Router] as Function)(
							normalizeRouteURL,
							methodRecord.middlewares || [],
							methodRecord.handler.bind(controllerInstance),
						);
					},
				);

				// Register router:
				app.use(
					controllerData.url,
					controllerData.middlewares || [],
					controllerRouter,
				);
			}
			else
			{
				throw new ReferenceError(`Unregistered controller "${controller.name}" class.`);
			}
		},
	);

	// Register API router:
	app.use(config.apiURL, apiRouter);
}