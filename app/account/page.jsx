"use client"
import Header from '@/components/Header'
import React, { useState } from 'react';
import { FaRegUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import UserProfileUpdateModal from './(site)/UserProfileUpdateModal';
import Image from 'next/image';

function AccountDetails() {

    const { signUpData } = useSelector((state)=>state.authenticationSlice)
    const [handleModal, setHandleModal] = useState(null)

  return (
    <div className='bg-neutral-900 overflow-y-auto h-full w-full rounded-lg'>
        <div style={{backgroundColor : "rgb(84,84,84)"}} className='flex flex-col items-start gap-8 bg-[linear-gradient(135deg,_rgba(84,_84,_84,_1)_0%,_rgba(45,_45,_45,_1)_100%)] w-full h-[21rem]'>
            <Header userName={`${signUpData?.first} ${signUpData?.last}`} className={'value sticky -mt-24 top-0 z-10 bg-transparent'}/>
            <div onClick={()=>setHandleModal(signUpData)} className='w-ful pt-[4rem] object-cover bg-center flex gap-6 items-center flex-col sm:flex-row px-6 cursor-pointer'>
                <div className='rounded-full h-[15rem] w-[15rem] bg-neutral-800 p-2 flex justify-center items-center shadow-[rgba(0,_0,_0,_0.5)_0_5px_30px] cursor-pointer'>
                    {
                        signUpData?.profileUrl ? <Image src={signUpData?.profileUrl} width={300} height={300} alt='profile' className='rounded-full h-full aspect-square'/> : <FaRegUser className='text-neutral-500' size={50}/>
                    }
                    
                </div>
                <div className='flex flex-col items-start'>
                    <p className='font-medium text-neutral-50'>Profile</p>
                    <p className='text-8xl max-sm:text-4xl font-bold tracking-tighter'>{`${signUpData?.first} ${signUpData?.last}`}</p>
                </div>
            </div>
        </div>
        <UserProfileUpdateModal className={`${handleModal ? 'opacity-100 visible transition-all duration-150 ease-in-out': 'opacity-0 hidden transition-all duration-150 ease-in-out'}`} handleModal={setHandleModal} userData={handleModal}/>
    </div>
  )
}

export default AccountDetails