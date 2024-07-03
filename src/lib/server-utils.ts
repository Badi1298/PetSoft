import 'server-only';

import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

import prisma from '@/lib/db';
import { Pet, User } from '@prisma/client';

export async function checkAuth() {
	const session = await auth();
	if (!session?.user) redirect('/login');

	return session;
}

export async function getUserByEmail(email: User['email']) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	return user;
}

export async function getPetById(id: Pet['id']) {
	const pet = await prisma.pet.findUnique({
		where: {
			id,
		},
	});

	return pet;
}

export async function getPetsByUserId(id: Pet['userId']) {
	const pets = await prisma.pet.findMany({
		where: { userId: id },
	});

	return pets;
}
