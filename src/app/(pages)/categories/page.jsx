import React from 'react'
import CategoriesLayout from './CategoriesLayout';


export default async function Categories() {
    // get categories
    const response = await fetch(`${process.env.API_URL}/categories`, {
        next: {
            revalidate: 60
        }
    })
    const { data: categories } = await response.json()

    return <>
        <CategoriesLayout categories={categories} />
    </>
}
