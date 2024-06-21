'use client';

import { addPet, editPet } from '@/actions/actions';

import { toast } from 'sonner';
import { usePetsContext } from '@/lib/hooks';

import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

import PetFormBtn from './pet-form-btn';

type PetFormProps = {
	type: 'add' | 'edit';
	onFormSubmission: () => void;
};

export default function PetForm({ type, onFormSubmission }: PetFormProps) {
	const { selectedPet, handleAddPet, handleEditPet } = usePetsContext();

	return (
		<form
			action={async (formData) => {
				onFormSubmission();

				const petData = {
					name: formData.get('name') as string,
					ownerName: formData.get('owner-name') as string,
					imageUrl: formData.get('image-url') as string,
					age: Number(formData.get('age') as string),
					notes: formData.get('notes') as string,
				};

				if (type === 'add') {
					await handleAddPet(petData);
				} else if (type === 'edit') {
					await handleEditPet(petData, selectedPet?.id as string);
				}
			}}
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
						required
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

			<PetFormBtn type={type} />
		</form>
	);
}
