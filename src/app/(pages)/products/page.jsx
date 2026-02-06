import React from 'react'
import Products_Layout from '../../../components/ProductsComponents/Products_Layout';

export default async function Products() {
    // get products
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`, {
        next: {
            revalidate: 60
        }
    })
    const { data: products } = await response.json()
    return <>
        <Products_Layout products={products} />
    </>
}