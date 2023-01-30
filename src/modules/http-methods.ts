import { getMethod, hasMethod, setMethod } from './repository';
import type { ClassController }            from '../types/controller';

/**
 * Produce a decorator function with the specified HTTP method.
 * @param method - HTTP method.
 **/
function factoryMethodDecorators (method: string): (url: string) => MethodDecorator
{
	/**
	 * Declare the method as an HTTP request.
	 * @param url - Request URL.
	 **/
	return function (url: string): MethodDecorator
	{
		return function (target: InstanceType<ClassController>, key: string | symbol): void
		{
			const handler = target[key as string];

			// Record method:
			setMethod(target, { url, method, handler });
		};
	};
}

/**
 * Declare this API method.
 * This will add a prefix to the router URL. By default, the prefix is `/api/`.
 * * * * * * * * *
 * After declaring the `@Controller` __`/post`__, as well as the `@Api` `@Post` __'/create'__ method,
 * you will be able to access this api at __`/api/post/create`__.
 **/
export function Api (): Function
{
	return function (target: InstanceType<ClassController>, key: string | symbol): void
	{
		if (hasMethod(target, target[key as string]))
		{
			const method       = target[key as string];
			const methodRecord = getMethod(target, method)!;

			// Modify record:
			methodRecord.isApi = true;

			// Record new data:
			setMethod(target, methodRecord);
		}
		else
		{
			throw new ReferenceError(`Method "${key as string}" cannot be declared as an API because it was not declared as an HTTP method.`);
		}
	};
}

/**
 * Declare the Get method as an HTTP request.
 * @param url - Request URL.
 **/
export const Get = factoryMethodDecorators('get');

/**
 * Declare Post method as an HTTP request.
 * @param url - Request URL.
 **/
export const Post = factoryMethodDecorators('post');

/**
 * Declare Patch method as an HTTP request.
 * @param url - Request URL.
 **/
export const Patch = factoryMethodDecorators('patch');

/**
 * Declare Put method as an HTTP request.
 * @param url - Request URL.
 **/
export const Put = factoryMethodDecorators('put');

/**
 * Declare Head method as an HTTP request.
 * @param url - Request URL.
 **/
export const Head = factoryMethodDecorators('head');

/**
 * Declare Delete method as an HTTP request.
 * @param url - Request URL.
 **/
export const Delete = factoryMethodDecorators('delete');

/**
 * Declare Connect method as an HTTP request.
 * @param url - Request URL.
 **/
export const Connect = factoryMethodDecorators('connect');

/**
 * Declare Options method as an HTTP request.
 * @param url - Request URL.
 **/
export const Options = factoryMethodDecorators('options');

/**
 * Declare Trace method as an HTTP request.
 * @param url - Request URL.
 **/
export const Trace = factoryMethodDecorators('trace');