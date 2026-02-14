import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const protectedPages = ['/cart', '/allorders', '/wishlist', '/profile']
const authPages = ['/login', '/register']

export default async function proxy(req) {
    const token = await getToken({ req })
    const { pathname } = req.nextUrl

    if (protectedPages.includes(pathname)) {
        if (!token) {
            let redirectUrl = new URL('/login', process.env.NEXTAUTH_URL);
            redirectUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
            return NextResponse.redirect(redirectUrl)
        }
        return NextResponse.next()
    }

    if (authPages.includes(pathname)) {
        if (token) {
            return NextResponse.redirect(new URL('/', req.url))
        }
        return NextResponse.next()
    }

    return NextResponse.next()

}
