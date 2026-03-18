import { browser, dev } from '$app/environment';
import { PUBLIC_POSTHOG_KEY } from '$env/static/public';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

injectAnalytics({ mode: dev ? 'development' : 'production' });

// Enable prerendering for all pages in the app
export const prerender = true;

export const load = async () => {
	if (browser && !window.location.hostname.includes('localhost')) {
		// Defer PostHog initialization to avoid blocking initial render
		const init = () =>
			import('posthog-js').then(({ default: posthog }) => {
				posthog.init(PUBLIC_POSTHOG_KEY, {
					api_host: '/u',
					ui_host: 'https://us.posthog.com',
					defaults: '2026-01-30',
					capture_exceptions: true
				});
			});

		if ('requestIdleCallback' in window) {
			window.requestIdleCallback(init);
		} else {
			setTimeout(init, 200);
		}
	}
};
