import PetForm from './pet-form';

import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type AddSavePetDialogProps = {
	type: 'add' | 'edit';
};

export default function AddSavePetDialog({ type }: AddSavePetDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				{type === 'add' ? (
					<Button
						size="icon"
						className="absolute bottom-4 right-4"
					>
						<PlusIcon className="h-6 w-6" />
					</Button>
				) : (
					<Button variant="secondary">Edit</Button>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{{ add: 'Add a new pet', edit: 'Edit pet' }[type]}</DialogTitle>
				</DialogHeader>
				<PetForm />
			</DialogContent>
		</Dialog>
	);
}
