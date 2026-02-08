"use client"
import { addingDataToApi, removingDataFromApi } from '@/lib/ApiRequests'
import { Button } from '../ui/button'
import { FaOpencart } from 'react-icons/fa'
import { toast } from "sonner"
import { Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/providers/ReactQueryProvider'


export default function CartButton({ productId }) {
    // add item to cart
    const { mutate: addProductToCart, isPending: addingProductLoading } = useMutation({
        mutationFn: (productId) => addingDataToApi('cart', productId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-cart-data"]
            })
            toast.success("Item Added To Cart Successfully.", { position: "top-center" })
        },
        onError: () => {
            toast.error("Faild To Add Item To Cart.", { position: "top-center" })
        }
    })

    // remove item from cart
    const { mutate: removeProductFromCart, isPending: removingProductLoading } = useMutation({
        mutationFn: (productId) => removingDataFromApi('cart', productId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-cart-data"]
            })
            toast.success("Item Removed From Cart Successfully.", { position: "top-center" })
        },
        onError: () => {
            toast.error("Faild To Remove Item from Cart.", { position: "top-center" })
        }
    })

    return <>
        <Button onClick={() => { addProductToCart(productId) }} className={'flex items-center w-full shrink cursor-pointer bg-linear-to-r from-indigo-800 to-purple-800 hover:bg-linear-to-r hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300 '}>{addingProductLoading ? '' : <FaOpencart />}{addingProductLoading ? <Loader2 className='animate-spin' /> : 'Add To Cart'}</Button>
    </>
}