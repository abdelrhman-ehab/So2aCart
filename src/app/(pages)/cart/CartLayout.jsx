"use client"
import Loading from '@/app/loading'
import { AlertDialogAction, AlertDialogCancel, AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { GoTrash } from 'react-icons/go'

export default function CartLayout({ cartData, fetchingCartData, updateCart, isUpdatingItem, removeFromCart, isRemovingItem, clearCart, clearingCartLoading, checkout, checkoutLoading }) {
    const checkoutCity = useRef()
    const checkoutPhoneNumber = useRef()
    const checkoutDetails = useRef()

    console.log(cartData);

    return <>
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
            {cartData ?
                cartData?.numOfCartItems === 0 ?
                    <div className='min-h-110 flex flex-col justify-center items-center'>
                        <span className='text-2xl font-semibold mb-2'>Your Cart Looks Empty</span>
                        <Button className={'bg-linear-to-r from-indigo-800 to-purple-800 hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300'} asChild><Link href={'/products'}>Explore Products</Link></Button>
                    </div>
                    : fetchingCartData ?
                        <Loading /> :
                        <>
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
                                                        <Button disabled={product.count == 1 || (isUpdatingItem === product.product._id)} onClick={() => { updateCart({ productId: product.product._id, count: product.count - 1 }) }} className='w-fit rounded-md text-black text-xl font-semibold bg-transparent border border-black/30 hover:bg-black/30 hover:text-white cursor-pointer'>-</Button>
                                                        {isUpdatingItem === product.product._id ? <Loader2 className='animate-spin' /> : <p>{product.count}</p>}
                                                        <Button disabled={isUpdatingItem === product.product._id} onClick={() => { updateCart({ productId: product.product._id, count: product.count + 1 }) }} className='w-fit rounded-md text-black bg-transparent border border-black/30  hover:bg-black/30 hover:text-white cursor-pointer'>+</Button>
                                                    </div>
                                                    <Button disabled={isRemovingItem === product.product._id} onClick={() => { removeFromCart(product.product._id) }} className={'bg-red-900 text-white cursor-pointer px-3 py-1 rounded-md hover:bg-white hover:text-red-900 hover:border hover:border-red-900 hidden sm:block'}>{isRemovingItem === product.product._id ? <Loader2 className='animate-spin' /> : 'Remove Item'}</Button>
                                                    {isRemovingItem === product.product._id ? <Loader2 className='animate-spin block sm:hidden' /> : <GoTrash className='text-2xl text-red-900 block sm:hidden' disabled={isRemovingItem === product.product._id} onClick={() => { removeFromCart(product.product._id) }} />}
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
                                                <AlertDialogTrigger asChild render={<Button variant="outline" />}>
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
                                                        <AlertDialogAction onClick={() => { checkout({ cartId: cartData?.cartId, checkoutDetails: checkoutDetails.current.value, checkoutPhoneNumber: checkoutPhoneNumber.current.value, checkoutCity: checkoutCity.current.value }) }}>{checkoutLoading ? <Loader2 className='animate-spin' /> : 'Visa'}</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                            <Link href={'/products'}><Button className={'w-full bg-white border text-black hover:text-white cursor-pointer'}>Continue Shopping</Button></Link>
                                        </div>
                                    </div>
                                    <Button disabled={clearingCartLoading} onClick={() => { clearCart() }} className='w-full bg-red-900 text-white cursor-pointer px-3 py-1 rounded-md hover:bg-white hover:text-red-900 hover:border hover:border-red-900'>{clearingCartLoading ? <Loader2 className='animate-spin' /> : 'Clear Cart'}</Button>
                                </Card>
                            </div>
                        </> :
                <div className='min-h-[60vh] flex justify-center items-center font-bold text-3xl'>
                    <p>Error Page</p>
                </div>
            }
        </section>

    </>
}
