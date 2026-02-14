import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const getToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('next-auth.session-token')?.value ||
        cookieStore.get('__Secure-next-auth.session-token')?.value;

    if (!token) {
        return null;
    }

    const decoded = await decode({ token, secret: process.env.NEXTAUTH_SECRET })
    return decoded?.token
}

export async function GET() {
    try {
        const token = await getToken();

        if (!token) {
            return NextResponse.json(
                { statusMsg: 'error', message: 'Unauthorized: No session token found' },
                { status: 401 }
            );
        }

        const apiUrl = process.env.API_URL;
        if (!apiUrl) {
            return NextResponse.json(
                { statusMsg: 'error', message: 'Server Error: API_URL not configured' },
                { status: 500 }
            );
        }

        const res = await fetch(`${apiUrl}/wishlist`, {
            method: 'GET',
            headers: {
                token: token
            },
            cache: 'no-cache'
        })

        if (!res.ok) {
            try {
                const errorData = await res.json();
                return NextResponse.json(errorData, { status: res.status });
            } catch (e) {
                return NextResponse.json(
                    { statusMsg: 'error', message: `Backend API Error: ${res.status} ${res.statusText}` },
                    { status: res.status }
                );
            }
        }

        const response = await res.json()
        return NextResponse.json(response)

    } catch (error) {
        console.error("API Route Error (get-wishlist):", error);
        return NextResponse.json(
            { statusMsg: 'error', message: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}