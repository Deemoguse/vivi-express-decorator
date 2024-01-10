import { glob } from 'glob';
import type { EntityController } from '../types/entities/entity-controller';

/**
 * Auxiliary tool for importing controllers according to a given glob pattern.
 * @example
 * ```ts
 * import { AttachControllers, ImportControllers } from '@wambata/express-decorators';
 *
 * // (for upper-level await):
 * AttachControllers(app, await ImportControllers('controllers/*.contrller.ts'));
 *
 * // The usual use of promises:
 * ImportControllers('controllers/*.contrller.ts')
 *    .then((controllers) => AttachControllers(app, controllers));
 * ```
 * @param relativePattern - Glob path pattern.
 * @throws {ReferenceError} The module has no export by default.
 */
export async function ImportControllers (relativePattern: string): Promise<EntityController[]> {
	const paths = await glob(relativePattern, { absolute: true });
	const controllers: EntityController[] = [];

	for await (const controllerPath of paths) {
		const controller = await import(controllerPath);

		if (controller.default) {
			controllers.push(controller.default);
		} else {
			throw new ReferenceError('Error: the module should have a default export');
		}
	}

	return controllers;
}