'use client';

import Image from 'next/image';

import { usePetsContext } from '@/lib/hooks';
import { cn } from '@/lib/utils';

export default function PetList() {
	const { pets, selectedPetId, handleChangeSelectedPetId } = usePetsContext();

	return (
		<ul className="border-light border-b bg-white">
			{pets.map((pet) => (
				<li key={pet.id}>
					<button
						onClick={() => handleChangeSelectedPetId(pet.id)}
						className={cn(
							'flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-[#eff1f2] focus:bg-[#eff1f2]',
							{ 'bg-[#eff1f2]': pet.id === selectedPetId }
						)}
					>
						<Image
							src={pet.imageUrl}
							alt="pet placeholder"
							width={44}
							height={44}
							className="h-11 w-11 rounded-full object-cover"
						/>
						<p className="font-semibold">{pet.name}</p>
					</button>
				</li>
			))}
		</ul>
	);
}
