import Image from 'next/image'
import Link from 'next/link';
import { Card } from "@/components/ui/card"
import { IoStarSharp } from "react-icons/io5";
import Loading from '@/app/loading';
import WishlistButton from '@/components/ProductsComponents/WishlistButton';
import CartButton from '@/components/ProductsComponents/CartButton';

export default function Products_Layout({ products }) {
    return <>
        {products ?
            <div className="products-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product =>
                    <Card key={product._id} className='p-3'>
                        <Link href={`/products/${product._id}`} className='space-y-3'>
                            <div className="product-image overflow-hidden">
                                {product.imageCover ? <Image src={product.imageCover} alt='image' height={'400'} width={'400'} className='w-full rounded-lg object-contain max-h-70' /> : ''}
                            </div>
                            <div className="product-info flex flex-col gap-2">
                                <p className='text-gray-600 text-sm'>{product.brand.name}</p>
                                <p className='line-clamp-1 font-semibold text-lg'>{product.title}</p>
                                <p className='text-gray-600 text-sm'>{product.category.name}</p>
                                <div className='flex gap-2 items-center'>
                                    <div className='flex gap-1 text-yellow-400'>
                                        <IoStarSharp />
                                        <IoStarSharp />
                                        <IoStarSharp />
                                        <IoStarSharp />
                                    </div>
                                    <p>{product.ratingsAverage}</p>
                                    <p>({product.ratingsQuantity})</p>
                                </div>
                                <p className='line-clamp-1 font-semibold text-lg'><span className='text-red-900'>{product.price}$</span></p>
                            </div>
                        </Link>
                        <div className='flex flex-col items-center gap-3'>
                            <CartButton productId={product._id} />
                            <WishlistButton productId={product._id} />
                        </div>
                    </Card>
                )}
            </div> :
            <Loading />
        }
    </>
}
