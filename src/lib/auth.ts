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

			if (isLoggedIn && isApp && !auth.user.hasAccess) {
				return Response.redirect(new URL('/payment', request.nextUrl));
			}

			if (isLoggedIn && isApp && auth.user.hasAccess) return true;

			if (isLoggedIn && (request.nextUrl.pathname.includes('/login') || request.nextUrl.pathname.includes('/signup'))) {
				return Response.redirect(new URL('/app/dashboard', request.nextUrl));
			}

			if (isLoggedIn && !isApp && !auth.user.hasAccess) {
				if (request.nextUrl.pathname.includes('/login') || request.nextUrl.pathname.includes('/signup')) {
					return Response.redirect(new URL('/payment', request.nextUrl));
				}

				return true;
			}

			return true;
		},
		jwt: async ({ token, user, trigger }) => {
			if (user) {
				// on sign in
				token.userId = user.id;
				token.email = user.email!;
				token.hasAccess = user.hasAccess;
			}

			if (trigger === 'update') {
				// on every request
				const userFromDb = await getUserByEmail(token.email);
				if (userFromDb) {
					token.hasAccess = userFromDb.hasAccess;
				}
			}

			return token;
		},
		session: ({ session, token }) => {
			session.user.id = token.userId;
			session.user.hasAccess = token.hasAccess;

			return session;
		},
	},
});
