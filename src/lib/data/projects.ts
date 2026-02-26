import gitfasterImg from '$lib/assets/projects/gitfaster.png?enhanced';
import deltahacksImg from '$lib/assets/projects/deltahacks.png?enhanced';
import raycastImg from '$lib/assets/projects/raycast.png?enhanced';
import socraticaImg from '$lib/assets/projects/socratica.png?enhanced';
import just1Img from '$lib/assets/projects/just1.png?enhanced';
import scubaImg from '$lib/assets/projects/scuba.png?enhanced';
import mcoutlineImg from '$lib/assets/projects/mcoutline.png?enhanced';
import wasmImg from '$lib/assets/projects/wasm.png?enhanced';
import mcwtaImg from '$lib/assets/projects/wta.png?enhanced';
import type { Picture } from '@sveltejs/enhanced-img';

export interface Project {
	title: string;
	description: string;
	image: Picture;
	link: string;
	repo: string;
}

export const projects: Project[] = [
	{
		title: 'Gitfaster',
		description: 'Blazing-fast Github client',
		image: gitfasterImg,
		link: 'https://gitfaster.dev/',
		repo: 'https://github.com/Krish120003/gitfaster'
	},
	{
		title: 'Deltahacks Portal',
		description:
			'A unified hackathon platform for streamlined interaction between attendees and organizers',
		image: deltahacksImg,
		link: 'https://portal.deltahacks.com/',
		repo: 'https://github.com/deltahacks/portal'
	},
	{
		title: 'Socratica Merch',
		description: "Merch website for Socratica's Symposium",
		image: socraticaImg,
		link: 'https://socratica.supply/',
		repo: 'private'
	},
	{
		title: 'Mymind Raycast Extention',
		description: 'A Raycast extension to manage mymind bookmarks',
		image: raycastImg,
		link: 'https://www.raycast.com/arian/mymind',
		repo: 'https://github.com/raycast/extensions/tree/main/extensions/mymind'
	},
	{
		title: 'just1',
		description: 'Find places to go to using Gemini and Google maps API',
		image: just1Img,
		link: 'http://just1.place',
		repo: 'https://github.com/arian81/just1'
	},
	{
		title: 'Scuba',
		description:
			'AI-powered email agent that automates responses, prioritizes tasks, and performs actions based on email content using RAG and LLM technologies.',
		image: scubaImg,
		link: '#',
		repo: 'https://github.com/arian81/scuba'
	},
	{
		title: 'When the Assignment',
		description: 'An easy way to keep track of upcoming assignments',
		image: mcwtaImg,
		link: 'https://mcwta.vercel.app/',
		repo: 'https://github.com/arian81/when-the-assignment'
	},
	{
		title: 'Portfolio',
		description: 'This website. Look around :)',
		image: gitfasterImg,
		link: 'https://arian.gg/',
		repo: 'https://github.com/arian81/portfolio'
	},
	{
		title: 'McOutline',
		description: 'Find and share course outlines',
		image: mcoutlineImg,
		link: 'https://www.mcoutline.ca/',
		repo: 'https://github.com/arian81/mc-outline'
	},
	{
		title: 'WebAssembly IDE',
		description: 'Write WebAssembly code in your browser',
		image: wasmImg,
		link: 'https://wasm.arian.gg/',
		repo: 'https://github.com/arian81/wasm-ide'
	}
];
