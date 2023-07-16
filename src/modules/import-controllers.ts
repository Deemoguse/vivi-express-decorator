import { glob } from 'glob';
import { EntityController } from '../types/entities/entity-controller';

/**
 * Auxiliary tool for importing controllers according to a given glob pattern.
 * @param path - Glob path pattern.
 */
export async function ImportControllers (pattern: string): Promise<any> {
	const paths = await glob(pattern, { absolute: true });
	const controllers: EntityController[] = [];

	for await (const controllerPath of paths) {
		const controller = await import(controllerPath);
		controllers.push(controller.default);
	}

	return controllers;
}