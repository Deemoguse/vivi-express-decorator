/**
 * Controller Method.
 */
export type EntityHttpMethod<
	This extends any = any,
	Args extends any[] = any,
	Return extends any = any,
> =
	| ((this: This, ...args: Args) => Return)
	;