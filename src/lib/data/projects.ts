import gitfasterImg from '$lib/assets/projects/gitfaster.png?enhanced';
import type { Picture } from '@sveltejs/enhanced-img';

export interface Project {
	title: string;
	description: string;
	image: Picture;
	link: string;
}

export const projects: Project[] = [
	{
		title: 'Gitfaster',
		description: 'Blazing-fast Github client',
		image: gitfasterImg,
		link: 'https://gitfaster.dev/'
	},
	{
		title: 'Deltahacks Portal',
		description:
			'A unified hackathon platform for streamlined interaction between attendees and organizers',
		image: gitfasterImg,
		link: 'https://github.com/deltahacks/portal'
	},
	{
		title: 'Socratica Merch',
		description: "Merch website for Socratica's Symposium",
		image: gitfasterImg,
		link: 'https://socratica.supply/'
	},
	{
		title: 'Mymind Raycast Extention',
		description: 'A Raycast extension to manage mymind bookmarks',
		image: gitfasterImg,
		link: 'https://www.raycast.com/arian/mymind'
	},
	{
		title: 'just1',
		description: 'Find places to go to using Gemini and Google maps API',
		image: gitfasterImg,
		link: 'http://just1.place'
	},
	{
		title: 'Scuba',
		description:
			'AI-powered email agent that automates responses, prioritizes tasks, and performs actions based on email content using RAG and LLM technologies.',
		image: gitfasterImg,
		link: 'https://github.com/arian81/scuba'
	},
	{
		title: 'When the Assignment',
		description: 'An easy way to keep track of upcoming assignments',
		image: gitfasterImg,
		link: 'https://mcwta.vercel.app/'
	},
	{
		title: 'Dash',
		description:
			'Personalized digital dashboard to centralize frequently used web resources through widgets for email, calendars, Github updates and etc.',
		image: gitfasterImg,
		link: 'https://github.com/Krish120003/dash'
	},
	{
		title: 'Portfolio',
		description: 'This website. Look around :)',
		image: gitfasterImg,
		link: 'https://arian.gg/'
	},
	{
		title: 'McOutline',
		description: 'Find and share course outlines',
		image: gitfasterImg,
		link: 'https://www.mcoutline.ca/'
	},
	{
		title: 'WebAssembly IDE',
		description: 'Write WebAssembly code in your browser',
		image: gitfasterImg,
		link: 'https://wasm.arian.gg/'
	}
];
