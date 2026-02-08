const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDE0MzQ5NiwiZXhwIjoxNzc3OTE5NDk2fQ.LUyeBibyxK9409Ht9Wb7J3qfBpG3yI4jJp_rDXlVWtE'

// get data
export const getApiData = async (endPoint) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${endPoint}`,
        {
            method: 'GET',
            headers: {
                token: token
            }
        }
    )
    const response = await res.json()
    if (!res.ok || response.statusMsg === 'error') {
        throw new Error(response.message || 'Failed to update cart')
    }
    console.log(`get ${endPoint} data: `, response);
    return response
}

// add data
export const addingDataToApi = async (endPoint, productId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${endPoint}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
            body: JSON.stringify({
                productId: productId
            })
        }
    )
    const response = await res.json()
    if (!res.ok || response.statusMsg === 'error') {
        throw new Error(response.message || 'Failed to update cart')
    }
    console.log(`add ${endPoint} data: `, response);
    return response
}

// update cart
export const updateCartApi = async (productId, count) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/${productId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
            body: JSON.stringify({
                count: count
            })
        }
    )
    const response = await res.json()
    console.log(`update data: `, response);
    if (!res.ok || response.statusMsg === 'error') {
        throw new Error(response.message || 'Failed to update cart')
    }
    return response
}

// remove data
export const removingDataFromApi = async (endPoint, productId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${endPoint}/${productId}`,
        {
            method: 'DELETE',
            headers: {
                token: token
            },
        }
    )
    const response = await res.json()
    console.log(`remove ${endPoint} data: `, response);
    if (!res.ok || response.statusMsg === 'error') {
        throw new Error(response.message || 'Failed to update cart')
    }
    return response
}

// clearing cart
export const clearCartApi = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart`,
        {
            method: 'DELETE',
            headers: {
                token: token
            },
        }
    )
    const response = await res.json()
    console.log(`clear cart: `, response);
    return response
}

// checkout
export const checkoutApi = async (cartId, shippingAddress) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
            body: JSON.stringify({ shippingAddress })
        }
    )
    const response = await res.json()
    console.log(`checkout: `, response);
    return response
}