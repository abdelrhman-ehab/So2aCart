// get data
export const getApiData = async (endPoint) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${endPoint}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDE0MzQ5NiwiZXhwIjoxNzc3OTE5NDk2fQ.LUyeBibyxK9409Ht9Wb7J3qfBpG3yI4jJp_rDXlVWtE'
            }
        }
    )
    const response = await res.json()
    return response
}

// add data
export const addingDataToApi = async (endPoint, productId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${endPoint}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDE0MzQ5NiwiZXhwIjoxNzc3OTE5NDk2fQ.LUyeBibyxK9409Ht9Wb7J3qfBpG3yI4jJp_rDXlVWtE'
            },
            body: JSON.stringify({
                productId: productId
            })
        }
    )
    const response = await res.json()
    return response
}

// remove data
export const removingDataFromApi = async (endPoint, productId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${endPoint}/${productId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODExYjI4NjM4NDUwZWM5NjhjYzU5YiIsIm5hbWUiOiJBYmRlbHJobWFuIEVoYWIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MDE0MzQ5NiwiZXhwIjoxNzc3OTE5NDk2fQ.LUyeBibyxK9409Ht9Wb7J3qfBpG3yI4jJp_rDXlVWtE'
            },
        }
    )
    const response = await res.json()
    return response
}
