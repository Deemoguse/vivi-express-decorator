import { config } from '../modules/config';
import { Support } from '../modules/support';
import { pluginEventCaller } from '../utils/plugin-event-caller';
import type { EntityMiddleware } from '../types/entities/entity-middleware';
import type { EntityController } from '../types/entities/entity-controller';
import type { EntityHttpMethod } from '../types/entities/entity-http-method';
import type { StorageSetMiddlewareParams } from '../types/storage/storage-method-params';
import type { ClassDecoratorContext, ClassMethodDecoratorContext } from '../types/common/common-type-provider';

// The context of the decorator function for easy access to external variables:
interface FunctionDecoratorContext {
	middleware: EntityMiddleware | EntityMiddleware[]
};

// Helper for creating metadata:
function recordMetadata (params: StorageSetMiddlewareParams): void {
	pluginEventCaller('set-middleware:before', { storage: config.storage, params });
	config.storage.setMiddleware(params);
	pluginEventCaller('set-middleware:after', { storage: config.storage });
};

// Implementation of Decorator logic for Stage-2 Proposal:
function decoratorStage2<This extends Function> (
	this: FunctionDecoratorContext,
	controller: This | Object,
	propertyKey?: string | symbol,
	descriptor?: PropertyDescriptor,
): void {
	// Record for http-method:
	if (propertyKey && descriptor && typeof descriptor.value === 'function') {
		return recordMetadata({
			target: 'http-method',
			middleware: this.middleware,
			method: descriptor!.value as EntityHttpMethod,
			controller: controller.constructor as EntityController,
		});
	}

	// Record for controller:
	if (typeof controller === 'function' && !descriptor) {
		return recordMetadata({
			target: 'controller',
			middleware: this.middleware,
			controller: controller as EntityController,
		});
	}

	// Target is not class or method:
	throw new TypeError('Error: the "Api" decorator can only be applied to a method or to a controller.');
}

// Implementation of Decorator logic for Stage-3 Proposal;
function decoratorStage3<This, Args extends any[], Return> (
	this: FunctionDecoratorContext,
	target: EntityController<This, Args> | EntityHttpMethod<This, Args, Return>,
	context: ClassDecoratorContext | ClassMethodDecoratorContext<This>,
): void {
	// Target is not class or method:
	if (context.kind !== 'method' && context.kind !== 'class') {
		throw new TypeError('Error: the "Api" decorator can only be applied to a method or to a controller.');
	}

	// Defined middleware from context:
	const middleware = this.middleware;;

	// Record for http-method:
	if (context.kind === 'method') {
		context.addInitializer(function (this: This) {
			recordMetadata({
				target: 'http-method',
				middleware: middleware,
				method: target as EntityHttpMethod,
				controller: this!.constructor as EntityController,
			});
		});
	}
	// Record for controller:
	else {
		recordMetadata({
			target: 'controller',
			middleware: middleware,
			controller: target as EntityController,
		});
	}
};

/**
 * Adding middleware for the controller or HTTP controller method.
 * @param middleware - function or array of functions.
 */
export function Middleware<This, Args extends any[], Return> (middleware: EntityMiddleware | EntityMiddleware[]) {
	// Check types:
	if (Array.isArray(middleware) && middleware.some(fn => typeof fn !== 'function')) {
		throw new TypeError('Error: all elements of the array of the middleware argument must be functions.');
	}
	if (typeof middleware !== 'function') {
		throw new TypeError('Error: the "middleware" argument must be an array or a function.');
	}
	return Support.provide({
		bind: { middleware },
		decoratorStage2: decoratorStage2<Function>,
		decoratorStage3: decoratorStage3<This, Args, Return>,
	});
}