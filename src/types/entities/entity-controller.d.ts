/**
 * Controller.
 */
export type EntityController<
	This extends any = any,
	Args extends any[] = any,
> =
	| (new (...args: Args) => This)
	;