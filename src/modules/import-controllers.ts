import { glob } from 'glob';
import { EntityController } from '../types/entities/entity-controller';

/**
 * Auxiliary tool for importing controllers according to a given glob pattern.
 * @param path - Glob path pattern.
 */
export async function ImportControllers (pattern: string): Promise<EntityController[]> {
	const paths = await glob(pattern, { absolute: true });
	const controllers: EntityController[] = [];

	for await (const controllerPath of paths) {
		const controller = await import(controllerPath);

		if (controller.default) {
			controllers.push(controller.default);
		} else {
			throw new ReferenceError('Erro: the module should have a default export');
		}
	}

	return controllers;
}