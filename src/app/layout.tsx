import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'PetSoft - Pet daycare software',
	description: "Take care of people's pets responsibly with PetSoft.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-svh bg-[#efe8ec] text-sm text-zinc-900`}>
				<header>Header</header>
				{children}
				<footer>Footer</footer>
			</body>
		</html>
	);
}
