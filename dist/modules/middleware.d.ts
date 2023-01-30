import type { Method } from '../types/method';
/**
 * Use the handler as middleware.
 * A handler, an array of handlers, or a list
 * of handlers (rest spread) can be passed as an argument.
 * @param handler - Middleware handler.
 **/
export declare function Middleware(handler: Method<true>): Function;
/**
 * Use the handler as middleware.
 * A handler, an array of handlers, or a list
 * of handlers (rest spread) can be passed as an argument.
 * @param handlers - Middleware handlers.
 **/
export declare function Middleware(...handlers: Method<true>[]): Function;
//# sourceMappingURL=middleware.d.ts.map