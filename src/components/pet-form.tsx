'use client';

import { usePetsContext } from '@/lib/hooks';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { TPetForm, petFormSchema } from '@/lib/schemas';

import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

type PetFormProps = {
	type: 'add' | 'edit';
	onFormSubmission: () => void;
};

export default function PetForm({ type, onFormSubmission }: PetFormProps) {
	const { selectedPet, handleAddPet, handleEditPet } = usePetsContext();

	const {
		register,
		trigger,
		getValues,
		formState: { errors },
	} = useForm<TPetForm>({
		resolver: zodResolver(petFormSchema),
		defaultValues:
			type === 'edit'
				? {
						name: selectedPet?.name,
						ownerName: selectedPet?.ownerName,
						imageUrl: selectedPet?.imageUrl,
						age: selectedPet?.age,
						notes: selectedPet?.notes,
					}
				: undefined,
	});

	return (
		<form
			action={async () => {
				const result = await trigger();
				if (!result) return;

				onFormSubmission();

				const petData = getValues();

				if (type === 'add') {
					await handleAddPet(petData);
				} else if (type === 'edit') {
					await handleEditPet(petData, id);
				}
			}}
			className="flex flex-col"
		>
			<div className="space-y-3">
				<div className="space-y-1">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						{...register('name')}
					/>
					{errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
				</div>
				<div className="space-y-1">
					<Label htmlFor="ownerName">Owner Name</Label>
					<Input
						id="ownerName"
						{...register('ownerName')}
					/>
					{errors.ownerName && <p className="text-xs text-red-500">{errors.ownerName.message}</p>}
				</div>
				<div className="space-y-1">
					<Label htmlFor="imageUrl">Image Url</Label>
					<Input
						id="imageUrl"
						{...register('imageUrl')}
					/>
					{errors.imageUrl && <p className="text-xs text-red-500">{errors.imageUrl.message}</p>}
				</div>
				<div className="space-y-1">
					<Label htmlFor="age">Age</Label>
					<Input
						id="age"
						{...register('age')}
					/>
					{errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
				</div>
				<div className="space-y-1">
					<Label htmlFor="notes">Notes</Label>
					<Textarea
						id="notes"
						{...register('notes')}
					/>
					{errors.notes && <p className="text-xs text-red-500">{errors.notes.message}</p>}
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
