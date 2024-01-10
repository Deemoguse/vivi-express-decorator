/**
 * Type constructor for determining the type of arguments by key.
 */
export interface SupportUniversePropertiesConstructor<
	Stage2Decorator extends (...args: any) => void,
	Stage3Decorator extends (...args: any) => void
> {
	controllerOrMethod: Parameters<Stage2Decorator | Stage3Decorator>[0],
	nameOrContext: Parameters<Stage2Decorator | Stage3Decorator>[1],
	descriptor?: Parameters<Stage2Decorator | Stage3Decorator>[2],
}