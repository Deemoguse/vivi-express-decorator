import { config } from '../modules/config';
import { Support } from '../modules/support';
import { pluginEventCaller } from '../utils/plugin-event-caller';
import type { EntityController } from '../types/entities/entity-controller';
import type { ClassDecoratorContext } from '../types/common/common-type-provider';
import type { StorageSetControllerParams } from '../types/storage/storage-method-params';

// The context of the decorator function for easy access to external variables:
interface FunctionDecoratorContext {
	path: string,
};

// Helper for creating metadata:
function recordMetadata (params: StorageSetControllerParams): void {
	pluginEventCaller('set-controller:before', { storage: config.storage, params });
	config.storage.setController(params);
	pluginEventCaller('set-controller:after', { storage: config.storage });
};

// Implementation of Decorator logic for Stage-2 Proposal:
function decoratorStage2 (
	this: FunctionDecoratorContext,
	controller: EntityController,
	propertyKey: string,
	descriptor: PropertyDescriptor,
): void {
	if (
		propertyKey === undefined &&
		descriptor === undefined &&
		typeof controller === 'function'
	) {
		return recordMetadata({
			path: this.path,
			controller: controller,
		});
	}

	// Target is not a class:
	throw new TypeError('Error: the "Controller" decorator can only be applied to a class.');
}

// Implementation of Decorator logic for Stage-3 Proposal;
function decoratorStage3<This extends EntityController, Args extends any[]> (
	this: FunctionDecoratorContext,
	target: EntityController<This, Args>,
	context: ClassDecoratorContext<This>,
): void {
	// Target is not a class:
	if (context.kind !== 'class') {
		throw new TypeError('Error: the "Controller" decorator can only be applied to a class.');
	}

	// Record metadata:
	recordMetadata({
		path: this.path,
		controller: target,
	});
}

/**
 * Registering a class as a controller.
 * @param path - route path.
 * @throws {TypeError} The `path` is not a string.
 */
export function Controller<This extends EntityController, Args extends any[]> (path: string) {
	if (typeof path !== 'string') {
		throw new TypeError ('Error: the "path" argument must be a string.');
	}
	return Support.provide({
		bind: { path },
		decoratorStage2: decoratorStage2,
		decoratorStage3: decoratorStage3<This, Args>,
	});
}