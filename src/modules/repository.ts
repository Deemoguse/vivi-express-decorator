import { Method } from '../types/method';
import { ClassController } from '../types/controller';
import { Repository, MethodRecord, ControllerRecord } from '../types/repository';

/**
 * Repository.
 **/
export const repository: Repository = {
	controllers: new Map(),
	methods: new Map(),
};

/**
 * Write controller class data.
 * @param controller - controller class.
 * @param url - URL of the controller.
 **/
export function setController (controller: ClassController, data: ControllerRecord): void
{
	if (hasController(controller))
	{
		const updateData = { ...getController(controller), ...data };
		repository.controllers.set(controller, updateData);
	}
	else
	{
		repository.controllers.set(controller, data);
	}
}

/**
 * Get сontroller class data.
 * @param controller - controller class.
 **/
export function getController (controller: ClassController): ControllerRecord | undefined
{
	return repository.controllers.get(controller);
}

/**
 * Check the record for existence.
 * @param controller - controller class.
 **/
export function hasController (controller: ClassController): boolean
{
	return repository.controllers.has(controller);
}

/**
 * Get to wash down the HTTP method data.
 * @param controller - controller class.
 * @param url - URL.
 * @param method - HTTP method.
 * @param handler - сlass сontroller method.
 **/
export function setMethod (controller: InstanceType<ClassController>, data: MethodRecord): void
{
	if (hasMethod(controller, data.handler))
	{
		const updateData = { ...getMethod(controller, data.handler), ...data };
		repository.methods.get(controller)?.set(data.handler, updateData);
	}
	else if (repository.methods.has(controller))
	{
		repository.methods.get(controller)?.set(data.handler, data);
	}
	else
	{
		const map = new Map<Method, MethodRecord>();
				map.set(data.handler, data);

		repository.methods.set(controller, map);
	}
}

/**
 * Create a wash down of the controller method.
 * @param controller - Controller class whose method to get.
 * @param method - сlass сontroller method.
 **/
export function getMethod (controller: InstanceType<ClassController>, method: Method): MethodRecord | undefined
{
	if (repository.methods.has(controller))
	{
		return repository.methods.get(controller)?.get(method);
	}

	return undefined;
}

/**
 *	Get a list of controller methods.
 * @param controller - Controller class whose methods to get.
 **/
export function getMethodList (controller: ClassController): Map<Method, MethodRecord> | undefined
{
	if (repository.methods.has(controller.prototype))
	{
		return repository.methods.get(controller.prototype);
	}

	return undefined;
}

/**
 * Check the record for existence.
 * @param controller - Controller class whose method to get.
 * @param method - сlass сontroller method.
 **/
export function hasMethod (controller: InstanceType<ClassController>, method: Method): boolean
{
	return Boolean(repository.methods.get(controller)?.has(method));
}