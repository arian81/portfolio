import gitfasterImg from '$lib/assets/projects/gitfaster.png?enhanced';
import deltahacksImg from '$lib/assets/projects/deltahacks.png?enhanced';
import raycastImg from '$lib/assets/projects/raycast.png?enhanced';
import socraticaImg from '$lib/assets/projects/socratica.png?enhanced';
import just1Img from '$lib/assets/projects/just1.png?enhanced';
import scubaImg from '$lib/assets/projects/scuba.png?enhanced';
import mcoutlineImg from '$lib/assets/projects/mcoutline.png?enhanced';
import wasmImg from '$lib/assets/projects/wasm.png?enhanced';
import mcwtaImg from '$lib/assets/projects/wta.png?enhanced';
import portfolioImg from '$lib/assets/projects/portfolio.png?enhanced';
import type { Picture } from '@sveltejs/enhanced-img';

export interface Project {
	title: string;
	description: string;
	image: Picture;
	url: string;
	repo: string;
	color: string;
}

export const projects: Project[] = [
	{
		title: 'Gitfaster',
		description: 'Blazing fast GitHub client with smart prefetching and caching',
		image: gitfasterImg,
		url: 'https://gitfaster.dev/',
		repo: 'https://github.com/Krish120003/gitfaster',
		color: 'bg-polaroid-tan'
	},
	{
		title: 'Deltahacks Portal',
		description:
			'A unified hackathon platform for streamlined interaction between attendees and organizers',
		image: deltahacksImg,
		url: 'https://portal.deltahacks.com/',
		repo: 'https://github.com/deltahacks/portal',
		color: 'bg-polaroid-lavender'
	},
	{
		title: 'Socratica Merch',
		description: "Merch store built for Socratica's Symposium event at UWaterloo",
		image: socraticaImg,
		url: 'https://socratica.supply/',
		repo: 'private',
		color: 'bg-polaroid-taupe'
	},
	{
		title: 'Mymind Raycast Extention',
		description: 'Raycast extension to quickly save, search, and manage mymind bookmarks',
		image: raycastImg,
		url: 'https://www.raycast.com/arian/mymind',
		repo: 'https://github.com/raycast/extensions/tree/main/extensions/mymind',
		color: 'bg-polaroid-rose'
	},
	{
		title: 'just1',
		description: 'Discover nearby places to visit using Gemini and Google Maps',
		image: just1Img,
		url: 'http://just1.place',
		repo: 'https://github.com/arian81/just1',
		color: 'bg-polaroid-butter'
	},
	{
		title: 'Scuba',
		description: 'AI powered email agent that automates responses and prioritizes tasks',
		image: scubaImg,
		url: '#',
		repo: 'https://github.com/arian81/scuba',
		color: 'bg-polaroid-mauve'
	},
	{
		title: 'When the Assignment',
		description: 'Track and manage upcoming course assignments in one place',
		image: mcwtaImg,
		url: 'https://mcwta.vercel.app/',
		repo: 'https://github.com/arian81/when-the-assignment',
		color: 'bg-polaroid-tan'
	},
	{
		title: 'Portfolio',
		description:
			'My personal portfolio built with SvelteKit and Tailwind. You are looking at it :)',
		image: portfolioImg,
		url: '#',
		repo: 'https://github.com/arian81/portfolio',
		color: 'bg-polaroid-stone'
	},
	{
		title: 'McOutline',
		description:
			'Centralized archive to browse and share McMaster course outlines with local first uploads',
		image: mcoutlineImg,
		url: 'https://www.mcoutline.ca/',
		repo: 'https://github.com/arian81/mc-outline',
		color: 'bg-polaroid-maroon'
	},
	{
		title: 'WebAssembly IDE',
		description: 'Browser based IDE for writing and running WebAssembly code',
		image: wasmImg,
		url: 'https://wasm.arian.gg/',
		repo: 'https://github.com/arian81/wasm-ide',
		color: 'bg-polaroid-sage'
	}
];
