/**
 *	Correction of the route path. Removes invalid characters, incorrect slashes and their duplicates.
 * @param path - Path to route.
 */
export function fixPath (path: string): string {
	return `/${path.split(/[\\/]/).filter(w => w.match(/\w+/)).join('/')}`;
}