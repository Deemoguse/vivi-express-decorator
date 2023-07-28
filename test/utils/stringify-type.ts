/**
 * Convert the passed value to a string representation
 * @param any - some value.
 */
export function stringifyType (any: any): string {
	switch (typeof any) {
		case 'boolean': {
			return any ? 'true' : 'false';
		}
		case 'bigint': case 'number': {
			return any.toString();
		}
		case 'string': {
			return `"${any}"`;
		}
		case 'object': {
			if (Array.isArray(any)) {
				const arr = any.map(el => stringifyType(el));
				return arr.length ? `[ ${arr.join(', ')} ]` : '[ empty array ]';
			} else if (any.constructor) {
				return `class ${any.constructor.name}`;
			} else {
				return JSON.stringify(any);
			}
		}
		case 'function': {
			return `function ${any.name}`;
		}
		default: {
			return typeof any;
		}
	}
}