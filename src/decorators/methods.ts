import { factoryMethodDecorator } from '../utils/factory-method-decorator';

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