import { login, signup } from '@/actions/actions';

import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

type AuthFormProps = {
	type: 'login' | 'signup';
};

export default function AuthForm({ type }: AuthFormProps) {
	return (
		<form
			action={type === 'login' ? login : signup}
			className="flex flex-col"
		>
			<div className="space-y-1">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					name="email"
					className="border-zinc-400"
				/>
			</div>
			<div className="mb-4 mt-2 space-y-1">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					name="password"
					type="password"
					className="border-zinc-400"
				/>
			</div>

			<Button>{type === 'login' ? 'Log In' : 'Sign Up'}</Button>
		</form>
	);
}
