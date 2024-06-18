import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type ContentBlockProps = {
	children: ReactNode;
	className?: string;
};

export default function ContentBlock({ children, className }: ContentBlockProps) {
	return <div className={cn('h-full w-full overflow-hidden rounded-md bg-[#f7f8fa] shadow-sm', className)}>{children}</div>;
}
