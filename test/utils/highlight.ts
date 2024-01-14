import colors from 'colors';
import type { Color } from 'colors';

/**
 * Description of the matching color rule in a string:
 */
interface HighlightRule {
	match: RegExp,
	style: Color,
}

/**
 * List of rules.
 */
type HighlightRules =
	| Record<string, HighlightRule>
	;

/**
 * HighlighText function Options.
 */
interface HighlighTextOptins<Rules extends HighlightRules = any> {
	/**
	 * Expand the highlight settings.
	 */
	extends?: { [K in keyof Rules]?: HighlightRule['style'] }

	/**
	 * Expand the highlight settings for inline syntax.
	 */
	extendsInlineSyntax?: HighlightRule['style']
};

// All the rules for matching matches in strings:
const rules: HighlightRules = {
	objectProperties: {
		match: /\w+(?=\.\w+)|\.(\w+)/g,
		style: colors.bold.yellow,
	},
	decorators: {
		match: /@[\w]+/g,
		style: colors.bold.yellow,
	},
	keywords: {
		match: /\b(ImportControllers|AttachControllers|prefixApi)\b/g,
		style: colors.bold.yellow,
	},
	httpMethods: {
		match: /\b(?<!@)(Get|Put|Post|Patch|Delete|Head|Trace|Options|Connect)\b/g,
		style: colors.bold.magenta,
	},
	classes: {
		match: /\b(([A-Z]\w+)?Error|Plugin|Storage|Map|Support)\b/g,
		style: colors.bold.green,
	},

	// Uniq:
	storageMethods: {
		match: /\b(storage|setIsApi|setMiddleware|setController|setHttpMethod|removeInactiveControllers)\b/g,
		style: colors.bold.yellow,
	},
};


/**
 * Highlight matches described in {@link rules}
 */
export default function highlighText (input: string, options?: HighlighTextOptins<typeof rules>): string {
	const inlineStylesMap: Record<number, string> = {};

	// Processing an inline sub-color request:
	input = input.replace(/<([^<>]+)\|([^<>]+)>/g, (_, text, styles: string) => {
		const id = Math.ceil(Math.random() * Date.now());
		const style = styles.split('-').reduce((acc, current) => acc[current], colors as any);
		const extendStyle = options?.extendsInlineSyntax;
		const coloredText = style(text);

		// Add mark to map:
		inlineStylesMap[id] = extendStyle ? extendStyle(coloredText) : coloredText;

		// Return id:
		return id.toString();
	});

	// Process the text according to the rules:
	for (const key in rules) {
		const rule = rules[key];
		const extendStyle = options?.extends?.[key];
		const coloredText = input.replace(rule.match, (match) => rule.style(match));
		input = extendStyle ? extendStyle(coloredText) : coloredText;
	}

	// Replacing labels with the result of an inline color query:
	for (const id in inlineStylesMap) {
		const style = inlineStylesMap[id];
		input = input.replace(id, style);
	}

	// Return a string with highlighted matches:
	return input;
}

// Export shortcuts:
export const hl = highlighText;
export const hld = (text: string) => highlighText(text, {
	extends: Object.fromEntries(Object.keys(rules).map((k) => [ k, colors.dim ])),
	extendsInlineSyntax: colors.dim,
});