import { config } from './config';
import type { SupportStageProposal } from '../types/support/support-stage-proposal';
import type { SupportUniversePropertiesConstructor } from '../types/support/support';

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
	private static _stageProposal: SupportStageProposal = config.support;

	// Define Stage Proposal:
	static {
		if (config.support !== 'auto') {
			class foo { @this._defineStageProposal bar () {}}
		}
	}

	// Decorator for check:
	private static _defineStageProposal (
		target: Function | object,
		nameOrContext: string | DecoratorContext,
		descriptor?: PropertyDescriptor,
	): void {
		// Is Stage 2 Proposal:
		if (
			typeof target === 'function' &&
			typeof nameOrContext === 'string' &&
			typeof descriptor?.value === 'function'
		) {
			Support._stageProposal = 2;
		}

		// Is Stage 3 Proposal
		if (
			descriptor === undefined &&
			typeof target === 'function' &&
			typeof nameOrContext === 'object'
		) {
			Support._stageProposal = 3;
		}

		// Throw Error:
		throw Error([
			'Error: The current Decorator Stage Proposal could not be determined.',
			'Please use the "config.support" object of this package to set the current Decorator Stage Proposal.',
		].join('\n'));
	}

	/**
	 * To ensure type safety and compatibility of different versions of decorators.
	 * Returns a new function with unified types.
	 *
	 * @param decoratorStage2 - The decorator implementing the Stage 2 Proposal.
	 * @param decoratorStage3 - The decorator implementing the Stage 3 Proposal.
	 */
	public static provide<
		DecoratorStage2 extends (...args: any[]) => any,
		DecoratorStage3 extends (...args: any[]) => any,
		_Arguments extends SupportUniversePropertiesConstructor<DecoratorStage2, DecoratorStage3>
	> (
		decoratorStage2: DecoratorStage2,
		decoratorStage3: DecoratorStage3,
	) {
		return function (
			controllerOrMethod: _Arguments['controllerOrMethod'],
			nameOrContext?: _Arguments['nameOrContext'],
			descriptor?: _Arguments['descriptor'],
		) {
			return Support._stageProposal === 2
				? decoratorStage2(controllerOrMethod, nameOrContext, descriptor)
				: decoratorStage3(controllerOrMethod, nameOrContext)
				;
		};
	}
}