import Loading from '@/app/loading'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BrandsLayout({ brands }) {
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
            Brands
        </h1>
        {brands ?
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {brands.map(brand =>
                    <Card key={brand._id} className={'rounded-lg p-4'}>
                        <Link className='space-y-3' href={`/brands/${brand._id}`}>
                            <Image className='w-full h-60 object-contain rounded-lg' src={brand.image} unoptimized width={300} height={300} alt={brand.name} />
                            <p className='text-xl font-semibold'>{brand.name}</p>
                        </Link>
                    </Card>)}
            </div>
            :
            <Loading />
        }
    </>
}
