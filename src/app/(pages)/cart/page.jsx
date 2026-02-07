"use client"
import Loading from '@/app/loading'
import { GoTrash } from "react-icons/go";
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CartContext } from '@/Context/CartContext/CartContext'
import { removingDataFromApi } from '@/lib/ApiRequests'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'



export default function Cart() {
    const { cartData, setCartData, getCartProducts, cartDataLoading, getCartError } = useContext(CartContext)
    const [removingId, setRemovingId] = useState(null)
    const [removingAll, setRemovingAll] = useState(false)
    const [chekingOut, setCheckingOut] = useState(false)
    const checkoutCity = useRef()
    const checkoutPhoneNumber = useRef()
    const checkoutDetails = useRef()

    console.log(cartData);

    // get cart items
    useEffect(() => {
        getCartProducts()
    }, [])

    // updating item count
    const updateCount = async (productId, count) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/${productId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDE0MzQ5NiwiZXhwIjoxNzc3OTE5NDk2fQ.LUyeBibyxK9409Ht9Wb7J3qfBpG3yI4jJp_rDXlVWtE'
                },
                body: JSON.stringify({
                    count: count
                })
            }

        )
        const response = await res.json()
        console.log(response);
        if (response.status == 'success') {
            setCartData(response)
        }
        else {
            toast.error('Faild To Update Count', { position: 'top-center' })
        }
    }

    // removing item
    const removeFromCart = async (productID) => {
        setRemovingId(productID)
        const response = await removingDataFromApi('cart', productID)
        console.log(response);
        if (response.status == 'success') {
            setCartData(response)
            toast.success('Item Removed Successfully', { position: 'top-center' })
        }
        else {
            toast.error('Faild To Remove Item', { position: 'top-center' })
        }
        setRemovingId(null)
    }

    // clear cart
    const clearCart = async () => {
        setRemovingAll(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDE0MzQ5NiwiZXhwIjoxNzc3OTE5NDk2fQ.LUyeBibyxK9409Ht9Wb7J3qfBpG3yI4jJp_rDXlVWtE'
                },
            }
        )
        const response = await res.json()
        if (response.message == 'success') {
            await getCartProducts()
            toast.success('Cart Removed Successfully', { position: 'top-center' })
            console.log(cartData);
        }
        else {
            toast.error('Faild To Remove Cart', { position: 'top-center' })
        }
        setRemovingAll(false)
    }

    //
    const checkout = async (cartId, checkoutDetails, checkoutPhoneNumber, checkoutCity) => {
        const shippingAddress = {
            details: checkoutDetails,
            phone: checkoutPhoneNumber,
            city: checkoutCity
        }
        setCheckingOut(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDE0MzQ5NiwiZXhwIjoxNzc3OTE5NDk2fQ.LUyeBibyxK9409Ht9Wb7J3qfBpG3yI4jJp_rDXlVWtE'
                    },
                    body: JSON.stringify({ shippingAddress })
                }
            )
            const response = await res.json()
            if (response.status === 'success') {
                window.location.href = response.session.url
            }
            console.log(response);
        } catch (e) {
            toast.error('checkout faild! pleasetry again')
        } finally {
            setCheckingOut(false)
        }
    }
    return <>
        {(cartDataLoading || typeof cartData?.data?.products?.[0]?.product == 'string') ? <Loading /> : cartData?.numOfCartItems == 0 ?
            <div className='w-full min-h-130 flex flex-col items-center justify-center'>
                <div>
                    <p className='text-black text-xl font-medium'>Ops! Cart Looks Empty..</p>
                    <Link href={'/products'} className={'mt-3 bg-black text-white w-fit flex m-auto hover:bg-white hover:text-black border hover:border hover:border-black cursor-pointer px-5 py-2 rounded-md transition-colors duration-500'}>Continue Shopping..</Link>
                </div>
            </div> :
            <section>
                <h1 className="relative text-4xl font-bold mb-3 text-indigo-600
               after:content-['']
               after:absolute
               after:left-0
               after:-bottom-3
               after:w-18
               after:h-1
               after:bg-linear-to-r
               after:from-indigo-600
               after:to-purple-600
               after:rounded">
                    Shopping Cart
                </h1>
                <p className='text-gray-400'>{cartData?.data?.numOfCartItems} items in your cart</p>
                <div className='flex flex-wrap gap-5 lg:flex-nowrap mt-10'>
                    <div className="products w-full lg:w-2/3 space-y-4">
                        {cartData?.data?.products?.map(product =>
                            <Card key={product._id} className={'p-4 flex flex-row gap-4 rounded-lg'}>
                                <Image className='w-20 object-cover' src={product.product.imageCover} width={400} height={400} alt='image' />
                                <div className='w-full shrink space-y-2'>
                                    <div className='flex items-center justify-between'>
                                        <p className='line-clamp-1 w-2/3'>{product.product.title}</p>
                                        <p className='w-1/3 text-end'>{product.price} EGP</p>
                                    </div>
                                    <p className='line-clamp-1 text-gray-500'>{product.product.brand.name} - {product.product.category.name}</p>
                                    <div className='flex items-center justify-between mt-3'>
                                        <div className='flex items-center gap-2 sm:gap-3'>
                                            <Button disabled={product.count == 1} onClick={() => { updateCount(product.product._id, product.count - 1) }} className='w-fit rounded-md text-black text-xl font-semibold bg-transparent border border-black/30 hover:bg-black/30 hover:text-white cursor-pointer'>-</Button>
                                            <p>{product.count}</p>
                                            <Button onClick={() => { updateCount(product.product._id, product.count + 1) }} className='w-fit rounded-md text-black bg-transparent border border-black/30  hover:bg-black/30 hover:text-white cursor-pointer'>+</Button>
                                        </div>
                                        <Button disabled={removingId == product.product._id} onClick={() => { removeFromCart(product.product._id) }} className={'bg-red-900 text-white cursor-pointer px-3 py-1 rounded-md hover:bg-white hover:text-red-900 hover:border hover:border-red-900 hidden sm:block'}>{removingId == product.product._id ? <Loader2 className='animate-spin' /> : 'Remove Item'}</Button>
                                        <GoTrash className='text-2xl text-red-900 block sm:hidden' disabled={removingId == product.product._id} onClick={() => { removeFromCart(product.product._id) }} />
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                    <Card className="orderSummary w-full lg:w-1/3 p-2 sm:p-4 rounded-lg h-fit">
                        <div className='space-y-3'>
                            <h2 className='text-2xl font-medium'>Order Summary</h2>
                            <div className='flex items-center justify-between'>
                                <p>Subtotal (${cartData?.data?.products?.length} items)</p>
                                <p className='text-lg font-medium'>${cartData?.data?.totalCartPrice} EGP</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p>Shipping</p>
                                <p className='text-green-700 text-lg font-medium'>Free</p>
                            </div>
                            <hr />
                            <div className='flex items-center justify-between'>
                                <p className='text-lg font-medium'>Total</p>
                                <p className='text-lg font-medium'>${cartData?.data?.totalCartPrice} EGP</p>
                            </div>
                            <div className='space-y-3 flex flex-col'>
                                {/* show modal */}
                                <AlertDialog>
                                    <AlertDialogTrigger render={<Button variant="outline" />}>
                                        <Button className={'w-full cursor-pointer'}>Proceed To Checkout</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Checkout Data</AlertDialogTitle>
                                            <AlertDialogDescription className={'space-y-2'}>
                                                <Input ref={checkoutPhoneNumber} placeholder={'enter your phone'} />
                                                <Input ref={checkoutCity} placeholder={'enter your city'} />
                                                <textarea ref={checkoutDetails} className='w-full p-2 border border-black/10 rounded-lg resize-none' rows={3} placeholder='enter checkout details' />
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel Checkout</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => { checkout(cartData?.cartId, checkoutDetails.current.value, checkoutPhoneNumber.current.value, checkoutCity.current.value) }}>{chekingOut ? <Loader2 className='animate-spin' /> : 'Visa'}</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <Link href={'/products'}><Button className={'w-full bg-white border text-black hover:text-white cursor-pointer'}>Continue Shopping</Button></Link>
                            </div>
                        </div>
                        <Button disabled={removingAll} onClick={() => { clearCart() }} className='w-full bg-red-900 text-white cursor-pointer px-3 py-1 rounded-md hover:bg-white hover:text-red-900 hover:border hover:border-red-900'>{removingAll ? <Loader2 className='animate-spin' /> : 'Clear Cart'}</Button>
                    </Card>
                </div>
            </section>}

    </>
}
