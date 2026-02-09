"use client"
import { checkoutApi, clearCartApi, getApiData, removingDataFromApi, updateCartApi } from '@/lib/ApiRequests'
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/providers/ReactQueryProvider';
import CartLayout from './CartLayout';
import { useContext, useState } from 'react';
import { userContext } from '@/Context/UserContext';



export default function Cart() {
    const [isRemovingItem, setIsRemovingItem] = useState(null)
    const [isUpdatingItem, setIsUpdatingItem] = useState(null)
    const { cartData, fetchingCartData } = useContext(userContext)

    // updating cart item count
    const { mutate: updateCart } = useMutation({
        mutationFn: ({ productId, count }) => {
            setIsUpdatingItem(productId)
            return updateCartApi(productId, count)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-cart-data"]
            })
            toast.success('Product Updated Successfully', { position: 'top-center' })
            setIsUpdatingItem(null)
        },
        onError: (e) => {
            toast.error('Faild To Update Product', { position: 'top-center' })
            setIsUpdatingItem(null)
            console.log('error from updating cart: ', e);
        }
    })

    // removing cart item
    const { mutate: removeFromCart, isPending: removingLoading } = useMutation({
        mutationFn: (productId) => {
            setIsRemovingItem(productId)
            return removingDataFromApi('cart', productId)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['get-cart-data']
            })
            toast.success('Item Removed Successfully', { position: 'top-center' })
            setIsRemovingItem(null)
        },
        onError: () => {
            toast.error('Faild To Remove Item', { position: 'top-center' })
            setIsRemovingItem(null)
        }
    })


    // clear cart
    const { mutate: clearCart, isPending: clearingCartLoading } = useMutation({
        mutationFn: () => clearCartApi(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['get-cart-data']
            })
            toast.success('Cart Now Is Empty', { position: 'top-center' })
        },
        onError: () => {
            toast.error('Faild To Clear Cart', { position: 'top-center' })
        }
    })

    //checkout
    const { mutate: checkout, isPending: checkoutLoading } = useMutation({
        mutationFn: ({ cartId, checkoutDetails, checkoutPhoneNumber, checkoutCity }) => {
            const shippingAddress = {
                details: checkoutDetails,
                phone: checkoutPhoneNumber,
                city: checkoutCity
            }
            return checkoutApi(cartId, shippingAddress)
        },
        onSuccess: (data) => {
            console.log(data);
            toast.success('checkout success')
            window.location.href = data.session.url;
        },
        onError: (e) => {
            console.log('error from checkout: ', e);
            toast.error('checkout faild! please try again')
        }
    })

    return <>
        <CartLayout cartData={cartData} fetchingCartData={fetchingCartData} updateCart={updateCart} isUpdatingItem={isUpdatingItem} removeFromCart={removeFromCart} isRemovingItem={isRemovingItem} clearCart={clearCart} clearingCartLoading={clearingCartLoading} checkout={checkout} checkoutLoading={checkoutLoading} />
    </>
}
