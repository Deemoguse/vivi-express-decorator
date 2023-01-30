import * as repository          from './repository';
import type { Method }          from '../types/method';
import type { ClassController } from '../types/controller';

/**
 * Use the handler as middleware.
 * A handler, an array of handlers, or a list
 * of handlers (rest spread) can be passed as an argument.
 * @param handler - Middleware handler.
 **/
export function Middleware (handler: Method<true>): Function;

/**
 * Use the handler as middleware.
 * A handler, an array of handlers, or a list
 * of handlers (rest spread) can be passed as an argument.
 * @param handlers - Middleware handlers.
 **/
export function Middleware (...handlers: Method<true>[]): Function;

/**
 * Use the handler as middleware.
 * A handler, an array of handlers, or a list
 * of handlers (rest spread) can be passed as an argument.
 * @param handlers - Middleware handlers.
 **/
export function Middleware (...handlers: Method<true>[]): Function
{
	function decorator (target: ClassController, key: undefined): void;
	function decorator (target: InstanceType<ClassController>, key: string): void;
	function decorator (target: InstanceType<ClassController> | ClassController, key?: string): void
	{
		// If target is class. If a decorator is used for a class,
		// then usually the key argument will not be passed. This is
		// exactly what the check will consist of, what exactly the
		// handler will be assigned to.
		// -----------------------------------------------------------
		// #TODO: Find and use a more reliable method to determine the
		//        difference between a class and a regular function.

		if (key)
		{
			const controllerPrototype = target as InstanceType<ClassController>;

			if (repository.hasMethod(controllerPrototype, controllerPrototype[key]) === false)
			{
				// Create empty method record:
				repository.setMethod(controllerPrototype, {
					url     : '',
					method  : '',
					handler : controllerPrototype[key],
				});
			}

			const methodRecord = repository.getMethod(controllerPrototype, controllerPrototype[key])!;
					methodRecord.middlewares = Array.isArray(handlers)
						? [ ...(methodRecord?.middlewares || []), ...handlers ]
						: [ ...(methodRecord?.middlewares || []), handlers ];

			repository.setMethod(controllerPrototype, methodRecord);
		}
		else
		{
			const controller = target as ClassController;

			if (repository.hasController(controller))
			{
				// Create empty controller record:
				repository.setController(controller, '');
			}

			const controllerRecord = repository.getController(controller)!;
					controllerRecord.middlewares = Array.isArray(handlers)
						? [ ...(controllerRecord?.middlewares || []), ...handlers ]
						: [ ...(controllerRecord?.middlewares || []), handlers ];

			repository.setController(controller, controllerRecord.url);
		}
	}

	return decorator;
}