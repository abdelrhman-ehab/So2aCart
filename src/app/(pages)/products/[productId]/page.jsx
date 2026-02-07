import ProductDetailsLayout from "./ProductDetailsLayout";

export default async function ProductInfo({ params }) {
    const { productId } = await params
    // get post details data
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${productId}`)
    const { data: product } = await response.json()

    return <>
        <ProductDetailsLayout product={product} productId={productId} />
    </>

}
