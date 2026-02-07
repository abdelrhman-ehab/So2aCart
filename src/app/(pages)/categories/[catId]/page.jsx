import Products_Layout from '@/app/(pages)/products/Products_Layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

export default async function page({ params }) {
    const { catId } = await params
    console.log('params', catId);


    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?category[in]=${catId}`, { method: "GET" })
    const response = await res.json()
    return <>
        <h1 className="relative text-4xl font-bold text-indigo-600 mb-10
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
            {response?.data?.[0]?.category?.name} Products
        </h1>
        {response?.data?.length > 0 ?
            <Products_Layout products={response?.data} /> :
            <div className='h-120 w-full flex flex-col justify-center items-center gap-3'>
                <p className='text-2xl font-medium w-fit'>Sorry This Category Is Empty Explore Another One</p>
                <Link href={'/categories'} className={'py-2 px-5 bg-black text-white rounded-md hover:bg-black/90 transition-all duration-300'}>Explore Categories</Link>
            </div>
        }
    </>
}
