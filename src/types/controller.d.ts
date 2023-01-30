/**
 * Class controller.
 **/
export type ClassController =
	| (new (...args: any[]) => { _routerURL?: string, [K: string]: any } )
	;