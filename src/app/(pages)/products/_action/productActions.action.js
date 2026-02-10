'use server'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDE0MzQ5NiwiZXhwIjoxNzc3OTE5NDk2fQ.LUyeBibyxK9409Ht9Wb7J3qfBpG3yI4jJp_rDXlVWtE'

// /////////////////////////////////////////////// Cart Actions ///////////////////////////////////////////////////////////
// add to cart action
export default async function addToCartAction(productId) {
  const res = await fetch(`${process.env.API_URL}/cart`,
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
    throw new Error(response.message || 'Failed to add to cart')
  }
  return response
}

// remove from cart action
export const removeFromCartAction = async (productId) => {
  const res = await fetch(`${process.env.API_URL}/cart/${productId}`,
    {
      method: 'DELETE',
      headers: {
        token: token
      },
    }
  )
  const response = await res.json()
  if (!res.ok || response.statusMsg === 'error') {
    throw new Error(response.message || 'faild to delete item from cart')
  }

  return response
}

// update cart action
export const updateCartAction = async (productId, count) => {
  const res = await fetch(`${process.env.API_URL}/cart/${productId}`,
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

// clearing cart action
export const clearCartAction = async () => {
  const res = await fetch(`${process.env.API_URL}/cart`,
    {
      method: 'DELETE',
      headers: {
        token: token
      },
    }
  )
  const response = await res.json()
  if (!res.ok || response.statusMsg === 'error') {
    throw new Error(response.message || 'faild to clear cart')
  }
  return response
}

// checkout action
export const checkoutAction = async (cartId, shippingAddress) => {
  const res = await fetch(`${process.env.API_URL}/orders/checkout-session/${cartId}?url=http://localhost:3000`,
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
  if (!res.ok || response.statusMsg === 'error') {
    throw new Error(response.message || 'faild to checkout')
  }
  return response
}


// /////////////////////////////////////////////// Wishlist Actions ///////////////////////////////////////////////////////////



// add to wishlist action
export async function addToWishlistAction() {
  const res = await fetch(`${process.env.API_URL}/wishlist`,
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
  const response = res.json()
  if (!res.ok || response.statusMsg === 'error') {
    throw new Error(response.message || 'faild to add to wishlist')
  }
  return response
}

// remove from wishlist action
export const removeFromWishliostAction = async (productId) => {
  const res = await fetch(`${process.env.API_URL}/wishliost/${productId}`,
    {
      method: 'DELETE',
      headers: {
        token: token
      },
    }
  )
  const response = await res.json()
  if (!res.ok || response.statusMsg === 'error') {
    throw new Error(response.message || 'faild to delete item from wishliost')
  }
  return response
}



