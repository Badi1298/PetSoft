import { ReactNode } from 'react';

import { checkAuth, getPetsByUserId } from '@/lib/server-utils';

import PetsContextProvider from '@/contexts/pets-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';

import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundPattern from '@/components/background-pattern';

import { Toaster } from '@/components/ui/sonner';

type AppLayoutProps = {
	children: ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
	const session = await checkAuth();

	const pets = await getPetsByUserId(session.user.id);

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
