import type { Pathname } from '$app/types';
import { z } from 'zod';
import data from './blogPosts.json';

const blogPostSchema = z.object({
	url: z.string().transform((v) => v as Pathname), //svelete creates list of all valid paths and expects it
	title: z.string(),
	date: z.string()
});

export type BlogPost = z.infer<typeof blogPostSchema>;
export const blogPosts: BlogPost[] = z.array(blogPostSchema).parse(data);

const topPostTitles = ["How to rid yourself of 'shorts'", 'How I Hacked HackMIT'];

export const topPosts = blogPosts.filter((p) => topPostTitles.includes(p.title));
