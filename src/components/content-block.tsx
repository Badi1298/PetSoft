import { ReactNode } from 'react';

type ContentBlockProps = {
	children: ReactNode;
};

export default function ContentBlock({ children }: ContentBlockProps) {
	return <div className="h-full w-full overflow-hidden rounded-md bg-[#f7f8fa] shadow-sm">{children}</div>;
}
