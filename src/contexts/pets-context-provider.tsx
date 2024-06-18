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
	handleCheckoutPet: () => void;
	handleChangeSelectedPetId: (id: string) => void;
};

export const PetsContext = createContext<TPetContext | null>(null);

export default function PetsContextProvider({ data, children }: PetsContextProviderProps) {
	const [pets, setPets] = useState(data);
	const [selectedPetId, setSetselectedPetId] = useState('');

	const selectedPet = pets.find((pet) => pet.id === selectedPetId);
	const numberOfPets = pets.length;

	const handleChangeSelectedPetId = (id: string) => {
		setSetselectedPetId(id);
	};

	const handleCheckoutPet = () => {
		setPets((prev) => prev.filter((pet) => pet.id !== selectedPetId));
		setSetselectedPetId('');
	};

	return (
		<PetsContext.Provider value={{ pets, selectedPetId, selectedPet, numberOfPets, handleChangeSelectedPetId, handleCheckoutPet }}>
			{children}
		</PetsContext.Provider>
	);
}