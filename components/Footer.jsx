import React from 'react'
import { AiFillHome } from "react-icons/ai";
import { IoSearchOutline, IoLibrary } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import Link from 'next/link';

function Footer() {
  return (
    
    <div className='sm:hidden visible relative my-auto w-full p-2 flex justify-between text-neutral-400'>
        <Link href={"/"}>
            <div className='flex flex-col gap-1 items-center mt-1'>
                <AiFillHome size={28}/>
                <p>Home</p>
            </div>
        </Link>
        <Link href={"/search"}>
            <div className='flex flex-col gap-1 items-center mt-1'>
                <IoSearchOutline size={28}/>
                <p>Search</p>
            </div>
        </Link>
        <Link href={"/library"}>
            <div className='flex flex-col gap-1 items-center mt-1'>
                <IoLibrary size={28}/>
                <p>My Library</p>
            </div>
        </Link>
        <div className='flex flex-col gap-1 items-center mt-1'>
            <FaUserCircle size={28}/>
            <p>Account</p>
        </div>
    </div>
  )
}

export default Footer