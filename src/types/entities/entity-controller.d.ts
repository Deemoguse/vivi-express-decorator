/**
 * Controller.
 */
export type EntityController =
	| Function
	& (new (...args: any) => any)