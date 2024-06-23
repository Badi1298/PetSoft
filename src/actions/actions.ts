'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/db';
import { Pet } from '@prisma/client';
import { PetEssentials } from '@/lib/types';

import { sleep } from '@/lib/utils';
import { petFormSchema, petIdSchema } from '@/lib/schemas';

export async function addPet(pet: unknown) {
	const parsedPet = petFormSchema.safeParse(pet);

	if (!parsedPet.success) return { message: 'Invalid pet data.' };

	try {
		await prisma.pet.create({
			data: parsedPet.data,
		});
	} catch (err) {
		return { message: 'Could not add pet :(' };
	}

	revalidatePath('/app', 'layout');
}

export async function editPet(pet: unknown, id: unknown) {
	const parsedPet = petFormSchema.safeParse(pet);
	const parsedId = petIdSchema.safeParse(id);

	if (!parsedPet.success || !parsedId.success) return { message: 'Invalid pet data.' };

	try {
		await prisma.pet.update({
			where: { id: parsedId.data },
			data: parsedPet.data,
		});
	} catch (err) {
		return { message: 'Could not edit pet :(' };
	}

	revalidatePath('/app', 'layout');
}

export async function checkoutPet(id: unknown) {
	const parsedId = petIdSchema.safeParse(id);

	if (!parsedId.success) return { message: 'Invalid pet data.' };

	try {
		await prisma.pet.delete({ where: { id: parsedId.data } });
	} catch (err) {
		return { message: 'Could not delete pet :(' };
	}

	revalidatePath('/app', 'layout');
}
