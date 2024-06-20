'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/db';

export async function addPet(formData: FormData) {
	try {
		await prisma.pet.create({
			data: {
				name: formData.get('name') as string,
				ownerName: formData.get('owner-name') as string,
				imageUrl: formData.get('image-url') as string,
				age: Number(formData.get('age') as string),
				notes: formData.get('notes') as string,
			},
		});
	} catch (err) {
		return { message: 'Could not add pet :(' };
	}

	revalidatePath('/app', 'layout');
}

export async function editPet(formData: FormData, id: string) {
	try {
		await prisma.pet.update({
			where: { id },
			data: {
				name: formData.get('name') as string,
				ownerName: formData.get('owner-name') as string,
				imageUrl: formData.get('image-url') as string,
				age: Number(formData.get('age') as string),
				notes: formData.get('notes') as string,
			},
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
