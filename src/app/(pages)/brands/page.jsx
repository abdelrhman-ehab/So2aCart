import React from 'react'
import BrandsLayout from './BrandsLayout';

export default async function Brands() {

    // get brands
    const response = await fetch(`${process.env.API_URL}/brands`, {
        next: {
            revalidate: 60
        }
    })
    const { data: brands } = await response.json()
    return <>
        <BrandsLayout brands={brands} />
    </>
}
