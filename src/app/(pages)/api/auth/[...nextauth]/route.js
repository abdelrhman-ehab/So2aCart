import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credental',
            credentials: {
                email: {},
                paswword: {}
            },
            authorize: async (credentials) => {
                const res = await fetch(`${process.env.API_URL}/auth/signin`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.paswword
                    })
                })

                const response = await res.json()
                if (res.ok && response.message === 'success') {
                    return {
                        id: response.user.email,
                        user: response.user,
                        token: response.token
                    }
                }
                else {
                    throw new Error(response.message || 'faild to login')
                }
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = user.user
                token.token = user.token
            }
            return token
        },
        session: ({ session, token }) => {
            session.user = token.user
            return session
        }
    }
})

export { handler as GET, handler as POST }