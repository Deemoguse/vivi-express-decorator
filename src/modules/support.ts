import { config } from './config';
import type { SupportStageProposal } from '../types/support/support-stage-proposal';
import type { ClassDecoratorContext, ClassMethodDecoratorContext } from '../types/common/common-type-provider';
import type { SupportProvideDecorator, SupportProvideParams, SupportUniversePropertiesConstructor } from '../types/support/support';

/**
 * Providing compatibility support between `Stage 2` and `Stage 3` Proposals.
 *
 * _Through some calculations and checks, determine the current version of the
 * Decorator Stage Proposal in order to cache the result and not waste resources
 * on repeated checks._
 */
export class Support {
	/**
	 * A certain stage of the proposal.
	 */
	public static stageProposal: SupportStageProposal = config.support;

	// Decorator for check:
	private static _defineStageProposal (
		target: Function | object,
		nameOrContext?: string | ClassDecoratorContext | ClassMethodDecoratorContext,
		descriptor?: PropertyDescriptor,
	): void {
		// Is Stage 2 Proposal:
		if (
			typeof descriptor?.value &&
			(typeof target === 'object' || typeof target === 'function') &&
			(typeof nameOrContext === 'string' || typeof nameOrContext === 'undefined')
		) {
			Support.stageProposal = 2;
		}

		// Is Stage 3 Proposal
		else if (
			typeof target === 'function' &&
			typeof nameOrContext === 'object'
		) {
			Support.stageProposal = 3;
		}

		// Throw Error:
		else throw Error([
			'Error: The current Decorator Stage Proposal could not be determined.',
			'Please use the "config.support" object of this package to set the current Decorator Stage Proposal.',
		].join('\n'));
	}

	/**
	 * To ensure type safety and compatibility of different versions of decorators.
	 * Returns a new function with unified types.
	 * - - - - - - -
	 * @param decoratorStage2 - The decorator implementing the Stage 2 Proposal.
	 * @param decoratorStage3 - The decorator implementing the Stage 3 Proposal.
	 */
	public static provide<
		DecoratorStage2 extends SupportProvideDecorator,
		DecoratorStage3 extends SupportProvideDecorator<ThisParameterType<DecoratorStage2>>,
		_Arguments extends SupportUniversePropertiesConstructor<DecoratorStage2, DecoratorStage3>
	> (
		params: SupportProvideParams<DecoratorStage2, DecoratorStage3>,
	) {
		return function (
			controllerOrMethod: _Arguments['controllerOrMethod'],
			nameOrContext?: _Arguments['nameOrContext'],
			descriptor?: _Arguments['descriptor'],
		) {
			if (Support.stageProposal === 'auto') {
				Support._defineStageProposal(controllerOrMethod, nameOrContext, descriptor);
			}
			const result = Support.stageProposal === 2
				? params.decoratorStage2.bind(params.bind)
				: params.decoratorStage3.bind(params.bind);

			return result(controllerOrMethod, nameOrContext, descriptor);
		};
	}
}