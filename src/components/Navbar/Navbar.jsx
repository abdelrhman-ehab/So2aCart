'use client'
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCartAPi } from '@/lib/ApiRequests';
import NavbarLayout from './NavbarLayout';
import { useSession } from 'next-auth/react';

export default function Navbar() {
    const session = useSession()
    const pathName = usePathname()
    const { data: cartData } = useQuery({
        queryKey: ["get-cart-data"],
        queryFn: () => getCartAPi('cart'),
        enabled: session.status === 'authenticated'
    })
    return <>
        <NavbarLayout cartData={cartData} />
    </>
}
