"use client"
import { addingDataToApi, removingDataFromApi } from '@/lib/ApiRequests'
import { Button } from '../ui/button'
import { FaOpencart, FaRegHeart } from 'react-icons/fa'
import { useContext, useState } from 'react'
import { toast } from "sonner"
import { CartContext } from '@/Context/CartContext/CartContext'
import { Loader2 } from 'lucide-react'


export default function AddToCart({ productId }) {
    const [addingId, setAddingId] = useState(null)
    const { getCartProducts, getWishlistProducts, setCartData, setWishlistData, cartData } = useContext(CartContext)

    // add to cart
    const addToCart = async (productId) => {
        setAddingId(productId)
        try {
            const response = await addingDataToApi('cart', productId)
            if (response.status) {
                // await getCartProducts()
                setCartData(response)
                console.log('cart data', response.data);
                toast.success("Item Added To Cart Successfully.", { position: "top-center" })
            }
            else {
                toast.error("Faild To Add Item To Cart.", { position: "top-center" })
            }
        } catch {
            toast.error("Faild To Add Item To Cart.", { position: "top-center" })
        } finally {
            setAddingId(null)
        }
    }

    // remove from cart
    const removeFromCart = async (productId) => {
        const response = await removingDataFromApi('cart', productId)
        if (response.status) {
            await getCartProducts()
            toast.success("Item Removed From Cart Successfully.", { position: "top-center" })
        }
        else {
            toast.error("Faild To Remove Item From Cart.", { position: "top-center" })
        }
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // add to wishlist
    const addToWishlist = async (productId) => {
        const response = await addingDataToApi('wishlist', productId)
        if (response.status === 'success') {
            await getWishlistProducts()
            toast.success("Item Added To Wishlist Successfully.", { position: "top-center" })
        }
        else {
            toast.error("Faild To Add Item To Wishlist.", { position: "top-center" })
        }
    }

    // remove from wishlist
    const removeFromWishlist = async (productId) => {
        const response = await removingDataFromApi('wishlist', productId)
        if (response.status === 'success') {
            await getWishlistProducts()
            toast.success("Item Removed From Wishlist Successfully.", { position: "top-center" })
        }
        else {
            toast.error("Faild To Remove Item From Wishlist.", { position: "top-center" })
        }
    }


    return <>
        <div className="flex items-center gap-2 ">
            <Button onClick={() => { addToCart(productId) }} className={'flex items-center w-full shrink cursor-pointer'}>{addingId == productId ? '' : <FaOpencart />}{addingId == productId ? <Loader2 className='animate-spin' /> : 'Add To Cart'}</Button>
            <FaRegHeart onClick={() => { addToWishlist(productId) }} className="text-3xl cursor-pointer" />
        </div>
    </>
}