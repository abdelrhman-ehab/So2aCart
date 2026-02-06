'use client'
import { useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { toast } from 'sonner';
import { getApiData } from '@/lib/ApiRequests';

export default function CartContextProvider({ children }) {
    const [wishlistData, setWishlistData] = useState(null)
    const [cartData, setCartData] = useState(null)
    const [cartDataLoading, setCartDataLoading] = useState(false)
    const [getCartError, setGetCartError] = useState(false)

    // get cart products
    const getCartProducts = async () => {
        setCartDataLoading(true)
        try {
            const response = await getApiData('cart')
            if (response.status == 'success') {
                setCartData(response)
                console.log(response);
            }
            else {
                toast.error('faild to fetch data', { position: 'top-center' })
                setGetCartError(true)
            }
        }
        catch {
            toast.error('faild to fetch data', { position: 'top-center' })
            setGetCartError(true)
        }
        finally {
            setCartDataLoading(false)
        }
    }

    // const get wishlist products
    const getWishlistProducts = async () => {
        try {
            const response = await getApiData('wishlist')
            if (response.status == 'success') {
                setWishlistData(response)
            }
            else {
                toast.error('faild to fetch data', { position: 'top-center' })
            }
        }
        catch {
            toast.error('faild to fetch data', { position: 'top-center' })
        }
        finally {
        }
    }


    useEffect(() => {
        getCartProducts();
        getWishlistProducts();
    }, [])

    return <CartContext.Provider value={{ wishlistData, setWishlistData, cartData, setCartData, getWishlistProducts, getCartProducts, cartDataLoading, setCartDataLoading, getCartError, setGetCartError }}>
        {children}
    </CartContext.Provider>
}


