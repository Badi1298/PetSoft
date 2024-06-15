import { ReactNode } from 'react';

import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundPattern from '@/components/background-patters';

type AppLayoutProps = {
	children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
	return (
		<>
			<BackgroundPattern />

			<div className="mx-auto flex min-h-svh max-w-[1050px] flex-col px-4">
				<AppHeader />
				{children}
				<AppFooter />
			</div>
		</>
	);
}
