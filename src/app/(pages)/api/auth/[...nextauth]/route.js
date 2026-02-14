import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const res = await fetch(`${process.env.API_URL}/auth/signin`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                })

                const response = await res.json()

                if (res.ok && response.message === 'success') {
                    return {
                        id: response.user.email,
                        token: response.token,
                        user: response.user
                    }
                }
                else {
                    throw new Error(response.message)
                }
            }
        })
    ],

    callbacks: {
        jwt: ({ user, token }) => {
            if (user) {
                token.token = user.token;
                token.user = user.user;
            }
            return token
        },
        session: ({ token, session }) => {
            session.user = token.user;
            return session
        }
    },

    pages: {
        signIn: '/login'
    },

    session: {
        strategy: 'jwt',
    },

    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }