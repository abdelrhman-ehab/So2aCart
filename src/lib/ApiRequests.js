// get cart data
export const getCartAPi = async () => {
    try {
        const res = await fetch('/api/get-cart')
        const response = await res.json()
        if (!res.ok || response.statusMsg === 'error') {
            throw new Error(response.message || 'Failed Get Cart Data')
        }
        console.log(`get cart data: `, response);
        return response
    } catch (e) {
        console.log('cart error is ', e);
    }
}

// get wishlist
export const getWishlistApi = async () => {
    try {
        const res = await fetch('/api/get-wishlist')
        const response = await res.json()
        if (!res.ok || response.statusMsg === 'error') {
            throw new Error(response.message || 'Failed Get Cart Data')
        }
        console.log(`get wishlist data: `, response);
        return response
    } catch (e) {
        console.log('wishlist error is ', e);
    }
}


