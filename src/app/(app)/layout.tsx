import { ReactNode } from 'react';

import PetsContextProvider from '@/contexts/pets-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';

import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import { Toaster } from '@/components/ui/sonner';
import BackgroundPattern from '@/components/background-patters';

import prisma from '@/lib/db';

type AppLayoutProps = {
	children: ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
	const pets = await prisma.pet.findMany({});

	return (
		<>
			<BackgroundPattern />

			<div className="mx-auto flex min-h-svh max-w-[1050px] flex-col px-4">
				<AppHeader />

				<SearchContextProvider>
					<PetsContextProvider data={pets}>{children}</PetsContextProvider>
				</SearchContextProvider>

				<AppFooter />
			</div>

			<Toaster position="top-right" />
		</>
	);
}
