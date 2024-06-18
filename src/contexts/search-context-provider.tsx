'use client';

import { ReactNode, createContext, useState } from 'react';

type SearchContextProviderProps = {
	children: ReactNode;
};

type TSearchContext = {
	search: string;
	handleSearch: (query: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({ children }: SearchContextProviderProps) {
	const [search, setSearch] = useState('');

	const handleSearch = (query: string) => {
		setSearch(query);
	};

	return <SearchContext.Provider value={{ search, handleSearch }}>{children}</SearchContext.Provider>;
}
