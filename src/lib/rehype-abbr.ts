import { visit } from 'unist-util-visit';
import type { Root, Element, Text, ElementContent } from 'hast';

// Matches `*[ABBR]: Full Text` definitions. The leading `*` is optional because
// mdsvex's old remark parser sometimes consumes it as emphasis markup.
const ABBR_RE = /^\*?\[([^\]]+)\]:\s*(.+)$/;

// Don't replace abbreviations inside these elements — code/pre should stay
// literal, abbr would nest redundantly, and script/style aren't visible content.
const SKIP_TAGS = ['code', 'pre', 'abbr', 'script', 'style'];

/**
 * Rehype plugin that implements abbreviation support (PHP Markdown Extra syntax).
 *
 * Parses `*[ABBR]: Full Text` definitions from paragraph nodes, removes them,
 * and wraps all matching text occurrences in `<abbr title="...">` tags.
 *
 * Handles the quirk where mdsvex's old remark parser treats `*` as emphasis
 * when multiple definitions are on adjacent lines.
 */
export default function rehypeAbbr() {
	return (tree: Root) => {
		const abbreviations = new Map<string, string>();

		// Pass 1: collect abbreviation definitions from <p> nodes and remove them
		visit(tree, 'element', (node: Element, index, parent) => {
			if (node.tagName !== 'p' || !parent || index == null) return;

			const text = getTextContent(node).trim();
			const lines = text.split('\n').filter((l) => l.trim());
			if (lines.length === 0) return;

			const pairs: [string, string][] = [];
			for (const line of lines) {
				const match = line.trim().match(ABBR_RE);
				if (!match) return; // all lines must be definitions
				pairs.push([match[1], match[2]]);
			}

			for (const [abbr, title] of pairs) abbreviations.set(abbr, title);
			parent.children.splice(index, 1); // remove the definition paragraph
			return index; // revisit same index since array shifted
		});

		if (abbreviations.size === 0) return;

		// Sort longest-first so "HTML5" matches before "HTML", then escape for regex safety
		const sorted = [...abbreviations.keys()].sort((a, b) => b.length - a.length);
		const escaped = sorted.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
		const pattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'g');

		// Pass 2: walk all text nodes and replace matches with <abbr> elements
		visit(tree, 'text', (node: Text, index, parent) => {
			if (!parent || index == null) return;
			if (
				'tagName' in parent &&
				typeof parent.tagName === 'string' &&
				SKIP_TAGS.includes(parent.tagName)
			)
				return;

			const parts: ElementContent[] = [];
			let lastIndex = 0;

			pattern.lastIndex = 0;
			let match;
			while ((match = pattern.exec(node.value)) !== null) {
				if (match.index > lastIndex) {
					parts.push({ type: 'text', value: node.value.slice(lastIndex, match.index) });
				}
				parts.push({
					type: 'element',
					tagName: 'abbr',
					properties: { title: abbreviations.get(match[1]) },
					children: [{ type: 'text', value: match[1] }]
				});
				lastIndex = match.index + match[0].length;
			}

			if (parts.length === 0) return;
			if (lastIndex < node.value.length) {
				parts.push({ type: 'text', value: node.value.slice(lastIndex) });
			}

			parent.children.splice(index, 1, ...parts);
			return index + parts.length;
		});
	};
}

function getTextContent(node: ElementContent | Element): string {
	if (node.type === 'text') return node.value;
	if ('children' in node) return node.children.map(getTextContent).join('');
	return '';
}
