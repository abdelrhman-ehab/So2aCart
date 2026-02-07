import Loading from '@/app/loading';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


export default async function Categories() {
    // get categories
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`, {
        headers: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDA2ODc3NiwiZXhwIjoxNzc3ODQ0Nzc2fQ.5ff0mQsqMn3Zr0XLRGOx-tciHDs2W8LxKXqwa3FmgcE'
        },
        next: {
            revalidate: 60
        }
    })
    const { data: categories } = await response.json()

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
            Categories
        </h1>
        {categories ?
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {categories.map(categorie =>
                    <Card key={categorie._id} className={'rounded-lg p-4'}>
                        <Link className='space-y-3' href={`categories/${categorie._id}`}>
                            <Image className='w-full h-60 object-cover rounded-lg' src={categorie.image} unoptimized width={300} height={300} alt={categorie.name} />
                            <p className='text-xl font-semibold'>{categorie.name}</p>
                        </Link>
                    </Card>)}
            </div>
            :
            <Loading />
        }
    </>
}
