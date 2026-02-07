"use client"
import { useMutation } from '@tanstack/react-query'
import { FaRegHeart } from 'react-icons/fa'

export default function WishlistButton({ productId }) {
  // add item to wishlist
  const { mutate: addProductToWishlist, isPending: addingProductLoading } = useMutation({
    mutationFn: (productId) => addingDataToApi('wishlist', productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-wishlist-data"]
      })
      toast.success("Item Added To Wishlist Successfully.", { position: "top-center" })
    },
    onError: () => {
      toast.error("Faild To Add Item To Wishlist.", { position: "top-center" })
    }
  })

  // remove item from Wishlist
  const { mutate: removeProductFromWishlist, isPending: removingProductLoading } = useMutation({
    mutationFn: (productId) => removingDataFromApi('Wishlist', productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-wishlist-data"]
      })
      toast.success("Item Removed From Wishlist Successfully.", { position: "top-center" })
    },
    onError: () => {
      toast.error("Faild To Remove Item from Wishlist.", { position: "top-center" })
    }
  })
  return <>
    <FaRegHeart onClick={() => { addProductToWishlist(productId) }} className="text-3xl cursor-pointer" />
  </>
}
