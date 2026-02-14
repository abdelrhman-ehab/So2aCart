import Loading from '@/app/loading'
import WishlistButton from '@/components/ProductsComponents/WishlistButton'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoStarSharp } from 'react-icons/io5'

export default function WishlistLayout({ wishlist, WishlistFetching }) {
    return <>
        <h1 className="relative text-4xl font-bold mb-10 text-indigo-600
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
            Wishlist
        </h1>
        {wishlist?.data ? wishlist.count === 0 ?
            <div className='min-h-110 flex flex-col justify-center items-center'>
                <span className='text-2xl font-semibold mb-2'>Your Wishlist Looks Empty</span>
                <Button className={'bg-linear-to-r from-indigo-800 to-purple-800 hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300'} asChild><Link href={'/products'}>Explore Products</Link></Button>
            </div> :
            WishlistFetching ?
                <Loading /> :
                <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {wishlist?.data.map(item =>
                        <Card key={item._id} className={'p-4 rounded-lg space-y-2'}>
                            <Image src={item.imageCover} width={500} height={500} unoptimized alt={item.title} className='w-100 object-contain rounded-lg'></Image>
                            <div className="product-info flex flex-col gap-1.5">
                                <p className='text-gray-600 text-sm'>{item.brand.name}</p>
                                <p className='line-clamp-1 font-semibold text-lg'>{item.title}</p>
                                <p className='text-gray-600 text-sm'>{item.category.name}</p>
                                <div className='flex gap-2 items-center'>
                                    <div className='flex gap-1 text-yellow-400'>
                                        <IoStarSharp />
                                        <IoStarSharp />
                                        <IoStarSharp />
                                        <IoStarSharp />
                                    </div>
                                    <p>{item.ratingsAverage}</p>
                                    <p>({item.ratingsQuantity})</p>
                                </div>
                                <p className='line-clamp-1 font-semibold text-lg'><span className='text-red-900'>{item.price}$</span></p>
                                {/* <Button className={'bg-red-900 hover:bg-red-950 cursor-pointer mt-1.5'}>Remove From WishList <Trash /></Button> */}
                                <WishlistButton productId={item._id} />
                            </div>
                        </Card>
                    )}
                </section> :
            <div className='min-h-[60vh] flex justify-center items-center font-bold text-3xl'>
                <p>Error Page</p>
            </div>
        }
    </>
}
