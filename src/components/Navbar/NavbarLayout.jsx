"use client"
import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { FaOpencart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function NavbarLayout({ cartData }) {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const pathName = usePathname()
    return <>
        <nav className="bg-gray-200 py-4 sticky top-0 z-50 shadow">
            {/* navbar */}
            <div className="container flex justify-between items-center">
                <div className="brand">
                    <Link className='flex items-center gap-1' href={'/'}>
                        <span className='bg-linear-to-r from-indigo-600 to-purple-600 p-1.5 text-white rounded-md text-xl font-medium me-0.5 mb-1'><FaOpencart /></span>
                        <span className='text-2xl font-medium text-black italic'>SoCart</span>
                    </Link>
                </div>
                <div className="navLinks sm:flex items-center gap-4 text-md font-medium hidden">
                    <Link href={'/products'} className={pathName.includes('/products') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md' : ''}>
                        <span>Products</span>
                    </Link>
                    <Link href={'/brands'} className={pathName.includes('/brands') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md' : ''}>
                        <span>Brands</span>
                    </Link>
                    <Link href={'/categories'} className={pathName.includes('/categories') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md' : ''}>
                        <span>Categories</span>
                    </Link>
                    <Link href={'/wishlist'} className={pathName.includes('/wishlist') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md' : ''}>
                        <span>Wishlist</span>
                    </Link>
                </div>
                <div className="customization flex items-center gap-5 text-xl">
                    <Link href={'/cart'}>
                        <span className='relative'>
                            <FaOpencart className='text-2xl mt-0.5' />
                            {cartData?.numOfCartItems != null ? <span className='size-5 p-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full text-[10px] font-mono absolute -top-3 -right-3 flex justify-center items-center'>{cartData?.numOfCartItems}</span> : null}
                        </span>

                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <CgProfile className='text-2xl cursor-pointer' />
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
                    <FaBars className='text-2xl block sm:hidden cursor-pointer' onClick={() => { setMenuIsOpen(!menuIsOpen) }} />
                </div>
            </div>
            {/* hidden menu */}
            {menuIsOpen ?
                <div className='container text-black block sm:hidden mt-5'>
                    <div className="navLinks flex flex-col text-md font-medium">
                        <Link href={'/products'} className={pathName.includes('/products') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md text-center' : 'p-2 text-center'}>
                            <span>Products</span>
                        </Link>
                        <Link href={'/brands'} className={pathName.includes('/brands') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md text-center' : 'p-2 text-center'}>
                            <span>Brands</span>
                        </Link>
                        <Link href={'/categories'} className={pathName.includes('/categories') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md text-center' : 'p-2 text-center'}>
                            <span>Categories</span>
                        </Link>
                        <Link href={'/wishlist'} className={pathName.includes('/wishlist') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md text-center' : 'p-2 text-center'}>
                            <span>Wishlist</span>
                        </Link>
                    </div>
                </div> : null
            }
        </nav >
    </>
}
