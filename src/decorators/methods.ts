import { config } from '../modules/config';
import { Support } from '../modules/support';
import { pluginEventCaller } from '../utils/plugin-event-caller';
import type { CommonHttp } from '../types/common/common-http';
import type { EntityHttpMethod } from '../types/entities/entity-http-method';
import type { EntityController } from '../types/entities/entity-controller';
import type { StorageSetHttpMethodParams } from '../types/storage/storage-method-params';
import type { ClassMethodDecoratorContext } from '../types/common/common-type-provider';

/**
 * The context of the decorator function for easy access to external variables.
 */
interface FunctionDecoratorContext {
	path: string,
	httpMethod: CommonHttp,
};

// Helper for creating metadata:
function recordMetadata (params: StorageSetHttpMethodParams): void {
	pluginEventCaller('set-http-method:before', { storage: config.storage, params });
	config.storage.setHttpMethod(params);
	pluginEventCaller('set-http-method:after', { storage: config.storage });
};

// Implementation of Decorator logic for Stage-2 Proposal:
function decoratorStage2<This extends Function> (
	this: FunctionDecoratorContext,
	controller: This | Object,
	propertyKey?: string | symbol,
	descriptor?: PropertyDescriptor,
): void {
	if (propertyKey && descriptor) {
		return recordMetadata({
			path: this.path,
			httpMethod: this.httpMethod,
			method: descriptor!.value as EntityHttpMethod,
			controller: controller.constructor as EntityController,
		});
	}

	// Target is not a method:
	throw new TypeError(`Error: the "${this.httpMethod}" decorator can only be applied to a method.`);
}

// Implementation of Decorator logic for Stage-3 Proposal;
function decoratorStage3<This, Args extends any[], Return> (
	this: FunctionDecoratorContext,
	target: EntityHttpMethod<This, Args, Return>,
	context: ClassMethodDecoratorContext<This>,
): void {
	// Target is not method:
	if (context.kind !== 'method') {
		throw new TypeError(`Error: the "${this.httpMethod}" decorator can only be applied to a method.`);
	}

	// Get data from context:
	const { path, httpMethod } = this;

	// Record metadata:
	context.addInitializer(function (this: This) {
		recordMetadata({
			path: path,
			httpMethod: httpMethod,
			method: target,
			controller: this!.constructor as EntityController,
		});
	});
}

/**
 * Produce a decorator function with the specified HTTP method.
 * @param httpMethod - HTTP method.
 * @throws {TypeError} The `path` is not a string.
 **/
function factoryMethodDecorator (httpMethod: CommonHttp) {
	return <This, Args extends any[], Return>(path: string) => {
		if (typeof path !== 'string') {
			throw new TypeError ('Error: the "path" argument must be a string.');
		}

		// Get decorator:
		return Support.provide({
			bind: { path, httpMethod },
			decoratorStage2: decoratorStage2<Function>,
			decoratorStage3: decoratorStage3<This, Args, Return>,
		});
	};
}

/**
 * Register a class method as a `Delete` controller method.
 */
export const Delete = factoryMethodDecorator('Delete');

/**
 * Register a class method as `Get` a controller method.
 */
export const Get = factoryMethodDecorator('Get');

/**
 * Register a class method as a `Head` controller method.
 */
export const Head = factoryMethodDecorator('Head');

/**
 * Register a class method as a `Options` controller method.
 */
export const Options = factoryMethodDecorator('Options');

/**
 * Register a class method as a `Patch` controller method.
 */
export const Patch = factoryMethodDecorator('Patch');

/**
 * Register a class method as a `Post` controller method.
 */
export const Post = factoryMethodDecorator('Post');

/**
 * Register a class method as `Put` a controller method.
 */
export const Put = factoryMethodDecorator('Put');

/**
 * Register a class method as a `Trace` controller method.
 */
export const Trace = factoryMethodDecorator('Trace');

/**
 * Register a class method as a `Connect` controller method.
 */
export const Connect = factoryMethodDecorator('Connect');