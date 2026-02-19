import ProductDetailsLayout from "./ProductDetailsLayout";

export default async function ProductInfo({ params }) {
    const { productId } = await params
    // get post details data
    const response = await fetch(`${process.env.API_URL}/products/${productId}`)
    const { data: product } = await response.json()
    console.log(product);
    console.log(response);



    return <>
        <ProductDetailsLayout product={product} productId={productId} />
    </>

}
