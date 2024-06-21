'use server';

import prisma from '@/lib/db';
import { Pet } from '@/lib/types';

export async function addPet(pet: Omit<Pet, 'id'>) {
	try {
		await prisma.pet.create({
			data: pet,
		});
	} catch (err) {
		return { message: 'Could not add pet :(' };
	}
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
}

export async function checkoutPet(id: string) {
	try {
		await prisma.pet.delete({ where: { id } });
	} catch (err) {
		return { message: 'Could not delete pet :(' };
	}
}
