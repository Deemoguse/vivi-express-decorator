import path from 'path';
import { glob } from 'glob';
import { EntityController } from '../types/entities/entity-controller';

/**
 * Auxiliary tool for importing controllers according to a given glob pattern.
 * @param path - Glob path pattern.
 */
export async function ImportControllers (pattern: string): Promise<any> {
	console.log(pattern);
	// const paths = await glob();
	// const controllers: EntityController[] = [];

	// for await (const controllerPath of paths) {
	// 	const controller = await import(controllerPath);
	// 	controllers.push(controller.default);
	// }

	// return controllers;
}