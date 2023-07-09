import type { NextFunction, Request, Response } from 'express';

/**
 * Middleware for a controller or method.
 */
export type EntityMiddleware = (req: Request, res: Response, next: NextFunction) => any;