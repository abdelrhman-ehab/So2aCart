import React from 'react'
import Products_Layout from '../../products/Products_Layout'
import Link from 'next/link'

export default async function page({ params }) {
    const { brandId } = await params
    // get products of brand
    const res = await fetch(`${process.env.API_URL}/products?brand=${brandId}`, { method: "GET" })
    const response = await res.json()
    console.log(response);


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
            {response?.data?.[0]?.brand?.name} Products
        </h1>
        {response.results > 0 ?
            <Products_Layout products={response?.data} /> :
            <div className='h-120 w-full flex flex-col justify-center items-center gap-3'>
                <p className='text-2xl font-medium w-fit'>Sorry This Brand Is Empty Explore Another One</p>
                <Link href={'/brands'} className={'py-2 px-5 bg-black text-white rounded-md hover:bg-black/90 transition-all duration-300'}>Explore Brands</Link>
            </div>
        }
    </>
}
