import type { Request, Response, NextFunction } from 'express';

/**
 * HTTP methods of the controller class.
 **/
export type Method<R extends boolean = false> =
	| R extends true
		? ((req: Request, res: Response, next: NextFunction) => void)
		: ((req?: Request, res?: Response, next?: NextFunction) => void)
	;