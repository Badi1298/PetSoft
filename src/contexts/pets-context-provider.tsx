'use client';

import { ReactNode, createContext, useOptimistic, useState } from 'react';

import { addPet, checkoutPet, editPet } from '@/actions/actions';

import { toast } from 'sonner';

import { Pet } from '@/lib/types';

type PetsContextProviderProps = {
	data: Pet[];
	children: ReactNode;
};

type TPetContext = {
	optimisticPets: Pet[];
	selectedPetId: string | null;
	selectedPet: Pet | undefined;
	numberOfPets: number;
	handleAddPet: (newPet: Pet) => Promise<void>;
	handleEditPet: (newPet: Omit<Pet, 'id'>, petId: string) => Promise<void>;
	handleCheckoutPet: (id: string) => Promise<void>;
	handleChangeSelectedPetId: (id: string) => void;
};

export const PetsContext = createContext<TPetContext | null>(null);

export default function PetsContextProvider({ data, children }: PetsContextProviderProps) {
	const [optimisticPets, setOptimisticPets] = useOptimistic(data, (state, newPet: Omit<Pet, 'id'>) => {
		return [...state, { ...newPet, id: Date.now().toString() }];
	});
	const [selectedPetId, setSetselectedPetId] = useState('');

	const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
	const numberOfPets = optimisticPets.length;

	const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
		setOptimisticPets(newPet);
		const error = await addPet(newPet);
		if (error) {
			toast.warning(error.message);
			return;
		}
	};

	const handleEditPet = async (newPet: Omit<Pet, 'id'>, petId: string) => {
		const error = await editPet(newPet, petId);
		if (error) {
			toast.warning(error.message);
			return;
		}
	};

	const handleCheckoutPet = async (id: string) => {
		await checkoutPet(id);
		setSetselectedPetId('');
	};

	const handleChangeSelectedPetId = (id: string) => {
		setSetselectedPetId(id);
	};

	return (
		<PetsContext.Provider
			value={{ optimisticPets, selectedPetId, selectedPet, numberOfPets, handleChangeSelectedPetId, handleAddPet, handleCheckoutPet, handleEditPet }}
		>
			{children}
		</PetsContext.Provider>
	);
}
