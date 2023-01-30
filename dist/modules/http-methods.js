"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trace = exports.Options = exports.Connect = exports.Delete = exports.Head = exports.Put = exports.Patch = exports.Post = exports.Get = exports.Api = void 0;
const repository_1 = require("./repository");
/**
 * Produce a decorator function with the specified HTTP method.
 * @param method - HTTP method.
 **/
function factoryMethodDecorators(method) {
    /**
     * Declare the method as an HTTP request.
     * @param url - Request URL.
     **/
    return function (url) {
        return function (target, key) {
            const handler = target[key];
            // Record method:
            (0, repository_1.setMethod)(target, { url, method, handler });
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
function Api() {
    return function (target, key) {
        if ((0, repository_1.hasMethod)(target, target[key])) {
            const method = target[key];
            const methodRecord = (0, repository_1.getMethod)(target, method);
            // Modify record:
            methodRecord.isApi = true;
            // Record new data:
            (0, repository_1.setMethod)(target, methodRecord);
        }
        else {
            throw new ReferenceError(`Method "${key}" cannot be declared as an API because it was not declared as an HTTP method.`);
        }
    };
}
exports.Api = Api;
/**
 * Declare the Get method as an HTTP request.
 * @param url - Request URL.
 **/
exports.Get = factoryMethodDecorators('get');
/**
 * Declare Post method as an HTTP request.
 * @param url - Request URL.
 **/
exports.Post = factoryMethodDecorators('post');
/**
 * Declare Patch method as an HTTP request.
 * @param url - Request URL.
 **/
exports.Patch = factoryMethodDecorators('patch');
/**
 * Declare Put method as an HTTP request.
 * @param url - Request URL.
 **/
exports.Put = factoryMethodDecorators('put');
/**
 * Declare Head method as an HTTP request.
 * @param url - Request URL.
 **/
exports.Head = factoryMethodDecorators('head');
/**
 * Declare Delete method as an HTTP request.
 * @param url - Request URL.
 **/
exports.Delete = factoryMethodDecorators('delete');
/**
 * Declare Connect method as an HTTP request.
 * @param url - Request URL.
 **/
exports.Connect = factoryMethodDecorators('connect');
/**
 * Declare Options method as an HTTP request.
 * @param url - Request URL.
 **/
exports.Options = factoryMethodDecorators('options');
/**
 * Declare Trace method as an HTTP request.
 * @param url - Request URL.
 **/
exports.Trace = factoryMethodDecorators('trace');
//# sourceMappingURL=http-methods.js.map