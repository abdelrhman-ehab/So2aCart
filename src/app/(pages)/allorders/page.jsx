"use client"
import Loading from "@/app/loading";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import { useContext, useState } from "react";

export default function AllOrders() {

    const [cartOwnerId, setCartOwnerId] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('cartOwnerId')
        }
        return null
    })

    const getOrders = async (cartOwnerId) => {
        const res = await fetch(`${process.env.API_URL}/orders/user/${cartOwnerId}`,
            {
                method: 'GET'
            }
        )
        const response = await res.json()
        console.log(response);
        return response
    }

    const { data: allOrders } = useQuery({
        queryKey: ['all-orders', cartOwnerId],
        queryFn: () => getOrders(cartOwnerId),
    })

    return <>
        {allOrders ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allOrders?.map((order) => (
                    <Card key={order._id} className="p-4 space-y-2">
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold">
                                Order #{order.id}
                            </p>
                            <span
                                className={`text-md px-4 py-1 rounded-lg ${order.isPaid
                                    ? "bg-green-900/90 text-white"
                                    : "bg-yellow-900/90 text-white"
                                    }`}
                            >
                                {order.isPaid ? "Paid" : "Cash"}
                            </span>
                        </div>

                        {/* Address */}
                        <div className="">
                            <h3>Order Owner Data</h3>
                            <ul className="text-sm text-muted-foreground list-disc list-inside ps-2">
                                <li>Name: {order.user.name.length == 0 ? null : <span>{order.user.name}</span>}</li>
                                <li>Adress: {order.shippingAddress.city.length == 0 ? null : <span>{order.shippingAddress.city}</span>}</li>
                                <li>Phone: {order.shippingAddress.phone.length == 0 ? null : <span>{order.shippingAddress.phone}</span>}</li>
                            </ul>

                        </div>

                        {/* Products */}
                        <div className="shadow p-5 rounded-lg">
                            <div className="space-y-3 h-100 overflow-y-scroll no-scrollbar">
                                {order.cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center gap-3">
                                        <Image
                                            src={item.product.imageCover}
                                            width={60}
                                            height={60}
                                            className="rounded-md object-cover"
                                            alt={item.product.title}
                                            unoptimized
                                        />

                                        <div className="flex-1">
                                            <p className="text-sm font-medium line-clamp-1">
                                                {item.product.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Qty: {item.count}
                                            </p>
                                        </div>

                                        <p className="text-sm font-semibold">
                                            {item.price} EGP
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t pt-3 space-y-3">
                            <span className="text-sm text-muted-foreground flex justify-between items-center">
                                <span>Created At: </span>
                                {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            <p className="text-base font-bold flex justify-between items-center">
                                <span>Total Price:</span>
                                {order.totalOrderPrice} EGP
                            </p>
                        </div>
                    </Card>
                ))}
            </div> :
            <Loading />
        }
    </>
}
