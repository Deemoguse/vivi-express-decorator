import { Express, Request, Response, NextFunction } from 'express';
export { NextFunction, Request, Response } from 'express';

/**
 * Class controller.
 **/
type ClassController =
	| (new (...args: any[]) => { _routerURL?: string, [K: string]: any } )
	;

declare function AttachController(app: Express, controllers: ClassController[]): void;

/**
 * Create a wash down of controller data
 * @param url - Route URL.
 **/
declare function Controller(url: string): ClassDecorator;

/**
 * Declare this API method.
 * This will add a prefix to the router URL. By default, the prefix is `/api/`.
 * * * * * * * * *
 * After declaring the `@Controller` __`/post`__, as well as the `@Api` `@Post` __'/create'__ method,
 * you will be able to access this api at __`/api/post/create`__.
 **/
declare function Api(): Function;
/**
 * Declare the Get method as an HTTP request.
 * @param url - Request URL.
 **/
declare const Get: (url: string) => Function;
/**
 * Declare Post method as an HTTP request.
 * @param url - Request URL.
 **/
declare const Post: (url: string) => Function;
/**
 * Declare Patch method as an HTTP request.
 * @param url - Request URL.
 **/
declare const Patch: (url: string) => Function;
/**
 * Declare Put method as an HTTP request.
 * @param url - Request URL.
 **/
declare const Put: (url: string) => Function;
/**
 * Declare Head method as an HTTP request.
 * @param url - Request URL.
 **/
declare const Head: (url: string) => Function;
/**
 * Declare Delete method as an HTTP request.
 * @param url - Request URL.
 **/
declare const Delete: (url: string) => Function;
/**
 * Declare Connect method as an HTTP request.
 * @param url - Request URL.
 **/
declare const Connect: (url: string) => Function;
/**
 * Declare Options method as an HTTP request.
 * @param url - Request URL.
 **/
declare const Options: (url: string) => Function;
/**
 * Declare Trace method as an HTTP request.
 * @param url - Request URL.
 **/
declare const Trace: (url: string) => Function;

/**
 * HTTP methods of the controller class.
 **/
type Method<R extends boolean = false> =
	| R extends true
		? ((req: Request, res: Response, next: NextFunction) => void)
		: ((req?: Request, res?: Response, next?: NextFunction) => void)
	;

/**
 * Use the handler as middleware.
 * A handler, an array of handlers, or a list
 * of handlers (rest spread) can be passed as an argument.
 * @param handler - Middleware handler.
 **/
declare function Middleware(handler: Method<true>): Function;
/**
 * Use the handler as middleware.
 * A handler, an array of handlers, or a list
 * of handlers (rest spread) can be passed as an argument.
 * @param handlers - Middleware handlers.
 **/
declare function Middleware(...handlers: Method<true>[]): Function;

/**
 * Recording of controller method data.
 **/
interface MethodRecord {
	url          : string,
	method       : string,
	handler      : Method,
	isApi       ?: boolean,
	middlewares ?: Method<true>[],
}

/**
 * Recording controller data.
 **/
interface ControllerRecord {
	url          : string,
	controller   : ClassController,
	middlewares ?: Method<true>[],
}

/**
 * Repository for working with instances of controller classes.
 **/
interface Repository {
	controllers : Map<ClassController, ControllerRecord>,
	methods     : Map<InstanceType<ClassController>, Map<Method, MethodRecord>>,
}

/**
 * Repository.
 **/
declare const repository: Repository;
/**
 * Write controller class data.
 * @param controller - controller class.
 * @param url - URL of the controller.
 **/
declare function setController(controller: ClassController, data: ControllerRecord): void;
/**
 * Get сontroller class data.
 * @param controller - controller class.
 **/
declare function getController(controller: ClassController): ControllerRecord | undefined;
/**
 * Check the record for existence.
 * @param controller - controller class.
 **/
declare function hasController(controller: ClassController): boolean;
/**
 * Get to wash down the HTTP method data.
 * @param controller - controller class.
 * @param url - URL.
 * @param method - HTTP method.
 * @param handler - сlass сontroller method.
 **/
declare function setMethod(controller: InstanceType<ClassController>, data: MethodRecord): void;
/**
 * Create a wash down of the controller method.
 * @param controller - Controller class whose method to get.
 * @param method - сlass сontroller method.
 **/
declare function getMethod(controller: InstanceType<ClassController>, method: Method): MethodRecord | undefined;
/**
 *	Get a list of controller methods.
 * @param controller - Controller class whose methods to get.
 **/
declare function getMethodList(controller: ClassController): Map<Method, MethodRecord> | undefined;
/**
 * Check the record for existence.
 * @param controller - Controller class whose method to get.
 * @param method - сlass сontroller method.
 **/
declare function hasMethod(controller: InstanceType<ClassController>, method: Method): boolean;

declare const repository$1_repository: typeof repository;
declare const repository$1_setController: typeof setController;
declare const repository$1_getController: typeof getController;
declare const repository$1_hasController: typeof hasController;
declare const repository$1_setMethod: typeof setMethod;
declare const repository$1_getMethod: typeof getMethod;
declare const repository$1_getMethodList: typeof getMethodList;
declare const repository$1_hasMethod: typeof hasMethod;
declare namespace repository$1 {
  export {
    repository$1_repository as repository,
    repository$1_setController as setController,
    repository$1_getController as getController,
    repository$1_hasController as hasController,
    repository$1_setMethod as setMethod,
    repository$1_getMethod as getMethod,
    repository$1_getMethodList as getMethodList,
    repository$1_hasMethod as hasMethod,
  };
}

export { Api, AttachController, ClassController, Connect, Controller, ControllerRecord, Delete, Get, Head, Method, MethodRecord, Middleware, Options, Patch, Post, Put, Repository, Trace, repository$1 as respository };
