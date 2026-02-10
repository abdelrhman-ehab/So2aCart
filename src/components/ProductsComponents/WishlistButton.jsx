"use client"
import { useMutation } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { Heart, HeartCrack, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { removingDataFromApi } from '@/lib/ApiRequests'
import { queryClient } from '@/providers/ReactQueryProvider'
import { usePathname } from 'next/navigation'
import { addToWishlistAction, removeFromWishliostAction } from '../../app/(pages)/products/_action/productActions.action'

export default function WishlistButton({ productId }) {
  const pathname = usePathname()
  // add item to wishlist
  const { mutate: addProductToWishlist, isPending: addingProductLoading } = useMutation({
    mutationFn: (productId) => addToWishlistAction(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-wishlist-data"]
      })
      toast.success("Item Added To Wishlist Successfully.", { position: "top-center" })
    },
    onError: (e) => {
      toast.error(e.message || "Faild To Add Item To Wishlist.", { position: "top-center" })
    }
  })

  // remove item from Wishlist
  const { mutate: removeProductFromWishlist, isPending: removingProductLoading } = useMutation({
    mutationFn: (productId) => removeFromWishliostAction(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-wishlist-data"]
      })
      toast.success("Item Removed From Wishlist Successfully.", { position: "top-center" })
    },
    onError: (e) => {
      toast.error(e.message || "Faild To Remove Item from Wishlist.", { position: "top-center" })
    }
  })


  return <>
    {pathname === '/wishlist' ?
      <Button disabled={removingProductLoading} onClick={() => { removeProductFromWishlist(productId) }} className="cursor-pointer w-full bg-red-950 hover:bg-red-900" > {removingProductLoading ? null : <HeartCrack />} {removingProductLoading ? <Loader2 className='animate-spin' /> : 'Remove From Wishlist'}</Button> :
      <Button disabled={addingProductLoading} onClick={() => { addProductToWishlist(productId) }} className="cursor-pointer w-full" > {addingProductLoading ? null : <Heart />} {addingProductLoading ? <Loader2 className='animate-spin' /> : 'Add To Wishlist'}</Button>
    }

  </>
}
