"use client"
import { getApiData } from '@/lib/ApiRequests'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, useEffect, useState } from 'react'
export const userContext = createContext()

export default function UserContextProvider({ children }) {
    const { data: cartData, isLoading: fetchingCartData } = useQuery({
        queryKey: ["get-cart-data"],
        queryFn: () => getApiData('cart'),
    })

    console.log('cart data from context', cartData);

    // const cartOwnerId = cartData?.data?.cartOwner || null
    cartData?.data?.cartOwner && localStorage.setItem('cartOwnerId', cartData?.data?.cartOwner)

    return <>
        <userContext.Provider value={{ cartData, fetchingCartData }}>
            {children}
        </userContext.Provider>
    </>
}
