import { IsAny } from '../common/common-utils';

/**
 * The intended function of the decorator.
 * @template This The context of the function.
 */
export type SupportProvideDecorator<This = any> =
	| ((this: This, ...args: any[]) => any)
	;

/**
 * Type constructor for determining the type of arguments by key.
 * @template DecoratorStage2 a function implementing the Stage 2 Proposal decorator.
 * @template DecoratorStage3 a function implementing the Stage 3 Proposal decorator.
 */
export interface SupportUniversePropertiesConstructor<
	DecoratorStage2 extends SupportProvideDecorator,
	DecoratorStage3 extends SupportProvideDecorator<ThisParameterType<DecoratorStage2>>,
> {
	controllerOrMethod: Parameters<DecoratorStage2 | DecoratorStage3>[0],
	nameOrContext: Parameters<DecoratorStage2 | DecoratorStage3>[1],
	descriptor?: Parameters<DecoratorStage2 | DecoratorStage3>[2],
}

/**
 * Function parameters to provide support.
 * @template DecoratorStage2 a function implementing the Stage 2 Proposal decorator.
 * @template DecoratorStage3 a function implementing the Stage 3 Proposal decorator.
 */
export type SupportProvideParams<
	DecoratorStage2 extends SupportProvideDecorator,
	DecoratorStage3 extends SupportProvideDecorator<ThisParameterType<DecoratorStage2>>,
	_Context = ThisParameterType<DecoratorStage2>,
> =
	| ( IsAny<_Context> extends true ? { bind?: any } : { bind: _Context })
	& { decoratorStage2: DecoratorStage2, decoratorStage3: DecoratorStage3 }
	;