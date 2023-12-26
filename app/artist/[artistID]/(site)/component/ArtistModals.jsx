import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaFacebook, FaTwitter, FaExternalLinkAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function ArtistModals({artistData, className, handleModal}) {
    //console.log(artistData)
  return artistData && (
    <div className={className}>
        <div className='fixed top-20 left-[28rem] translate-x-0 translate-y-0 z-20 '>
            <RxCross2 onClick={() => handleModal(false)} size={33} className='absolute top-4 right-4 p-1.5 rounded-full bg-neutral-950 cursor-pointer'/>
            <div className='h-[32rem] w-[45rem] bg-neutral-900 overflow-y-auto flex rounded-lg'>
                <div className='sticky top-0 left-0 h-full w-4/12 flex items-start flex-col py-4 px-6 gap-8'>
                    <Image className='rounded-full' src={artistData.image[2].link} height={150} width={150}/>
                    <div className='flex flex-col items-start gap-4'>
                        <div className='flex flex-col items-start'>
                            <p className='text-3xl font-bold'>{Number(artistData.followerCount).toLocaleString('en-US')}</p>
                            <p className='text-neutral-300 font-medium text-sm'>Followers</p>
                        </div>
                        <div className='flex flex-col items-start'>
                            <p className='text-3xl font-bold'>{Number(artistData.fanCount).toLocaleString('en-US')}</p>
                            <p className='text-neutral-300 font-medium text-sm'>Monthly Listners</p>
                        </div>
                        <div className='flex flex-col gap-4 text-neutral-400'>
                            <Link href={artistData.fb} target='_blank'>
                                <div className='flex items-center gap-2 group cursor-pointer'>
                                    <FaFacebook className='group-hover:text-neutral-50' size={20}/>
                                    <p className='text-sm  font-medium group-hover:text-neutral-50 group-hover:underline '>Facebook</p>
                                </div>
                            </Link>
                            <Link href={artistData.twitter} target='_blank'>
                                <div className='flex items-center gap-2 group cursor-pointer'>
                                    <FaTwitter className='group-hover:text-neutral-50' size={20}/>  
                                    <p className='text-sm  font-medium group-hover:text-neutral-50 group-hover:underline '>Twitter</p>
                                </div>
                            </Link>
                            <Link href={artistData.wiki} target='_blank'>
                                <div className='flex items-center gap-2 group cursor-pointer'>
                                    <FaExternalLinkAlt className='group-hover:text-neutral-50' size={20}/>  
                                    <p className='text-sm  font-medium group-hover:text-neutral-50 group-hover:underline '>Wikipedia</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <p className='w-8/12 py-4 px-6 pt-10 text-sm font-medium text-neutral-400'>{artistData.bio[0] && artistData.bio[0].text.replace(/â€™/g, "'").replace(/â€œ/g, '“').replace(/â€/g, '”').replace(/â€˜/g, "'")}</p>
            </div>
        </div>
        <div className='fixed inset-0 z-10 !mt-0 grid place-items-center overflow-auto  bg-opacity-10 backdrop-brightness-50 over'></div>
    </div>
  )
}

export default ArtistModals