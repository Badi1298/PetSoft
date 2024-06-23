'use client';

import { ReactNode, createContext, useOptimistic, useState } from 'react';

import { addPet, checkoutPet, editPet } from '@/actions/actions';

import { Pet } from '@prisma/client';

import { toast } from 'sonner';
import { PetEssentials } from '@/lib/types';

type PetsContextProviderProps = {
	data: Pet[];
	children: ReactNode;
};

type TPetContext = {
	optimisticPets: Pet[];
	selectedPetId: Pet['id'] | null;
	selectedPet: Pet | undefined;
	numberOfPets: number;
	handleAddPet: (newPet: PetEssentials) => Promise<void>;
	handleEditPet: (newPet: PetEssentials, petId: Pet['id']) => Promise<void>;
	handleCheckoutPet: (id: Pet['id']) => Promise<void>;
	handleChangeSelectedPetId: (id: Pet['id']) => void;
};

export const PetsContext = createContext<TPetContext | null>(null);

export default function PetsContextProvider({ data, children }: PetsContextProviderProps) {
	const [optimisticPets, setOptimisticPets] = useOptimistic(data, (state, { action, payload }) => {
		switch (action) {
			case 'add':
				return [...state, { ...payload, id: Math.random().toString() }];
			case 'edit':
				return state.map((pet) => {
					if (pet.id !== payload.id) return pet;

					return { ...pet, ...payload.petData };
				});
			case 'delete':
				return state.filter((pet) => pet.id !== payload);
			default:
				return state;
		}
	});
	const [selectedPetId, setSetselectedPetId] = useState('');

	const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
	const numberOfPets = optimisticPets.length;

	const handleAddPet = async (newPet: PetEssentials) => {
		setOptimisticPets({ action: 'add', payload: newPet });
		const error = await addPet(newPet);
		if (error) {
			toast.warning(error.message);
			return;
		}
	};

	const handleEditPet = async (petData: PetEssentials, petId: Pet['id']) => {
		setOptimisticPets({ action: 'edit', payload: { petData, id: petId } });
		const error = await editPet(petData, petId);
		if (error) {
			toast.warning(error.message);
			return;
		}
	};

	const handleCheckoutPet = async (id: Pet['id']) => {
		setOptimisticPets({ action: 'edit', payload: id });
		await checkoutPet(id);
		setSetselectedPetId('');
	};

	const handleChangeSelectedPetId = (id: Pet['id']) => {
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
