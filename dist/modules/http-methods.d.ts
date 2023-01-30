/**
 * Declare this API method.
 * This will add a prefix to the router URL. By default, the prefix is `/api/`.
 * * * * * * * * *
 * After declaring the `@Controller` __`/post`__, as well as the `@Api` `@Post` __'/create'__ method,
 * you will be able to access this api at __`/api/post/create`__.
 **/
export declare function Api(): Function;
/**
 * Declare the Get method as an HTTP request.
 * @param url - Request URL.
 **/
export declare const Get: (url: string) => MethodDecorator;
/**
 * Declare Post method as an HTTP request.
 * @param url - Request URL.
 **/
export declare const Post: (url: string) => MethodDecorator;
/**
 * Declare Patch method as an HTTP request.
 * @param url - Request URL.
 **/
export declare const Patch: (url: string) => MethodDecorator;
/**
 * Declare Put method as an HTTP request.
 * @param url - Request URL.
 **/
export declare const Put: (url: string) => MethodDecorator;
/**
 * Declare Head method as an HTTP request.
 * @param url - Request URL.
 **/
export declare const Head: (url: string) => MethodDecorator;
/**
 * Declare Delete method as an HTTP request.
 * @param url - Request URL.
 **/
export declare const Delete: (url: string) => MethodDecorator;
/**
 * Declare Connect method as an HTTP request.
 * @param url - Request URL.
 **/
export declare const Connect: (url: string) => MethodDecorator;
/**
 * Declare Options method as an HTTP request.
 * @param url - Request URL.
 **/
export declare const Options: (url: string) => MethodDecorator;
/**
 * Declare Trace method as an HTTP request.
 * @param url - Request URL.
 **/
export declare const Trace: (url: string) => MethodDecorator;
//# sourceMappingURL=http-methods.d.ts.map