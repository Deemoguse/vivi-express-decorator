import { Controller, Get, Api, config, Middleware } from './';

@Controller('/post')
class HomeController {


	@Middleware(console.log)
	@Get('/all-post')
	@Api()
	public getAllPost () {

	}
}

console.log(Array.from(config.storage.storage.values())[0].httpMethods)