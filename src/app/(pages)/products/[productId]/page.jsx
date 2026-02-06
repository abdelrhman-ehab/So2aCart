import { IoStarSharp } from "react-icons/io5";
import { Card } from "@/components/ui/card"
import ProductSlider from "../../../../components/ProductsComponents/ProductSlider";
import AddToCart from "@/components/ProductsComponents/AddToCart";


export default async function ProductInfo({ params }) {
    const { productId } = await params
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${productId}`)
    const { data: product } = await response.json()

    return <>
        <Card className="grid grid-cols-12 gap-10 p-5">
            <div className="col-span-12 md:col-span-4 product-cover flex justify-center items-center">
                <ProductSlider product={product} />
            </div>
            <div className="col-span-12 md:col-span-8 product-info flex flex-col justify-center gap-3">
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
                <AddToCart productId={productId} />
            </div>
        </Card>

    </>

}
