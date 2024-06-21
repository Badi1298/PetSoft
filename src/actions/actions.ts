'use server';

import prisma from '@/lib/db';
import { Pet } from '@/lib/types';
import { sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function addPet(pet: Omit<Pet, 'id'>) {
	await sleep(3000);

	try {
		await prisma.pet.create({
			data: pet,
		});
	} catch (err) {
		return { message: 'Could not add pet :(' };
	}

	revalidatePath('/app', 'layout');
}

export async function editPet(pet: Omit<Pet, 'id'>, id: string) {
	try {
		await prisma.pet.update({
			where: { id },
			data: pet,
		});
	} catch (err) {
		return { message: 'Could not edit pet :(' };
	}

	revalidatePath('/app', 'layout');
}

export async function checkoutPet(id: string) {
	try {
		await prisma.pet.delete({ where: { id } });
	} catch (err) {
		return { message: 'Could not delete pet :(' };
	}

	revalidatePath('/app', 'layout');
}
