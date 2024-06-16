import { ReactNode } from 'react';

import { petListSchema } from '@/lib/schemas';

import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundPattern from '@/components/background-patters';
import PetsContextProvider from '@/contexts/pets-context-provider';

type AppLayoutProps = {
	children: ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
	const response = await fetch('https://bytegrad.com/course-assets/projects/petsoft/api/pets');

	if (!response.ok) throw new Error('Could not fetch pets.');

	const data = await response.json();

	const parsedData = petListSchema.safeParse(data);

	if (parsedData.error) throw new Error('Unexpected data format.');

	return (
		<>
			<BackgroundPattern />

			<div className="mx-auto flex min-h-svh max-w-[1050px] flex-col px-4">
				<AppHeader />
				<PetsContextProvider data={parsedData.data}>{children}</PetsContextProvider>
				<AppFooter />
			</div>
		</>
	);
}
