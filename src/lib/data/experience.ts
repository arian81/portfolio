import yaml from 'js-yaml';
import { z } from 'zod';
import rawYaml from '../../../shared-data/experience.yaml?raw';
import { formatDateRange } from '$lib/helpers';

const ExperienceSchema = z.object({
	company: z.string(),
	role: z.string(),
	location: z.string(),
	url: z.string(),
	stack: z.string(),
	startDate: z.string().regex(/^\d{4}-\d{2}$/),
	endDate: z.union([z.string().regex(/^\d{4}-\d{2}$/), z.literal('Present')]),
	highlights: z.array(z.string())
});

export type RawExperience = z.infer<typeof ExperienceSchema>;

const rawExperience: RawExperience[] = z.array(ExperienceSchema).parse(yaml.load(rawYaml));

export const experience = rawExperience.map(({ company, role, url, startDate, endDate }) => ({
	type: 'experience' as const,
	company,
	role,
	mobileRole: role.replace('Software Engineer', 'SWE'),
	url,
	date: formatDateRange(startDate, endDate)
}));

export type Experience = (typeof experience)[0];
