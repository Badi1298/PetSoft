'use client';

import Image from 'next/image';

import { usePetsContext } from '@/lib/hooks';

import { Button } from './ui/button';

import AddSavePetDialog from './add-save-pet-dialog';
import { Pet } from '@prisma/client';

export default function PetDetails() {
	const { selectedPet } = usePetsContext();

	return (
		<section className="flex h-full w-full flex-col">
			{!selectedPet ? (
				<EmptyView />
			) : (
				<>
					<TopBar pet={selectedPet} />
					<OtherInfo pet={selectedPet} />
					<Notes pet={selectedPet} />
				</>
			)}
		</section>
	);
}

function EmptyView() {
	return <p className="flex h-full items-center justify-center text-2xl font-medium">No pet selected</p>;
}

type Props = {
	pet: Pet;
};

function TopBar({ pet }: Props) {
	const { handleCheckoutPet } = usePetsContext();

	return (
		<div className="flex items-center border-b border-light bg-white px-8 py-5">
			<Image
				src={pet.imageUrl}
				alt="selected pet image"
				width={74}
				height={74}
				className="h-[74px] w-[74px] rounded-full object-cover"
			/>
			<h2 className="ml-5 text-3xl font-semibold leading-7">{pet.name}</h2>

			<div className="ml-auto space-x-2.5">
				<AddSavePetDialog type="edit" />
				<Button
					variant="secondary"
					onClick={async () => await handleCheckoutPet(pet.id)}
				>
					Checkout
				</Button>
			</div>
		</div>
	);
}

function OtherInfo({ pet }: Props) {
	return (
		<div className="flex justify-around px-5 py-10 text-center">
			<div>
				<h3 className="text-[13px] font-medium uppercase text-zinc-700">Owner name</h3>
				<p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
			</div>
			<div>
				<h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
				<p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
			</div>
		</div>
	);
}

function Notes({ pet }: Props) {
	return <section className="mx-8 mb-9 flex-1 rounded-md border border-light bg-white px-7 py-5">{pet?.notes}</section>;
}
