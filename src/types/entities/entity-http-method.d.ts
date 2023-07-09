import type { Request, Response } from 'express';

/**
 * Controller Method.
 */
export type EntityHttpMethod = (req?: Request, res?: Response) => any;