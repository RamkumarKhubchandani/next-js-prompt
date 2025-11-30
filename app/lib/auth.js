import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from './mongodb';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // Initial sign in
            if (user) {
                token.id = user._id;
                token.username = user.username;
            }
            // Handle session update (when client calls update())
            if (trigger === "update" && session) {
                token.name = session.name;
                // If we passed username in update, update it
                if (session.username) token.username = session.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.username = token.username;
            }
            return session;
        }
    }
};
