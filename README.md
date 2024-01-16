# WAMBATA. Express-decorators

`@wambata/express-decorators` is a modern, minimalist library for Express.js, designed to simplify the development of web applications using decorators. The library is a set of powerful tools that allow developers to expressively and effectively structure their applications, applying the concepts of classes and decorators within the architecture of Express.

## Key Features

- **Decorators for Express.js**: `@wambata/express-decorators` introduces the power and flexibility of decorators to Express, simplifying the annotation of controller classes and methods for a clear and organized code structure.
- **Non-invasive Approach**: The library creates metadata for classes and methods without making changes to existing code, ensuring the purity and integrity of your code base.
- **Granular Control Over Middleware and API**: Allows the declaration of Middleware and API at the level of methods and controllers, providing fine control over request processing.
- **High Configurability**: Offers extended customization options to meet the specific requirements of applications.
- **Plugin System**: Includes a flexible and expandable plugin system, enhancing the functional capabilities and adaptability of the library.
- **Decorator Inheritance**: Supports the inheritance of decorators when extending controller classes, ensuring seamless and intuitive functionality extension.
- **High Processing Speed**: Demonstrates outstanding performance, registering and attaching 500 controllers in 45 ms with a margin of error of 5 ms.

These features make `@wambata/express-decorators` a powerful tool for developing web applications on Express.js, suitable for both beginners and experienced developers looking to improve the structure and support of their projects.

## Installation

Install the `@wambata/express-decorators` library via npm or yarn:

```bash
npm install @wambata/express-decorators
```

or

```bash
yarn add @wambata/express-decorators
```

## Quick Start

To get started quickly with the `@wambata/express-decorators` library, here are the key steps to integrate it into your Express.js application.

### Creating a Controller

Use the `Controller` and `Get` decorators to declare routes. The `Response` and `Request` interfaces are re-exported from `express`, allowing you to avoid additional imports of these types directly from `express`:

```typescript
import { Controller, Get, Response, Request } from '@wambata/express-decorators';

@Controller('/post')
export default class PostController {
    @Get('/:id')
    public async get(req: Request, res: Response) {
        // Request handling logic...
    }
}
```

### Applying the Controller to an Application Instance

To apply this controller to an application instance, use the `AttachControllers` function:

```typescript
import Express from 'express';
import { AttachControllers } from '@wambata/express-controllers';

// Importing controllers:
import PostController from './controllers/post.controller.ts';

// Attaching controllers:
const app = Express();
AttachControllers(app, [PostController]);

// Starting the server:
app.listen(3000);
```

These examples demonstrate the basic setup of your application using `@wambata/express-decorators` to organize routes and handle requests.

## Main Modules

Below is a description of the key modules of the `@wambata/express-decorators` library.

| Module                     | Purpose                                                                                                                     |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `config`                   | An object with library configuration parameters.                                                                            |
| `Controller`               | A decorator for controller registration. Applied only to classes. Takes the path for the parent route as an argument.       |
| `Get`, `Post`, `Put`, etc. | Decorators for HTTP methods. Applied only to class methods. They take the path relative to the parent route as an argument. |
| `Api`                      | A decorator used for grouping controllers and methods into the `Api` category, simplifying the organization of API routes.  |
| `Middleware`               | A decorator for defining middleware for the controller or HTTP method.                                                      |
| `AttachController`         | A method for attaching controllers to an application instance.                                                              |
| `ImportControllers`        | An asynchronous method for importing controllers by a passed _glob_ pattern.                                                |
| `Plugin`                   | A class for creating and managing plugins, allowing for the expansion of the library's functional capabilities.             |
| `Support`                  | A class that provides a definition of the current stage of the decorator's proposal.                                        |

In addition to providing core modules, the `@wambata/express-decorators` library also re-exports key interfaces and types from `express` for ease of use. This includes:

- **`Request` and `Response`**: Standard request and response interfaces from `express`, available directly through `@wambata/express-decorators`. This reduces the need for additional imports and makes the code more compact.
- **`NextFunction`**: A type used for middleware functions in `express`. It facilitates working with middleware while maintaining type consistency throughout the application.
- **Additional Types**: The library also exports various useful types and interfaces that will be beneficial for developers.

These interfaces and types simplify integration with `express` and reduce the number of necessary imports, making your code cleaner and more organized.

## Support for Decorator Stage Proposals

The `@wambata/express-decorators` library provides support for implementations of decorators at different development stages (Stage 2 and Stage 3 Proposals). This means that in most cases, you don't have to worry about choosing a specific stage implementation for decorators – the library will automatically identify the most suitable implementation and apply it.

### Automatic Stage Implementation Selection

By default, the library autonomously selects the appropriate stage implementation for decorators. This frees developers from the need to manually specify the preferred stage, ensuring seamless integration and compatibility.

### Specifying a Particular Stage Implementation

However, if you need to use a specific stage implementation for decorators, or if you encounter the error `Error: The current Decorator Stage Proposal could not be determined`, you can explicitly specify your preferred stage using the `config.support` object in the following options:

- `2` - Decorators Stage 2 Proposal.
- `3` - Decorators Stage 3 Proposal.
- `auto` - **_Default value_**. Automatically determine the suitable implementation.

### Example of Usage

```javascript
import { config } from '@wambata/express-decorators';

// Setting Stage 2 Proposal
config.set({
    support: 2,
});

// Or choosing Stage 3 Proposal
config.set({
    support: 3,
});

// Or reverting to automatic detection (default)
config.set({
    support: 'auto',
});
```

These settings allow you to flexibly manage the use of decorators in your application, ensuring compliance with your specific requirements and preferences.

## Using the Api Decorator

The `Api` decorator is convenient for code organization and can be applied to both controllers and HTTP methods. This decorator helps to group routes and simplifies structuring the API in your application.

### Applying Api to a Controller

When the `Api` decorator is applied to a controller, all methods within that controller automatically become part of the API group. For example:

```typescript
import { Controller, Get, Api, Response, Request } from '@wambata/express-decorators';

@Api()
@Controller('/post')
export default class PostController {
    @Get('/:id')
    public async get(req: Request, res: Response) {
        // Request handling logic...
    }
}
```

In this example, the `Api` decorator is applied to the `PostController` controller. This means that the HTTP `get` method and all other child routes will be available at the path `/api/post/:id` instead of `/post/:id`.

### Applying Api to a Controller Method

If the `Api` decorator is applied directly to a method in the controller, only that method will be included in the API group. For example:

```typescript
import { Controller, Get, Api, Response, Request } from '@wambata/express-decorators';

@Controller('/post')
export default class PostController {
    @Api()
    @Get('/:id')
    public async get(req: Request, res: Response) {
        // Request handling logic...
    }
}
```

In this case, only the `get` method will be accessible at the path `/api/post/:id`. This allows for more flexible organization of your API by defining precise entry points into the API group.

## Using the Middleware Decorator

The `Middleware` decorator can be applied at the controller class level and at its method level.

### Applying Middleware to a Controller

In this example, the middleware attached to the controller class will be executed each time the controller's HTTP child method is accessed.

```typescript
import { Controller, Get, Middleware, Response, Request } from '@wambata/express-decorators';

@Controller('/post')
@Middleware(someMiddleware)
export default class PostController {
    @Get('/:id')
    public async get(req: Request, res: Response) {
        // Request handling logic...
    }
}
```

### Applying Middleware to a Controller Method

The middleware attached to the controller's HTTP method will execute each time this method is accessed.

```typescript
import { Controller, Get, Middleware, Response, Request } from '@wambata/express-decorators';

@Controller('/post')
export default class PostController {
    @Get('/:id')
    @Middleware(someMiddleware)
    public async get(req: Request, res: Response) {
        // Request handling logic...
    }
}
```

- - - - - -

Additionally, the 'Middleware' decorator can accept an array of functions, which can improve code structure and modularity.


```typescript
import { Controller, Get, Middleware, Response, Request } from '@wambata/express-decorators';

@Controller('/post')
@Middleware([ someMiddleware1, someMiddleware2 ])
export default class PostController {
    // ...
}
```

## Controller Extending

By default, when extending a controller, decorators applied to it and its methods are not inherited due to the peculiarities of the implementation of decorators in TypeScript and Babel. However, the `@wambata/express-decorators` library implements this feature by accessing the class prototype.

You just need to use the native `extended` syntax to extend the desired controller class, getting all its methods with stored decorators.

```typescript
@Controller('/user')
class UserController {
    @Get('/some')
    public async someMethod (req: Request, res: Response) {
        // Some logic ...
    }
}

@Controller('/admin')
class AdminController extends UserController {
    @Get('/some')
    public async someAdminMethod (req: Request, res: Response) {
        // Some admin logic ...
    }
}
```

In addition, an extensible class does not necessarily have to be registered as a controller, allowing you to add flexibility to your project by creating base classes.

```typescript
class BaseController {
    protected readonly _description: Description = {}

    @Get('/description')
    public async getNamespaceDescription (req: Request, res: Response) {
        res.send(this._description);
    }
}

@Controller('/user')
class UserController extends BaseController {
    protected readonly _description: Description = {
        // Some description ...
    }

    @Get('/some')
    public async someMethod (req: Request, res: Response) {
        // Some logic ...
    }
}
```

> It is important to cancel that decorators applied to a controller class are not intentionally inherited. In other words, if you extend a controller class, you will have to reapply the `Controller`, `Middleware` and/or `Api` decorators to it.

## ImportControllers

This auxiliary method allows you to automatically import all controllers that satisfy the passed _glob_ pattern. This can be useful if you have a large number of controllers and you want to automatically connect all of them. this  For instance:

> this method requires the controller to be exported by default.

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

> A feature of plugins in this library is that the order of controller imports matters. When using plugins, make sure that controllers are imported after plugin initialization, otherwise plugin events may not be called.

> To circumvent this problem and facilitate application scaling, the `ImportControllers` function is proposed, which automatically imports all controllers matching a given pattern.

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
import { config, ImportControllers, AttachControllers } from '@wambata/express-decorators';
import Express from 'express';
import MyPlugin from './my-plugin,'

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
3. `attach-http-method:before`
4. `attach-http-method:after`
5. `attach-controller:after`
6. `attach:end`

The groups of events listed below do not have a strict order of invocation. The order in which they are called will depend on the order in which the corresponding decorators are applied:

**Controller:**
- `set-controller:before`
- `set-controller:after`

**Http-Method:**
- `set-http-method:before`
- `set-http-method:after`

**Middleware:**
- `set-middleware:before`
- `set-middleware:after`

**Api:**
- `set-api:before`
- `set-api:after`

> When using plugins, consider this sequence of events to correctly plan and control plugin behavior.

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

- - - - - - - -

## Tests

For testing, use the standard `npm test` command or similar. This command can accept the following flags:

- `report-coverage` - Display the results of the test coverage check in the console. Pass the value `html-spa` to generate an application with the results.
- `skip-benchmarks-tests` - Skip benchmark testing.

These flags can pass both the values of the **npm config** (`npm run test --report-coverage` or `npm run test --report-coverage=html-spa`) and in the form of environment variables, which is useful when debugging in the IDE.

The results of the test coverage and benchmark check will be recorded in the `coverage` and `benchmarks` directories, respectively.

## Community Contribution

The code of this project tries to be obvious and understandable, and the documentation tries to be exhaustive. Any improvements and PR are welcome and will be reviewed. If you decide to improve this library and you have any questions, feel free to ask them!

It is important to follow two rules:
- Stick to the general style of writing code - try to use classes where appropriate and leave comments.
- Your solution must be covered by at least 75% of the tests.

Welcome!