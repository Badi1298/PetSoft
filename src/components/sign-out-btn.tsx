'use client';

import { logout } from '@/actions/actions';

import { Button } from './ui/button';
import { useTransition } from 'react';

export default function SignOutBtn() {
	const [isPending, startTransition] = useTransition();

	return (
		<Button
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await logout();
				});
			}}
		>
			Sign Out
		</Button>
	);
}
