'use client';

import { ReactNode, createContext, useState } from 'react';

import { Pet } from '@prisma/client';
import { checkoutPet } from '@/actions/actions';

type PetsContextProviderProps = {
	data: Pet[];
	children: ReactNode;
};

type TPetContext = {
	pets: Pet[];
	selectedPetId: string | null;
	selectedPet: Pet | undefined;
	numberOfPets: number;
	handleEditPet: (petId: string, updatedPetData: Omit<Pet, 'id'>) => void;
	handleCheckoutPet: (id: string) => void;
	handleChangeSelectedPetId: (id: string) => void;
};

export const PetsContext = createContext<TPetContext | null>(null);

export default function PetsContextProvider({ data: pets, children }: PetsContextProviderProps) {
	const [selectedPetId, setSetselectedPetId] = useState('');

	const selectedPet = pets.find((pet) => pet.id === selectedPetId);
	const numberOfPets = pets.length;

	const handleEditPet = (petId: string, updatedPetData: Omit<Pet, 'id'>) => {
		// setPets((prev) =>
		// 	prev.map((pet) => {
		// 		if (pet.id === petId) {
		// 			return {
		// 				id: petId,
		// 				...updatedPetData,
		// 			};
		// 		}
		// 		return pet;
		// 	})
		// );
	};

	const handleCheckoutPet = async (id: string) => {
		await checkoutPet(id);
		// setPets((prev) => prev.filter((pet) => pet.id !== selectedPetId));
		setSetselectedPetId('');
	};

	const handleChangeSelectedPetId = (id: string) => {
		setSetselectedPetId(id);
	};

	return (
		<PetsContext.Provider value={{ pets, selectedPetId, selectedPet, numberOfPets, handleChangeSelectedPetId, handleCheckoutPet, handleEditPet }}>
			{children}
		</PetsContext.Provider>
	);
}
