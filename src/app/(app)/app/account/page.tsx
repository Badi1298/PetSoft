import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

import H1 from '@/components/h1';
import ContentBlock from '@/components/content-block';
import SignOutBtn from '@/components/sign-out-btn';

export default async function AccountPage() {
	const session = await auth();

	if (!session?.user) redirect('/login');

	return (
		<main>
			<H1 className="my-8 text-white">Your Account</H1>

			<ContentBlock className="flex h-[500px] flex-col items-center justify-center gap-3">
				<p>Logged in as {session.user.email}</p>
				<SignOutBtn />
			</ContentBlock>
		</main>
	);
}
