import Loading from '@/app/loading'
import CartButton from '@/components/ProductsComponents/CartButton'
import ProductSlider from '@/components/ProductsComponents/ProductSlider'
import WishlistButton from '@/components/ProductsComponents/WishlistButton'
import { Card } from '@/components/ui/card'
import React from 'react'
import { IoStarSharp } from 'react-icons/io5'

export default function ProductDetailsLayout({ product, productId }) {
    return <>
        {product ?
            <Card className="p-5 flex flex-wrap md:flex-nowrap flex-row">
                <div className="w-full md:w-1/3 product-cover flex justify-center items-center">
                    <ProductSlider product={product} />
                </div>
                <div className="product-info w-full md:w-2/3 flex flex-col gap-3">
                    <div>
                        <p className="text-gray-500 text-sm font-mono">{product.brand.name}</p>
                        <p className="text-lg font-semibold">{product.title}</p>
                    </div>
                    <p>{product.description}</p>
                    <div>
                        <p className="text-black text-sm font-medium">{product.category.name}</p>
                        <p className="text-sm font-mono text-black">{product.subcategory[0].name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xl text-yellow-400">
                            <IoStarSharp />
                            <IoStarSharp />
                            <IoStarSharp />
                            <IoStarSharp />
                        </div>
                        <p>{product.ratingsAverage}</p>
                        <p>({product.ratingsQuantity})</p>
                    </div>
                    <div className="text-gray-500 text-sm font-mono">
                        <p>quantity: ({product.quantity})</p>
                        <p>sold: ({product.sold})</p>
                        <p>sold: ({product.sold})</p>
                    </div>
                    <p className="text-lg font-medium">Price: <span className="text-red-800">{product.price}$</span></p>
                    <div className='flex items-center gap-2 flex-col sm:flex-row'>
                        <CartButton productId={productId} />
                        <WishlistButton productId={productId} />
                    </div>
                </div>
            </Card> :
            <Loading />
        }
    </>
}
