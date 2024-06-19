'use client';

import { ReactNode, createContext, useState } from 'react';

import { Pet } from '@/lib/types';

type PetsContextProviderProps = {
	data: Pet[];
	children: ReactNode;
};

type TPetContext = {
	pets: Pet[];
	selectedPetId: string | null;
	selectedPet: Pet | undefined;
	numberOfPets: number;
	handleAddPet: (newPet: Omit<Pet, 'id'>) => void;
	handleEditPet: (petId: string, updatedPetData: Omit<Pet, 'id'>) => void;
	handleCheckoutPet: () => void;
	handleChangeSelectedPetId: (id: string) => void;
};

export const PetsContext = createContext<TPetContext | null>(null);

export default function PetsContextProvider({ data, children }: PetsContextProviderProps) {
	const [pets, setPets] = useState(data);
	const [selectedPetId, setSetselectedPetId] = useState('');

	const selectedPet = pets.find((pet) => pet.id === selectedPetId);
	const numberOfPets = pets.length;

	const handleAddPet = (newPet: Omit<Pet, 'id'>) => {
		setPets((prev) => [...prev, { id: Date.now().toString(), ...newPet }]);
	};

	const handleEditPet = (petId: string, updatedPetData: Omit<Pet, 'id'>) => {
		setPets((prev) =>
			prev.map((pet) => {
				if (pet.id === petId) {
					return {
						id: petId,
						...updatedPetData,
					};
				}

				return pet;
			})
		);
	};

	const handleCheckoutPet = () => {
		setPets((prev) => prev.filter((pet) => pet.id !== selectedPetId));
		setSetselectedPetId('');
	};

	const handleChangeSelectedPetId = (id: string) => {
		setSetselectedPetId(id);
	};

	return (
		<PetsContext.Provider
			value={{ pets, selectedPetId, selectedPet, numberOfPets, handleChangeSelectedPetId, handleCheckoutPet, handleAddPet, handleEditPet }}
		>
			{children}
		</PetsContext.Provider>
	);
}
