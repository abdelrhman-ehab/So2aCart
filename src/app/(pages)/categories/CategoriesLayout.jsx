import { Card } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image';
import Loading from '@/app/loading';
import Link from 'next/link';

export default function CategoriesLayout({ categories }) {


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
                            <Image className='w-full h-60 object-contain rounded-lg' src={categorie.image} unoptimized width={300} height={300} alt={categorie.name} />
                            <p className='text-xl font-semibold'>{categorie.name}</p>
                        </Link>
                    </Card>)}
            </div>
            :
            <Loading />
        }
    </>
}
