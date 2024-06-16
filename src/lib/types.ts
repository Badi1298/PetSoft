import { z } from 'zod';
import { petSchema } from './schemas';

export type Pet = z.infer<typeof petSchema>;
