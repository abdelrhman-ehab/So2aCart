import React from 'react'
import Products_Layout from './Products_Layout';

export default async function Products() {
    // get products
    const response = await fetch(`${process.env.API_URL}/products`, {
        next: {
            revalidate: 60
        }
    })
    const { data: products } = await response.json()
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
            Products
        </h1>
        <Products_Layout products={products} />
    </>
}