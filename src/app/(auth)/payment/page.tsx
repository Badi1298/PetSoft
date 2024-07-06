'use client';

import { useTransition } from 'react';

import { createCheckoutSession } from '@/actions/actions';

import H1 from '@/components/h1';

import { Button } from '@/components/ui/button';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: PageProps) {
	const [isPending, startTransition] = useTransition();

	return (
		<main className="flex flex-col items-center space-y-10">
			<H1>PetSoft access requires payment</H1>

			{!searchParams.success && (
				<Button
					disabled={isPending}
					onClick={() => {
						startTransition(async () => {
							await createCheckoutSession();
						});
					}}
				>
					{isPending ? 'Loading...' : 'Buy lifetime access for $299'}
				</Button>
			)}

			{searchParams.success && <p className="text-sm text-green-700">Payment successful! You now have lifetime access to PetSoft.</p>}
			{searchParams.canceled && <p className="text-sm text-red-700">Payment cancelled. You can try again.</p>}
		</main>
	);
}
