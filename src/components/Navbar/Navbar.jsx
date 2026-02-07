'use client'
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getApiData } from '@/lib/ApiRequests';
import NavbarLayout from './NavbarLayout';

export default function Navbar() {
    const pathName = usePathname()
    const { data: cartData } = useQuery({
        queryKey: ["get-cart-data"],
        queryFn: () => getApiData('cart')
    })
    return <>
        <NavbarLayout cartData={cartData} />
    </>
}
