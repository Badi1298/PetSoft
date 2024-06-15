import { ReactNode } from 'react';

type H1Props = {
	children: ReactNode;
};

export default function H1({ children }: H1Props) {
	return <h1 className="text-2xl font-medium leading-6">{children}</h1>;
}
