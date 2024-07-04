import { Pet } from '@prisma/client';

// export type Pet = z.infer<typeof petSchema>;

export type PetEssentials = Omit<Pet, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;
