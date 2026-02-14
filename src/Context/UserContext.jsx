"use client"
import { getCartAPi } from '@/lib/ApiRequests'
import { queryClient } from '@/providers/ReactQueryProvider'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React, { createContext, useEffect } from 'react'
export const userContext = createContext()

export default function UserContextProvider({ children }) {
    const session = useSession()
    const { data: cartData, isLoading: fetchingCartData } = useQuery({
        queryKey: ["get-cart-data"],
        queryFn: () => getCartAPi(),
        retry: 2,
        enabled: session.status === 'authenticated'
    })

    useEffect(() => {
        if (session.status === 'authenticated') {
            queryClient.invalidateQueries({
                queryKey: ['get-cart-data']
            })
        }
    }, [session.status])

    // cartData?.data?.cartOwner && localStorage.setItem('cartOwnerId', cartData?.data?.cartOwner)

    useEffect(() => {
        if (cartData?.data?.cartOwner) {
            localStorage.setItem('cartOwnerId', cartData?.data?.cartOwner)
        }
    }, [cartData])


    return <>
        <userContext.Provider value={{ cartData, fetchingCartData }}>
            {children}
        </userContext.Provider>
    </>
}
