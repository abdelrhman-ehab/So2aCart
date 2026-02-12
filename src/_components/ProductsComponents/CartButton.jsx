"use client"
import { Button } from '../../components/ui/button'
import { FaOpencart } from 'react-icons/fa'
import { toast } from "sonner"
import { Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/providers/ReactQueryProvider'
import addToCartAction, { removeFromCartAction } from '../../app/(pages)/products/_action/productActions.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


// add to cart
export default function CartButton({ productId }) {
    const session = useSession()
    const router = useRouter()
    // add item to cart
    const { mutate: addProductToCart, isPending: addingProductLoading } = useMutation({
        mutationFn: (productId) => {
            if (session.status === 'authenticated') {
                return addToCartAction(productId)
            }
            else {
                router.push('/login')
                throw new Error('please login to add to cart')
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-cart-data"]
            })
            toast.success("Item Added To Cart Successfully.", { position: "top-center" })
        },
        onError: (e) => {
            toast.error("Faild To Add Item To Cart. " + e.message, { position: "top-center" })
        }
    })

    return <>
        <Button onClick={() => { addProductToCart(productId) }} className={'flex items-center w-full shrink cursor-pointer bg-linear-to-r from-indigo-800 to-purple-800 hover:bg-linear-to-r hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300 '}>{addingProductLoading ? '' : <FaOpencart />}{addingProductLoading ? <Loader2 className='animate-spin' /> : 'Add To Cart'}</Button>
    </>
}