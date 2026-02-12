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
import { signOut, useSession } from 'next-auth/react';

export default function NavbarLayout({ cartData }) {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const pathName = usePathname()
    const session = useSession()
    console.log('user session', session);

    const [cartOwnerId, setCartOwnerId] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('cartOwnerId')
        }
        return null
    })


    return <>
        <nav className="bg-gray-200 py-4 sticky top-0 z-50 shadow">
            {/* navbar */}
            <div className="container flex justify-between items-center">
                <div className="brand">
                    <Link onClick={() => { setMenuIsOpen(false) }} className='flex items-center gap-1' href={'/'}>
                        <span className='bg-linear-to-r from-indigo-800 to-purple-800 p-1.5 text-white rounded-md text-xl font-medium me-0.5 mb-1'><FaOpencart /></span>
                        <span className='text-2xl font-bold text-black italic'>SoCart</span>
                    </Link>
                </div>
                {/* nav links */}
                <div className="navLinks lg:flex items-center gap-4 text-md font-bold hidden">
                    <Link href={'/products'} className={pathName.includes('/products') ? 'bg-linear-to-r from-indigo-800 to-purple-800 p-2 text-white rounded-md' : 'hover:text-indigo-700'}>
                        <span>Products</span>
                    </Link>
                    <Link href={'/brands'} className={pathName.includes('/brands') ? 'bg-linear-to-r from-indigo-800 to-purple-800 p-2 text-white rounded-md' : 'hover:text-indigo-700'}>
                        <span>Brands</span>
                    </Link>
                    <Link href={'/categories'} className={pathName.includes('/categories') ? 'bg-linear-to-r from-indigo-800 to-purple-800 p-2 text-white rounded-md' : 'hover:text-indigo-700'}>
                        <span>Categories</span>
                    </Link>
                    {
                        session.status === "authenticated" &&
                        <Link href={'/wishlist'} className={pathName.includes('/wishlist') ? 'bg-linear-to-r from-indigo-800 to-purple-800 p-2 text-white rounded-md' : 'hover:text-indigo-700'}>
                            <span>Wishlist</span>
                        </Link>
                    }

                    {session.status === "authenticated" &&
                        <Link href={`/orders/${cartOwnerId}`} className={pathName.includes('/orders') ? 'bg-linear-to-r from-indigo-800 to-purple-800 p-2 text-white rounded-md' : 'hover:text-indigo-700'}>
                            <span>Orders</span>
                        </Link>
                    }
                </div>
                {/* profile and cart */}
                <div className="customization flex items-center gap-5 text-xl">
                    {session.status === 'authenticated' && <p className='text-sm font-medium hidden sm:flex'>HI, {session.data.user.name}</p>}
                    {session.status === 'authenticated' &&
                        <Link href={'/cart'}>
                            <span onClick={() => { setMenuIsOpen(false) }} className='relative'>
                                <FaOpencart className='text-2xl mt-0.5' />
                                {cartData?.numOfCartItems != null ? <span className='size-5 p-2 bg-linear-to-r from-indigo-800 to-purple-800 text-white rounded-full text-[10px] font-mono absolute -top-3 -right-3 flex justify-center items-center'>{cartData?.numOfCartItems}</span> : null}
                            </span>
                        </Link>
                    }
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <CgProfile className='text-2xl cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={'w-40 '}>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className={'outline-0'}>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator className={'my-1'}></DropdownMenuSeparator>

                                {session.status === 'authenticated' ?
                                    <>
                                        <Link href={'/profile'}> <DropdownMenuItem>Profile</DropdownMenuItem></Link>
                                        <DropdownMenuItem className={'bg-red-800 text-white focus:bg-red-800 focus:text-white mt-2 cursor-pointer'} onClick={() => {
                                            signOut({
                                                callbackUrl: '/'
                                            })
                                        }}>Logout</DropdownMenuItem>
                                    </> :
                                    <>
                                        <Link href={'/login'}><DropdownMenuItem>Login</DropdownMenuItem></Link>
                                        <Link href={'/register'}><DropdownMenuItem>Register</DropdownMenuItem></Link>
                                    </>
                                }
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <FaBars className='text-2xl block lg:hidden cursor-pointer' onClick={() => { setMenuIsOpen(!menuIsOpen) }} />
                </div>
            </div>
            {/* hidden menu */}
            {menuIsOpen ?
                <div className='container text-black block lg:hidden mt-5'>
                    <div className="navLinks flex flex-col text-md font-medium">
                        <Link onClick={() => { setMenuIsOpen(false) }} href={'/products'} className={pathName.includes('/products') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md text-center' : 'p-2 text-center'}>
                            <span>Products</span>
                        </Link>
                        <Link onClick={() => { setMenuIsOpen(false) }} href={'/brands'} className={pathName.includes('/brands') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md text-center' : 'p-2 text-center'}>
                            <span>Brands</span>
                        </Link>
                        <Link onClick={() => { setMenuIsOpen(false) }} href={'/categories'} className={pathName.includes('/categories') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md text-center' : 'p-2 text-center'}>
                            <span>Categories</span>
                        </Link>

                        {session.status === 'authenticated' && <Link onClick={() => { setMenuIsOpen(false) }} href={'/wishlist'} className={pathName.includes('/wishlist') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md text-center' : 'p-2 text-center'}>
                            <span>Wishlist</span>
                        </Link>
                        }
                        {session.status === 'authenticated' &&
                            <Link onClick={() => { setMenuIsOpen(false) }} href={`/orders/${cartOwnerId}`} className={pathName.includes('/orders') ? 'bg-linear-to-r from-indigo-600 to-purple-600 p-2 text-white rounded-md text-center' : 'p-2 text-center'}>
                                <span>Orders</span>
                            </Link>
                        }
                    </div>
                </div> : null
            }
        </nav >
    </>
}
