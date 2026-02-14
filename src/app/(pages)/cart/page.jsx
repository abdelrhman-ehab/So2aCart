"use client"
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/ReactQueryProvider';
import CartLayout from './CartLayout';
import { useContext, useState } from 'react';
import { userContext } from '@/Context/UserContext';
import { checkoutAction, clearCartAction, removeFromCartAction, updateCartAction } from '@/app/(pages)/products/_action/productActions.action';

export default function Cart() {
    const [isRemovingItem, setIsRemovingItem] = useState(null)
    const [isUpdatingItem, setIsUpdatingItem] = useState(null)
    const { cartData, fetchingCartData } = useContext(userContext)

    // updating cart item count
    const { mutate: updateCart } = useMutation({
        mutationFn: ({ productId, count }) => {
            setIsUpdatingItem(productId)
            return updateCartAction(productId, count)
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
    const { mutate: removeFromCart } = useMutation({
        mutationFn: (productId) => {
            setIsRemovingItem(productId)
            return removeFromCartAction(productId)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['get-cart-data']
            })
            toast.success('Item Removed Successfully', { position: 'top-center' })
            setIsRemovingItem(null)
        },
        onError: (e) => {
            toast.error('Faild To Remove Item' + e.message, { position: 'top-center' })
            setIsRemovingItem(null)
        }
    })

    // clear cart
    const { mutate: clearCart, isPending: clearingCartLoading } = useMutation({
        mutationFn: () => clearCartAction(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['get-cart-data']
            })
            toast.success('Cart Now Is Empty', { position: 'top-center' })
        },
        onError: (e) => {
            toast.error(e.message || 'Faild To Clear Cart', { position: 'top-center' })
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
            return checkoutAction(cartId, shippingAddress)
        },
        onSuccess: (data) => {
            console.log(data);
            window.location.href = data.session.url;
        },
        onError: (e) => {
            console.log(e.message || 'faild to checkout ');
            toast.error('checkout faild! please try again')
        }
    })

    return <>
        <CartLayout cartData={cartData} fetchingCartData={fetchingCartData} updateCart={updateCart} isUpdatingItem={isUpdatingItem} removeFromCart={removeFromCart} isRemovingItem={isRemovingItem} clearCart={clearCart} clearingCartLoading={clearingCartLoading} checkout={checkout} checkoutLoading={checkoutLoading} />
    </>
}
