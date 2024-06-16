import Stats from '@/components/stats';
import PetList from '@/components/pet-list';
import Branding from '@/components/branding';
import SearchForm from '@/components/search-form';
import PetDetails from '@/components/pet-details';
import ContentBlock from '@/components/content-block';

export default async function Dashboard() {
	const response = await fetch('https://bytegrad.com/course-assets/projects/petsoft/api/pets');
	if (!response.ok) throw new Error('Could not fetch pets.');

	const data = await response.json();

	return (
		<main>
			<div className="flex items-center justify-between py-8 text-white">
				<Branding />
				<Stats />
			</div>

			<div className="grid h-[600px] grid-cols-3 grid-rows-[45px_1fr] gap-4">
				<div className="col-span-1 col-start-1 row-span-1 row-start-1">
					<SearchForm />
				</div>

				<div className="col-span-1 col-start-1 row-span-full row-start-2">
					<ContentBlock>
						<PetList pets={data} />
					</ContentBlock>
				</div>

				<div className="col-span-full col-start-2 row-span-full row-start-1">
					<ContentBlock>
						<PetDetails />
					</ContentBlock>
				</div>
			</div>
		</main>
	);
}
