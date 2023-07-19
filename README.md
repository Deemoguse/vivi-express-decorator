# WAMBATA. Express-decorators.

This is a minimalist package that provides decorator functions for working with Express controller classes.

## Features

`@wambata/express-decorator` offers a variety of features designed to facilitate the development of Express applications in a modern, class-based style:
- **Decorator Support**: This library brings the power of decorators to Express.js, allowing you to expressively annotate your class-based controllers and their methods with relevant metadata.
- **Non-invasive**: Original classes and methods remain untouched, keeping your codebase clean and free from modifications. The library works by creating metadata associated with your classes and methods, not by modifying them directly.
- **Middleware and API Declaration**: Middleware and API paths can be declared at both controller and method levels, enabling granular control over the request-handling pipeline.
- **Configurable**: The behavior of the library can be customized through a configuration object. This includes setting a custom metadata storage class, specifying a prefix for API routes, and adding plugins.
- **Plugin System**: The library includes a robust plugin system, allowing you to add custom functionality and modify the behavior of the library as needed.
- **Automatic Controller Importing**: The library provides a function that automatically imports all controllers matching a provided glob pattern, simplifying the setup process.
- **Customizable Metadata Storage**: You can implement your own metadata storage class, giving you full control over how metadata is stored and retrieved. This is particularly useful for integrating with other systems, adding additional functions, or modifying the behavior of existing ones.

* * * * *

## Installation
To install, run the following command:
```bash
$ npm i --save-dev @wambata/express-decorators
```

## Main Modules:
This table describes the main modules of the library.
> **`*`** – Marking of an optional (auxiliary) module.

| Module | Purpose |
| :- | :- |
| `config` | An object with library configuration parameters. |
| `Controller` | Decorator for controller registration. It can be applied only to classes. It takes the path for the parent route as an argument. |
| `Get`, `Post`, `Put`, etc. | Decorators of HTTP methods. They can be applied only to class methods. They take the path relative to the parent route as an argument. |
| `Api` | Decorator for defining a method or controller in the group of `Api` routes. |
| `Middleware` | Decorator for defining middleware for the controller or HTTP method. |
| `AttachController` | A method for attaching controllers to an application instance. |
| `*ImportControllers` | An asynchronous method for importing controllers by the passed _glob_ pattern. |

## Usage:
The `Controller` and `Get` decorators are used to declare a route for receiving data. The `Responce` and `Request` interfaces are re-exported from `express`, so you don't have to make an additional import of these types directly from `express`:
```ts
import { Controller, Get, Responce, Request } from '@wambata/express-decorators';

@Controller('/post')
export default class PostController {

	@Get('/:id')
	public async get (res: Responce, req: Request) {
		// Logic ....
	}
}
```

To apply this controller to an application instance, use the `AttachControllers` function:
```ts
import Express from 'express';
import { AttachControllers } from '@wambata/express-controllers';

// Importing controllers:
import PostController from './controllers/post.controller.ts';

// Attachment:
const app = Express();
AttachControllers(app, [ PostController ]);

// Starting the server:
app.listen(3000);
```

## Declaring API Methods and Applying Middlewares:
For convenient code organization, there are `Api` and `Middleware` decorators. This group of decorators can be applied both to controllers and to HTTP methods. Here's an example of usage:

```ts
import { Controller, Get, Middleware, Api, Responce, Request } from '@wambata/express-decorators';

@Api('/api')
@Controller('/post')
export default class PostController {

  @Middleware(someMiddleware)
  @Get('/:id')
	public async get (res: Responce, req: Request) {
		// Logic ....
	}
}
```
In this particular example, the `Api` decorator is applied to the controller, so the HTTP method `get` in the `PostController` class, and all other child routes, will be available at the path `/api/post/<route_path>` instead of `/post/<route_path>`.
If the `Api` decorator is applied to the HTTP method, then only it will be available at the path `/api/post/<route_path>`. The `Middleware` decorator behaves similarly. You can apply all the decorators in a sequence that is convenient for you.

## ImportControllers
This auxiliary method allows you to automatically import all controllers that satisfy the passed _glob_ pattern. This can be useful if you have a large number of controllers and you want to automatically connect all of them. For instance:

```ts
import { AttachControllers, ImportControllers } from '@wambata/express-controllers';
import Express from 'express';

async function bootstrap() {
  const app = Express();
  const controllers = await ImportControllers('**/*.controller.ts');
  AttachControllers(app, controllers);
  app.listen(3000);
}

bootstrap();
```
In this example, all files ending with `.controller.ts` and located anywhere in the project will be imported and attached to the application instance.

## Configuration
The library contains a `config` object that allows you to configure the behavior of decorators and methods.

Example of using the `config` object:
```ts
import { config } from '@wambata/express-decorators';
import MyStorageClass from './my-storage-class';
import MyPluginClass from './my-plugin-class';

config.set({
	storage: MyStorageClass,
	prefixApi: '/myapi',
	plugins: [new MyPluginClass()]
});
```

In this example, we:
1. Replace the standard storage class with `MyStorageClass`.
2. Change the standard API path prefix from '/api' to '/myapi'.
3. Add the `MyPluginClass` plugin.

Configuration elements:
- `storage`: A static class that implements the metadata storage logic. `Storage` is used by default.
- `prefixApi`: A prefix that will be used to modify the controller method path. '/api' is used by default.
- `plugins`: A set of plugins. Plugin events will be called in the order they are declared.
- `lock()`: A method to lock the configuration and switch it to "read-only" mode. Use this method to prevent accidental configuration changes.
- `set(config)`: A method to set configuration parameters. After using this method, the configuration object becomes read-only.

Use the `config` object to adjust the behavior of `@wambata/express-decorator` according to your application's needs. If you have any questions about using the `config` object, don't hesitate to ask for help on our support forum.

## Plugins and Their Use

Plugins in `@wambata/express-decorator` are tools that allow you to extend and customize the library's functionality. They can be used to add new features, change the behavior of existing components, and interact with the request handling process at various stages of the application lifecycle.

All plugins in `@wambata/express-decorator` are based on the event system. Each plugin can subscribe to specific events that are called at certain points during the application's execution. When an event occurs, all handlers associated with that event are called.

A feature of plugins in this library is that the order of controller imports matters. When using plugins, make sure that controllers are imported after plugin initialization, otherwise plugin events may not be called. To circumvent this problem and facilitate application scaling, the `ImportControllers` function is proposed, which automatically imports all controllers matching a given pattern.

* * * * * * * *

The `Plugin` class in `@wambata/express-decorator` is a customizable event-driven construct that lets you extend the behavior of the library according to the needs of your specific use-case. Here is a detailed breakdown of the Plugin class and its methods:

### Plugin Use Examples

1. Import controllers after adding plugins:

```ts
import { config, MyPlugin } from '@wambata/express-decorators';

config.set({
	plugins: [new MyPlugin()]
});

// Import of controllers should be after adding plugins:
import PostController from './controllers/post.controller.ts';
```

2. Using the `ImportControllers` function for automatic import of controllers:

```ts
import { config, MyPlugin, ImportControllers, AttachControllers } from '@wambata/express-decorators';
import Express from 'express';

config.set({
	plugins: [new MyPlugin()]
});

// Using the ImportControllers function:
async function bootstrap() {
	const app = Express();
	const controllers = await ImportControllers('**/*.controller.ts');
	AttachControllers(app, controllers);
	app.listen(3000);
}

bootstrap();
```

In this example, the `ImportControllers` function automatically imports all controllers that match the `'**/*.controller.ts'` pattern. Thus, all controllers are imported after the plugin initialization, and the plugin events are called in the correct order.

### Example of a Plugin

Here is an example of a simple plugin:

```ts
import { join } from 'path';
import { writeFileSync } from 'fs';
import { Plugin, config } from '@wambata/express-decorators';

const schema: string[] = [];
const RouteMap = new Plugin();

RouteMap.on('attach:end', ({ storage }) => {
	storage.storage.forEach(controller => {
		const controllerPath = controller.path!;

		controller.httpMethods.forEach(httpMethod => {
			const isApi = controller.isApi || httpMethod.isApi;
			const routePath = join(isApi ? config.prefixApi : '', controllerPath, httpMethod.path!);
			schema.push(`${controller.controller.name} | ${httpMethod.method} | ${routePath}`);
		})

		schema.push(`\n${'-'.repeat(40)}\n`);
	});

	writeFileSync('route-map.txt', schema.join('\n'));
})

export default RouteMap;
```

In this example, we subscribe to the `attach:end` event, which is called when all controllers have been attached. Reacting to this event, we turn to the metadata repository and create a file based on them that will help us navigate the routes of the project.

To activate the plugin, you need to add it to the configuration:

```ts
import { config } from '@wambata/express-decorators';
import RouteMap from './route-map';

config.set({
	plugins: [ RoutesMap ]
});
```

* * * * * * * * 

### Class: `Plugin`

#### Template: Config

The `Plugin` class accepts a Config template which represents the configuration interface of your plugin.

#### Methods:
1. `configurate(config)`: This method lets you set the plugin's configuration. It receives a `Partial<Config>` object and returns the plugin instance itself for chaining.
2. `on(event, cb)`: This method declares an event listener for the plugin. It takes two parameters: the event name, and the event callback function. This method does not return anything.

#### Properties:
1. **events**: This property is a `PluginEventSet` object which stores all declared event listeners for this plugin instance.
2. **config**: This property holds the plugin's configuration as specified by the `Config` template. By default, it is an empty object.

#### Event Handling

The event system in the Plugin class operates on two simple concepts: `event` and `callback`. You declare an event listener using the `on` method, providing the event name and a callback function. When an event of the declared name occurs, the callback function gets invoked with the provided parameters.

This way, you can have specific actions or side effects when different events occur during the lifecycle of your application, like before setting a controller, after setting a controller, before attaching a controller, and so on.

#### Plugin Event Call Order

During the application execution, plugin events are called in the following order:
1. `attach:start`
2. `attach-controller:before`
3. `attach-controller:after`
4. `attach-http-method:before`
5. `attach-http-method:after`
6. `attach:end`

The events listed below do not have a strict order of call. The order of their call will depend on the way they are applied:
- `set-controller:before`
- `set-controller:after`
- `set-http-method:before`
- `set-http-method:after`
- `set-middleware:before`
- `set-middleware:after`
- `set-api:before`
- `set-api:after`

When using plugins, consider this sequence of events to correctly plan and control plugin behavior.

## Creating Your Own Metadata Storage Class

The `@wambata/express-decorator` library provides a built-in `Storage` class that serves to store metadata about controllers and their methods. However, depending on the needs of your application, you may want to replace this class with your own.

There are various reasons why you might want to use your own class for metadata storage:

1. **Additional features**: You might want to add extra functions to your storage class. For example, you might want to add methods for filtering controllers or HTTP methods based on certain criteria.

2. **Modifying behavior of existing functions**: You might want to change the behavior of existing functions. For example, you might want to modify how the storage class handles the registration of controllers or HTTP methods.

3. **Integration with third-party systems**: You might want to integrate your storage class with other systems such as databases or monitoring systems.

To create your own metadata storage class, you must implement the `StorageBase` interface. This interface defines a set of methods that a storage class must implement.

After creating your own metadata storage class, you can replace the standard storage class by setting your class in the configuration object:

```ts
import { config } from '@wambata/express-decorators';
import MyStorage from './my-storage';

config.set({
	storage: new MyStorage()
});
```

Now, all metadata related to controllers and their methods will be stored and processed by your own storage class.
