import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getToken() {
    const cookieStore = (await cookies()).get('next-auth.session-token')?.value

    if (!cookieStore) {
        return null
    }
    const decodedToken = await decode({ token: cookieStore, secret: process.env.NEXTAUTH_SECRET })
    return decodedToken
}