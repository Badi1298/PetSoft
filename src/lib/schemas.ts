import { z } from 'zod';

export const petSchema = z.object({
	id: z.string(),
	name: z.string(),
	ownerName: z.string(),
	imageUrl: z.string(),
	age: z.number(),
	notes: z.string(),
});

export const petListSchema = z.array(
	z.object({
		id: z.string(),
		name: z.string(),
		ownerName: z.string(),
		imageUrl: z.string(),
		age: z.number(),
		notes: z.string(),
	})
);
