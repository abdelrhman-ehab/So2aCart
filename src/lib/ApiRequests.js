const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDE0MzQ5NiwiZXhwIjoxNzc3OTE5NDk2fQ.LUyeBibyxK9409Ht9Wb7J3qfBpG3yI4jJp_rDXlVWtE'

// get cart data
export const getCartAPi = async () => {
    const res = await fetch('http://localhost:3000/api/get-cart')
    const response = await res.json()
    if (!res.ok || response.statusMsg === 'error') {
        throw new Error(response.message || 'Failed Get Cart Data')
    }
    console.log(`get cart data: `, response);
    return response
}


export const getWishlistApi = async () => {
    const res = await fetch('http://localhost:3000/api/get-wishlist')
    const response = await res.json()
    if (!res.ok || response.statusMsg === 'error') {
        throw new Error(response.message || 'Failed Get Cart Data')
    }
    console.log(`get wishlist data: `, response);
    return response
}
