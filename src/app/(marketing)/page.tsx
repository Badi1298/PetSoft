import Image from 'next/image';
import petsoftPreview from '../../../public/petsoft-preview.png';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
	return (
		<main className="flex min-h-svh flex-col items-center justify-center gap-10 bg-[#5dc9a8] xl:flex-row">
			<Image
				src={petsoftPreview}
				alt="Preview of PetSoft"
				priority
			/>
			<div>
				<Logo />
				<h1 className="my-6 max-w-[500px] text-5xl font-semibold">
					Manage your <span className="font-extrabold">pet daycare</span> with ease
				</h1>
				<p className="max-w-[600px] text-2xl font-medium">Use PetSoft to easily keep track of pets under your care. Get lifetime access for $299.</p>
				<div className="mt-10 space-x-3">
					<Button asChild>
						<Link href="/signup">Get started</Link>
					</Button>
					<Button
						asChild
						variant="secondary"
					>
						<Link href="/login">Login</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
