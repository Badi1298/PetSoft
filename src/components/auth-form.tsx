'use client';

import { useFormState } from 'react-dom';

import { login, signup } from '@/actions/actions';

import { Label } from './ui/label';
import { Input } from './ui/input';
import AuthFormBtn from './auth-form-btn';

type AuthFormProps = {
	type: 'login' | 'signup';
};

export default function AuthForm({ type }: AuthFormProps) {
	const [loginError, dispatchLogin] = useFormState(login, undefined);
	const [signupError, dispatchSignup] = useFormState(signup, undefined);

	return (
		<form
			action={type === 'login' ? dispatchLogin : dispatchSignup}
			className="flex flex-col"
		>
			<div className="space-y-1">
				<Label htmlFor="email">Email</Label>
				<Input
					required
					id="email"
					name="email"
					type="email"
					maxLength={100}
					className="border-zinc-400"
				/>
			</div>
			<div className="mb-4 mt-2 space-y-1">
				<Label htmlFor="password">Password</Label>
				<Input
					required
					id="password"
					name="password"
					type="password"
					maxLength={100}
					className="border-zinc-400"
				/>
			</div>

			<AuthFormBtn type={type} />

			{loginError && <p className="mt-2 text-sm text-red-500">{loginError.message}</p>}
			{signupError && <p className="mt-2 text-sm text-red-500">{signupError.message}</p>}
		</form>
	);
}
