import type { Method } from './method';
import type { ClassController } from './controller';

/**
 * Recording of controller method data.
 **/
export interface MethodRecord {
	url : string,
	method : string,
	handler : Method,
	isApi ?: boolean,
	middlewares ?: Method<true>[],
}

/**
 * Recording controller data.
 **/
export interface ControllerRecord {
	url : string,
	controller : ClassController,
	middlewares ?: Method<true>[],
}

/**
 * Repository for working with instances of controller classes.
 **/
export interface Repository {
	controllers : Map<ClassController, ControllerRecord>,
	methods : Map<InstanceType<ClassController>, Map<Method, MethodRecord>>,
}