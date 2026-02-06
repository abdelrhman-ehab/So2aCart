'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react'
import { CgProfile } from "react-icons/cg";
import { FaOpencart } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CartContext } from '@/Context/CartContext/CartContext';



export default function Navbar() {
    const pathName = usePathname()
    const { cartData, wishlistData } = useContext(CartContext)
    console.log(cartData);


    return <>
        <nav className="bg-gray-100 py-4 sticky top-0 z-50">
            <div className="container flex justify-between items-center">
                <div className="brand">
                    <Link className='flex items-center gap-0.5' href={'/'}>
                        <span className='bg-black p-1.5 text-white rounded-md text-xl font-medium me-0.5'><FaOpencart /></span>
                        <span className='text-2xl font-medium text-black'>Shopify</span>
                    </Link>
                </div>
                <div className="navLinks flex items-center gap-4 text-md font-medium">
                    <Link href={'/products'} className={pathName == '/products' ? 'bg-black p-2 text-white rounded-md' : ''}>
                        <span>Products</span>
                    </Link>
                    <Link href={'/brands'} className={pathName == '/brands' ? 'bg-black p-2 text-white rounded-md' : ''}>
                        <span>Brands</span>
                    </Link>
                    <Link href={'/categories'} className={pathName == '/categories' ? 'bg-black p-2 text-white rounded-md' : ''}>
                        <span>Categories</span>
                    </Link>
                </div>
                <div className="customization flex items-center gap-5 text-xl">
                    <Link href={'/cart'}>
                        <span className='relative'>
                            <FaOpencart />
                            {cartData?.numOfCartItems != null ? <span className='size-5 p-2 bg-black text-white rounded-full text-[10px] font-mono absolute -top-3 -right-3 flex justify-center items-center'>{cartData?.numOfCartItems}</span> : null}
                        </span>

                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <CgProfile className='text-2xl' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={'w-40 '}>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className={'outline-0'}>My Account</DropdownMenuLabel>
                                <Link href={'/profile'}> <DropdownMenuItem>Profile</DropdownMenuItem></Link>
                                <Link href={'/purchases'}><DropdownMenuItem>Purchases</DropdownMenuItem></Link>
                                <DropdownMenuSeparator className={'my-1'}></DropdownMenuSeparator>
                                <Link href={'/login'}><DropdownMenuItem>Login</DropdownMenuItem></Link>
                                <Link href={'/register'}><DropdownMenuItem>Register</DropdownMenuItem></Link>
                                <DropdownMenuItem className={'bg-red-800 text-white focus:bg-red-800 focus:text-white mt-2 cursor-pointer'}>Logout</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav >
    </>
}
