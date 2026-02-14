'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'


export default function AllOrders({ searchParams }) {

    const pathName = usePathname()

    useEffect(() => {
        if (pathName === '/allorders') {
            window.location.href = 'https://so2a-cart.vercel.app/allorders/' + localStorage.getItem('cartOwnerId')
        }
    }, [])


    return (
        <div>AllOrders</div>
    )
}
