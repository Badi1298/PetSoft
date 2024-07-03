'use server';

import { revalidatePath } from 'next/cache';

import { checkAuth, getPetById } from '@/lib/server-utils';

import prisma from '@/lib/db';
import { signIn, signOut } from '@/lib/auth';
import { petFormSchema, petIdSchema } from '@/lib/schemas';

import bcrypt from 'bcryptjs';

// User Actions
export async function signup(formData: FormData) {
	const hashedPassword = await bcrypt.hash(formData.get('password') as string, 10);

	await prisma.user.create({
		data: {
			email: formData.get('email') as string,
			password: hashedPassword,
		},
	});

	await signIn('credentials', formData);
}

export async function login(formData: FormData) {
	await signIn('credentials', formData);
}

export async function logout() {
	await signOut({ redirectTo: '/' });
}

// Pet Actions
export async function addPet(pet: unknown) {
	const session = await checkAuth();

	const parsedPet = petFormSchema.safeParse(pet);

	if (!parsedPet.success) return { message: 'Invalid pet data.' };

	try {
		await prisma.pet.create({
			data: {
				...parsedPet.data,
				User: {
					connect: {
						id: session?.user?.id,
					},
				},
			},
		});
	} catch (err) {
		return { message: 'Could not add pet :(' };
	}

	revalidatePath('/app', 'layout');
}

export async function editPet(petData: unknown, id: unknown) {
	// Authentication check
	const session = await checkAuth();

	// Validation
	const parsedPet = petFormSchema.safeParse(petData);
	const parsedId = petIdSchema.safeParse(id);

	if (!parsedPet.success || !parsedId.success) return { message: 'Invalid pet data.' };

	// Authorization check
	const pet = await getPetById(parsedId.data);

	if (!pet) return { message: 'Pet not found.' };

	if (pet.userId !== session.user.id) return { message: 'Not authorized.' };

	// Database mutation
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
	// Authentication check
	const session = await checkAuth();

	// Data validation
	const parsedId = petIdSchema.safeParse(id);
	if (!parsedId.success) return { message: 'Invalid pet data.' };

	// Authorization check -> user owns pet?
	const pet = await getPetById(parsedId.data);

	if (!pet) return { message: 'Pet not found.' };

	if (pet.userId !== session.user.id) return { message: 'Not authorized.' };

	// Database mutation
	try {
		await prisma.pet.delete({ where: { id: parsedId.data } });
	} catch (err) {
		return { message: 'Could not delete pet :(' };
	}

	revalidatePath('/app', 'layout');
}
