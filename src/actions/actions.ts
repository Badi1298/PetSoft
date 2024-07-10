'use server';

import { revalidatePath } from 'next/cache';

import { checkAuth, getPetById } from '@/lib/server-utils';

import prisma from '@/lib/db';
import { signIn, signOut } from '@/lib/auth';
import { authSchema, petFormSchema, petIdSchema } from '@/lib/schemas';

import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

import Stripe from 'stripe';

// User Actions
export async function signup(_: unknown, formData: unknown) {
	if (!(formData instanceof FormData)) return { message: 'Invalid form data.' };

	const formDataObject = Object.fromEntries(formData.entries());

	const validatedFormData = authSchema.safeParse(formDataObject);

	if (!validatedFormData.success) return { message: 'Invalid form data.' };

	const { email, password } = validatedFormData.data;

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === 'P2002') {
				return { message: 'Email already exists.' };
			}
		}
	}

	await signIn('credentials', formData);
}

export async function login(_: unknown, formData: unknown) {
	if (!(formData instanceof FormData)) return { message: 'Invalid form data.' };

	try {
		await signIn('credentials', formData);
	} catch (err) {
		if (err instanceof AuthError) {
			switch (err.type) {
				case 'CredentialsSignin': {
					return {
						message: 'Invalid credentials.',
					};
				}
				default: {
					return {
						message: 'Error. Could not sign in.',
					};
				}
			}
		}

		throw err;
	}
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

// Payments
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession() {
	const session = await checkAuth();

	const checkoutSession = await stripe.checkout.sessions.create({
		customer_email: session.user.email || '',
		line_items: [{ price: 'price_1PZEqGJTJ0Nr51aISsN8GAdL', quantity: 1 }],
		mode: 'payment',
		success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
		cancel_url: `${process.env.CANONICAL_URL}/payment?canceled=true`,
	});

	// redirect user to stripe checkout
	redirect(checkoutSession.url!);
}
