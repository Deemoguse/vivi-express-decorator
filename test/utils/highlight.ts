import { reset } from 'colors';
import type { Color } from 'colors';
import type { Http } from '../../src/types/common/common-http';

/**
 * Description of the matching color rule in a string:
 */
interface HighlightRule {
	match: (string)[] | RegExp,
	params: (keyof Color)[],
}

/**
 * List of rules.
 */
type HighlightRules = Record<string, HighlightRule>;

/**
 * HighlighText function Options.
 */
interface HighlighTextOptins<Rules extends HighlightRules = any> {
	/**
	 * Expand the highlight settings.
	 */
	extends: { [K in keyof Rules]?: HighlightRule['params'] }
};

// All the rules for matching matches in strings:
const rules = {
	decorators: {
		match: /@[\w]+/,
		params: [ 'bold', 'yellow' ]
	},
	keywords: {
		match: [ 'Connect', 'Delete', 'Get', 'Head', 'Options', 'Patch', 'Post', 'Put', 'Trace', 'prefixApi' ] as ('prefixApi' | Http)[],
		params: [ 'bold', 'yellow' ]
	},
} satisfies HighlightRules;

/**
 * Highlight matches described in {@link rules}
 */
export default function highlighText (text: string, options?: HighlighTextOptins<typeof rules>): string {
	// We process the text according to the rules:
	for (const [ key, rule ] of Object.entries(rules)) {
		// We form a complete array of color matching rules for matches:
		const params = [ ...rule.params, ...(options?.extends[key as keyof typeof rules] || []) ];

		// Defining expressions to search for matches:
		const regExp = Array.isArray(rule.match)
			? new RegExp(`(${rule.match.join('|')})`)
			: new RegExp(rule.match, 'g');

		// We highlight matches according to the parameters:
		text = text.replace(regExp, (match) => {
			return params.reduce((acc, current) => acc[current], reset)(match);
		})
	}

	// Return a string with highlighted matches:
	return text;
}

// Export shortcuts:
export const hl = highlighText;
export const hld = (text: string) => highlighText(text, {
	extends: Object.fromEntries(Object.keys(rules).map((k) => [k, [ 'dim' ]]))
})