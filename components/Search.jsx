"use client"
import react, { useCallback, useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';

function Search() {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name, value) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
    
          return params.toString()
        },
        [searchParams]
    )


    const handleChange = (e) => {
         router.push(`${pathname}?${createQueryString('title', e.target.value)}`)
    }

    const debouncedOnChange = debounce(handleChange, 500);

  return (
    <label className="bg-neutral-800 w-72 rounded-3xl focus:outline relative">
        <IoSearchOutline className="absolute top-3.5 left-2" />
        <input defaultValue={searchParams.get('title')} onChange={debouncedOnChange} className="pl-8 w-full p-2.5 rounded-3xl bg-transparent focus:border-neutral-50 placeholder:text-neutral-500" type="text" name="search" id="search" placeholder="what do you want to listen?" />
    </label>
  )
}

export default Search