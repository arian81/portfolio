import { redirect } from '@sveltejs/kit';

export const prerender = false;

export function load({ params }) {
	redirect(302, `/blog/edit?slug=${params.slug}`);
}
