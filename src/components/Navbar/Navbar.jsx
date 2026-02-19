'use client'
import { useQuery } from '@tanstack/react-query';
import { getCartAPi } from '@/lib/ApiRequests';
import NavbarLayout from './NavbarLayout';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { queryClient } from '@/providers/ReactQueryProvider';

export default function Navbar() {
    const session = useSession()
    const { data: cartData } = useQuery({
        queryKey: ["get-cart-data"],
        queryFn: () => getCartAPi('cart'),
        enabled: session.status === 'authenticated'
    })

    useEffect(() => {
        if (session.status === 'authenticated') {

        }
        queryClient.invalidateQueries({
            queryKey: ['get-cart-data']
        })

    }, [session.status])
    return <>
        <NavbarLayout cartData={cartData} />
    </>
}
