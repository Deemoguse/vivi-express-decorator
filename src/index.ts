import { Get } from './decorators/methods';

// Export modules:
export { config } from './modules/config';
export { Storage } from './modules/storage';
export { Plugin } from './modules/plugin';
export { ImportControllers } from './modules/import-controllers';
export { AttachControllers } from './modules/attach-controllers';

export * from './decorators/api';
export * from './decorators/methods';
export * from './decorators/controller';
export * from './decorators/middleware';

// Export types:
export type { Request, Response, NextFunction } from 'express';
export type { Meta } from './types/meta/meta';
export type { StorageBase } from './types/storage/storage-base';
export type { CommonConfig } from './types/common/common-config';
export type { MetaController } from './types/meta/meta-controller';
export type { MetaHttpMethod } from './types/meta/meta-http-method';
export type { PluginEventMap } from './types/plugin/plugin-events-map';

class BaseController {
	protected readonly _description: Description = {}

	@Get('/description')
	public async getNamespaceDescription (req: Request, res: Response) {
		req.s(this._description);
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