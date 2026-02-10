import { NextResponse } from "next/server"
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDE0MzQ5NiwiZXhwIjoxNzc3OTE5NDk2fQ.LUyeBibyxK9409Ht9Wb7J3qfBpG3yI4jJp_rDXlVWtE'

export async function GET() {
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