import yaml from 'js-yaml';
import { z } from 'zod';
import rawYaml from '../../../shared-data/experience.yaml?raw';

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

export type Experience = z.infer<typeof ExperienceSchema>;

export const experience: Experience[] = z.array(ExperienceSchema).parse(yaml.load(rawYaml));
