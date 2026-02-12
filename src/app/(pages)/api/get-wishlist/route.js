import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
const getToken = async () => {
    const encoded_token = (await cookies()).get('next-auth.session-token').value
    const { token } = await decode({ token: encoded_token, secret: process.env.NEXTAUTH_SECRET })
    return token
}
export async function GET() {
    const token = await getToken()
    const res = await fetch(`${process.env.API_URL}/wishlist`, {
        method: 'GET',
        headers: {
            token: token
        },
        cache: 'no-cache'
    })

    const response = await res.json()
    return NextResponse.json(response)
}