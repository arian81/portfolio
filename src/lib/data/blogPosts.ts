import type { Pathname } from '$app/types';

interface BlogPost {
	url: Pathname;
	title: string;
	date: string;
}
export const blogPosts: BlogPost[] = [
	{
		url: '/blog/how-to-rid-yourself-of-shorts',
		title: "How to rid yourself of 'shorts'",
		date: '2025'
	},
	{ url: '/blog/how-i-hacked-hackmit', title: 'How I Hacked HackMIT', date: '2025' }
];
