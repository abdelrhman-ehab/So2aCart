"use client"
import { getCartAPi } from '@/lib/ApiRequests'
import { useQuery } from '@tanstack/react-query'
import React, { createContext } from 'react'
export const userContext = createContext()

export default function UserContextProvider({ children }) {
    const { data: cartData, isLoading: fetchingCartData } = useQuery({
        queryKey: ["get-cart-data"],
        queryFn: () => getCartAPi(),
    })

    console.log('cart data from context', cartData);

    cartData?.data?.cartOwner && localStorage.setItem('cartOwnerId', cartData?.data?.cartOwner)

    return <>
        <userContext.Provider value={{ cartData, fetchingCartData }}>
            {children}
        </userContext.Provider>
    </>
}
