import { useContext } from 'react';

import { PetsContext } from '@/contexts/pets-context-provider';

export function usePetsContext() {
	const context = useContext(PetsContext);

	if (!context) throw new Error('usePetsContext must be used within a PetsContextProvider');

	return context;
}
