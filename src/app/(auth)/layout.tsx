import { ReactNode } from 'react';

import Logo from '@/components/logo';

type LayoutProps = {
	children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-y-5">
			<Logo />
			{children}
		</div>
	);
}
