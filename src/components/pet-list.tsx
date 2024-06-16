import Image from 'next/image';

type Pet = {
	id: string;
	name: string;
	ownerName: string;
	imageUrl: string;
	age: number;
	notes: string;
};

type PetListProps = {
	pets: Pet[];
};

export default function PetList({ pets }: PetListProps) {
	return (
		<ul className="border-b border-black/[0.08] bg-white">
			{pets.map((pet) => (
				<li key={pet.id}>
					<button className="flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-[#eff1f2] focus:bg-[#eff1f2]">
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
