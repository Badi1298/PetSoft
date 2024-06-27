import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';

export const { auth, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/login',
	},
	secret: 'myreallysecretsecret',
	providers: [
		Credentials({
			async authorize(credentials) {
				// runs on login
				const { email, password } = credentials;

				const user = await prisma?.user.findUnique({
					where: { email },
				});

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
			// runs on every request with middleware
			const isLoggedIn = !!auth?.user;
			const isApp = request.nextUrl.pathname.includes('/app');

			if (isApp && !isLoggedIn) return false;

			if (isLoggedIn && !isApp) {
				return Response.redirect(new URL('/app/dashboard', request.nextUrl));
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
