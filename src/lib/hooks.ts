import { useContext } from 'react';

import { PetsContext } from '@/contexts/pets-context-provider';
import { SearchContext } from '@/contexts/search-context-provider';

export function usePetsContext() {
	const context = useContext(PetsContext);

	if (!context) throw new Error('usePetsContext must be used within a PetsContextProvider');

	return context;
}

export function useSearchContext() {
	const context = useContext(SearchContext);

	if (!context) throw new Error('useSearchContext must be used within a SearchContextProvider');

	return context;
}
