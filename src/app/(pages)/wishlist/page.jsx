"use client"
import React from 'react'
import WishlistLayout from './WishlistLayout'
import { useQuery } from '@tanstack/react-query';
import { getApiData } from '@/lib/ApiRequests';

export default function Wishlist() {

    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlist`, {
    //     method: "GET",
    //     headers: {
    //         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDE0MzQ5NiwiZXhwIjoxNzc3OTE5NDk2fQ.LUyeBibyxK9409Ht9Wb7J3qfBpG3yI4jJp_rDXlVWtE'
    //     }
    // })
    // const response = await res.json()

    const { data: wishistData } = useQuery({
        queryKey: ['get-wishlist-data'],
        queryFn: () => getApiData('wishlist')
    })
    return <>
        <WishlistLayout wishlist={wishistData} />
    </>
}
