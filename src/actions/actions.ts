'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/db';
import { Pet } from '@prisma/client';
import { PetEssentials } from '@/lib/types';

import { sleep } from '@/lib/utils';

export async function addPet(pet: PetEssentials) {
	await sleep(1000);

	try {
		await prisma.pet.create({
			data: pet,
		});
	} catch (err) {
		return { message: 'Could not add pet :(' };
	}

	revalidatePath('/app', 'layout');
}

export async function editPet(pet: PetEssentials, id: Pet['id']) {
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

export async function checkoutPet(id: Pet['id']) {
	try {
		await prisma.pet.delete({ where: { id } });
	} catch (err) {
		return { message: 'Could not delete pet :(' };
	}

	revalidatePath('/app', 'layout');
}
