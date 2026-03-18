import { z } from 'zod';
import data from './blogPosts.json';

const blogPostSchema = z.object({
	url: z.string(),
	title: z.string(),
	date: z.string()
});

export type BlogPost = z.infer<typeof blogPostSchema>;
export const blogPosts: BlogPost[] = z.array(blogPostSchema).parse(data);

const topPostTitles = ["How to rid yourself of 'shorts'", 'How I Hacked HackMIT'];

export const topPosts = blogPosts.filter((p) => topPostTitles.includes(p.title));
