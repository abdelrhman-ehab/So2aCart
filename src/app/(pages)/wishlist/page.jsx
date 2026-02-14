"use client"
import React from 'react'
import WishlistLayout from './WishlistLayout'
import { useQuery } from '@tanstack/react-query';
import { getWishlistApi } from '@/lib/ApiRequests';
import { useSession } from 'next-auth/react';

export default function Wishlist() {

    const session = useSession()
    const { data: wishistData, isLoading: WishlistFetching } = useQuery({
        queryKey: ['get-wishlist-data'],
        queryFn: () => getWishlistApi('wishlist'),
        enabled: session.status === 'authenticated'
    })
    return <>
        <WishlistLayout wishlist={wishistData} WishlistFetching={WishlistFetching} />
    </>
}
