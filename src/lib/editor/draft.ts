const STORAGE_KEY = 'blog-draft';

export interface Draft {
	title: string;
	slug: string;
	markdown: string;
}

/**
 * Resolve the initial editor state from the available sources.
 *
 * Priority:
 *  1. Existing file on disk (passed via page server load when ?slug= is set)
 *     → editing a published post, localStorage is ignored
 *  2. localStorage draft (auto-saved while writing a new post)
 *     → resumes an unsaved session
 *  3. Blank slate
 *     → brand new post
 */
export function resolveInitialDraft(fromServer: Draft): Draft {
	// If the server returned markdown, we're editing an existing published post
	if (fromServer.markdown) return fromServer;

	// Otherwise check localStorage for an auto-saved draft
	const saved = loadDraft();
	if (saved) return saved;

	// Nothing saved — start fresh
	return { title: '', slug: '', markdown: '' };
}

export function loadDraft(): Draft | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

export function saveDraft(draft: Draft) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function clearDraft() {
	localStorage.removeItem(STORAGE_KEY);
}
