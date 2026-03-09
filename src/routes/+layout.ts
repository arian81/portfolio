import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_KEY } from '$env/static/public';

// Enable prerendering for all pages in the app
export const prerender = true;

export const load = async () => {
	if (browser && !window.location.hostname.includes('localhost')) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
			api_host: '/u',
			ui_host: 'https://us.posthog.com',
			defaults: '2026-01-30',
			capture_exceptions: true
		});
	}
};
