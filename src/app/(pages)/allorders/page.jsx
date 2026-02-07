"use client"
import { useEffect } from "react"
export default function AllOrders() {
    const getOrders = async (userId) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/user/${userId}`,
            {
                method: 'GET'
            }
        )
        const response = await res.json()
        console.log('user orders ', response);
    }

    useEffect(() => {
        localStorage.getItem('SOCartUserId') !== null && getOrders(localStorage.getItem('SOCartUserId'))
    }, [])

    return <>

    </>
}
