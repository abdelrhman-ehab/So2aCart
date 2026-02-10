"use client"
import React from 'react'
import WishlistLayout from './WishlistLayout'
import { useQuery } from '@tanstack/react-query';
import { getWishlistApi } from '@/lib/ApiRequests';

export default function Wishlist() {

    const { data: wishistData } = useQuery({
        queryKey: ['get-wishlist-data'],
        queryFn: () => getWishlistApi('wishlist')
    })
    return <>
        <WishlistLayout wishlist={wishistData} />
    </>
}
