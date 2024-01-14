import { config } from '../modules/config';
import { Support } from '../modules/support';
import { pluginEventCaller } from '../utils/plugin-event-caller';
import type { EntityController } from '../types/entities/entity-controller';
import type { EntityHttpMethod } from '../types/entities/entity-http-method';
import type { StorageSetApiParams } from '../types/storage/storage-method-params';
import type { ClassDecoratorContext, ClassMethodDecoratorContext } from '../types/common/common-type-provider';

// Helper for creating metadata:
function recordMetadata (params: StorageSetApiParams): void {
	pluginEventCaller('set-api:before', { storage: config.storage, params });
	config.storage.setIsApi(params);
	pluginEventCaller('set-api:after', { storage: config.storage });
};

// Implementation of Decorator logic for Stage-2 Proposal:
function decoratorStage2<This extends Function> (
	controller: This | Object,
	propertyKey?: string | symbol,
	descriptor?: PropertyDescriptor,
): void {
	// Record for http-method:
	if (propertyKey && descriptor && typeof descriptor.value === 'function') {
		return recordMetadata({
			target: 'http-method',
			method: descriptor!.value,
			controller: controller.constructor as EntityController,
		});
	}

	// Record for controller:
	if (typeof controller === 'function' && !descriptor) {
		return recordMetadata({
			target: 'controller',
			controller: controller as EntityController,
		});
	}

	// Target is not class or method:
	throw new TypeError('Error: the "Api" decorator can only be applied to a method or to a controller.');
}

// Implementation of Decorator logic for Stage-3 Proposal;
function decoratorStage3<This, Args extends any[], Return> (
	target: EntityController<This, Args> | EntityHttpMethod<This, Args, Return>,
	context: ClassDecoratorContext | ClassMethodDecoratorContext<This>,
): void {
	// Target is not class or method:
	if (context.kind !== 'method' && context.kind !== 'class') {
		throw new TypeError('Error: the "Api" decorator can only be applied to a method or to a controller.');
	}

	// Record for http-method:
	if (context.kind === 'method') {
		context.addInitializer(function (this: This) {
			recordMetadata({
				target: 'http-method',
				method: target as EntityHttpMethod,
				controller: this!.constructor as EntityController,
			});
		});
	}
	// Record for controller:
	else {
		recordMetadata({
			target: 'controller',
			controller: target as EntityController,
		});
	}
};

/**
 * Declare the controller or the http method of the controller as part of the Api.
 */
export function Api<This, Args extends any[], Return> () {
	return Support.provide({
		decoratorStage2: decoratorStage2<Function>,
		decoratorStage3: decoratorStage3<This, Args, Return>,
	});
}