import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

type PetFormBtnProps = {
	type: 'add' | 'edit';
};

export default function PetFormBtn({ type }: PetFormBtnProps) {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			className="mt-5 self-end"
			disabled={pending}
		>
			{type === 'add' ? 'Add Pet' : 'Edit Pet'}
		</Button>
	);
}
