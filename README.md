# WAMBATA. Express-decorators.

A minimalistic package that supplies decorator functions for working with Express controller classes.

* * * * *

## Installation
To install, run the following command:
```bash
$ npm i --save-dev @vivi/express-decorators
```

## Controller Declaration
Import the necessary module components and use them as decorators for the controller class:
```js
import { Controller, Get, Post, Api } from '@wambata/express-decorators';

@Controller('/post')
export class PostController
{
	@Get('/:id')
	async public getPost (req, res) {/* . . . */}

	@Api()
	@Post('/create/')
	async public setPost (req, res) {/* . . . */}
}
```

## Using the controller
Alternatively, you can call this function and pass the application instance to it with the first argument, and an array of controllers with the second:
```js
import express               from 'express';
import { AttachControllers } from '@wambata/express-decorators';
import { PostController }    from '@controllers/post.controller';

const app = express();

AttachControllers(app, [ PostController ]);

app.listen(8080);
```

## Controller, HTTP methods, API and Middleware
This package contains decorators for declaring any route method (`GET`, `POST`, `DELETE`, etc.). In addition, it has an `Api` decorator for declaring a method as part of the REST API and `Middleware` for embedding middleware for routes. The `Controller` decorator is needed to declare the parent class as a route, from which it will inherit the URL for the child routes:
```js
@Controller('/post')
class PostController
{
	@Get('/:id')
	getPost () {/* will be available at "/post/1" */}

	@Post('/set')
	setPost () {/* will be available at "/post/set" */}
}
```

The `Api` decorator works in such a way that for these rules the inherited URL expands and acquired the prefix `/api/`. This generally changes the target URL at which this router will be accessible. if the  `/api` prefix does not suit you, change the configuration of the property apiURL in the `config` module:
```js
import { ..., config } from '@wambata/express-decorators';

config.apiURL = '/my/api/path';

@Controller('/post')
class PostController
{
	@Get('/:id')
	getPost () {/* will be available at "/post/all" */}

	@Api()
	@Post('/set')
	setPost () {/* will be available at "/my/api/path/post/create" */}
}
```

The Api decorator must be placed above the HTTP method decorator. Otherwise it will cause an error:
```js
@Controller('/post')
class PostController
{
	@Post('/set')
	@Api()
	setPost () {/* × Incorrect! */}
	// VS
	@Api()
	@Post('/set')
	setPost () {/* ° Correct! */}
}
```

The location of the middleware decorator does not matter, unlike the position of the Api decorator. This decorator accepts a function or an array of functions that will be assigned to the route as middleware. This Decorator can be used for methods and for controllers:
```js
@Controller('/post')
@Middleware(UpdateVisitTimeMiddleware)
class PostController
{
	@Api()
	@Get('/:id')
	getPost () {/* . . . */}

	@Api()
	@Post('/set')
	@Middleware(UserIsAuthMiddleware)
	setPost () {/* . . . */}
}
```

## Testing
Run this command:
```bash
$ npm run test
```

## Participation and development
You can also import a repository and extend\override its methods to change the behavior of decorators. Check out the source code to learn more. Let me know if you have any suggestions for this package.
