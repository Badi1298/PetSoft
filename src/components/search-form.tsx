'use client';

import { useSearchContext } from '@/lib/hooks';

export default function SearchForm() {
	const { search, handleSearch } = useSearchContext();

	return (
		<form className="h-full w-full">
			<input
				value={search}
				type="search"
				placeholder="Search pets"
				autoFocus
				className="h-full w-full rounded-md bg-white/20 px-5 outline-none transition placeholder:text-white/50 hover:bg-white/30 focus:bg-white/50"
				onChange={(e) => handleSearch(e.target.value)}
			/>
		</form>
	);
}
