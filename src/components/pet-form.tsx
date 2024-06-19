'use client';

import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { usePetsContext } from '@/lib/hooks';

type PetFormProps = {
	type: 'add' | 'edit';
	onFormSubmission: () => void;
};

export default function PetForm({ type, onFormSubmission }: PetFormProps) {
	const { selectedPet, handleAddPet, handleEditPet } = usePetsContext();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const newPet = {
			name: formData.get('name') as string,
			ownerName: formData.get('owner-name') as string,
			imageUrl:
				(formData.get('image-url') as string) ||
				'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=100&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			age: Number(formData.get('age') as string),
			notes: formData.get('notes') as string,
		};

		if (type === 'add') {
			handleAddPet(newPet);
		} else {
			if (!selectedPet?.id) throw new Error('No pet is selected!');

			handleEditPet(selectedPet.id, newPet);
		}

		onFormSubmission();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col"
		>
			<div className="space-y-3">
				<div className="space-y-1">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						name="name"
						type="text"
						required
						defaultValue={type === 'edit' ? selectedPet?.name : ''}
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="owner-name">Owner Name</Label>
					<Input
						id="owner-name"
						name="owner-name"
						type="text"
						required
						defaultValue={type === 'edit' ? selectedPet?.ownerName : ''}
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="image-url">Image Url</Label>
					<Input
						id="image-url"
						name="image-url"
						type="text"
						defaultValue={type === 'edit' ? selectedPet?.imageUrl : ''}
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="age">Age</Label>
					<Input
						id="age"
						name="age"
						type="number"
						required
						defaultValue={type === 'edit' ? selectedPet?.age : ''}
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="notes">Notes</Label>
					<Textarea
						id="notes"
						name="notes"
						rows={3}
						required
						defaultValue={type === 'edit' ? selectedPet?.notes : ''}
					/>
				</div>
			</div>

			<Button
				type="submit"
				className="mt-5 self-end"
			>
				{type === 'add' ? 'Add Pet' : 'Edit Pet'}
			</Button>
		</form>
	);
}
