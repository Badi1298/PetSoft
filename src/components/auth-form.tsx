import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function AuthForm() {
	return (
		<form className="flex flex-col">
			<div className="space-y-1">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					className="border-zinc-400"
				/>
			</div>
			<div className="mb-4 mt-2 space-y-1">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					className="border-zinc-400"
				/>
			</div>

			<Button className="">Log In</Button>
		</form>
	);
}
