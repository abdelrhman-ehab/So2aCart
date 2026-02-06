import React from 'react'

export default async function Categories() {
    // get categories
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`, {
        headers: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDA2ODc3NiwiZXhwIjoxNzc3ODQ0Nzc2fQ.5ff0mQsqMn3Zr0XLRGOx-tciHDs2W8LxKXqwa3FmgcE'
        },
        next: {
            revalidate: 60
        }
    })
    const { data: categories } = await response.json()
    return (
        <div>Categories</div>
    )
}
