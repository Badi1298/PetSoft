import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';
import { getUserByEmail } from './server-utils';
import { authSchema } from './schemas';

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth({
	pages: {
		signIn: '/login',
	},
	secret: 'myreallysecretsecret',
	providers: [
		Credentials({
			async authorize(credentials) {
				// Runs on login

				// Validation
				const validatedCredentials = authSchema.safeParse(credentials);

				if (!validatedCredentials.success) return null;

				// Extract values
				const { email, password } = validatedCredentials.data;

				const user = await getUserByEmail(email);

				if (!user) {
					console.log('No user found.');
					return null;
				}

				const passwordsMatch = await bcrypt.compare(password, user.password);

				if (!passwordsMatch) {
					console.log('Invalid username or password.');
					return null;
				}

				return user;
			},
		}),
	],
	callbacks: {
		authorized: ({ auth, request }) => {
			// Runs on every request with middleware
			const isLoggedIn = !!auth?.user;
			const isApp = request.nextUrl.pathname.includes('/app');

			if (isApp && !isLoggedIn) return false;

			if (isLoggedIn && !isApp) {
				if (request.nextUrl.pathname.includes('/login') || request.nextUrl.pathname.includes('/signup')) {
					return Response.redirect(new URL('/payment', request.nextUrl));
				}

				return true;
			}

			return true;
		},
		jwt: ({ token, user }) => {
			if (user) {
				token.userId = user.id;
			}

			return token;
		},
		session: ({ session, token }) => {
			if (session.user) {
				session.user.id = token.userId;
			}

			return session;
		},
	},
});
