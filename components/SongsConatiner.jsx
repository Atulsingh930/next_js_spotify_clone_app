"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoTimeOutline } from "react-icons/io5";
import { secondToTime } from '@/utils/CommonFunction';
import HomeLoader from './HomeLoader';
import { twMerge } from 'tailwind-merge';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentSongs, addPlaylist } from '@/ReduxSlices/playerSlice';
import { usePathname } from 'next/navigation';
import { getArtistRecommendedSongs } from '@/services/HomeDetails';
import { VscKebabVertical } from "react-icons/vsc";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { setLikedSongs } from '@/ReduxSlices/userIteamSlice';
import { addLikedSongs, getUserData, removeLikedSongs } from '@/config/firestoreFunction';
import { setSignUpDetails } from '@/ReduxSlices/authenticationSlice';
import { handleAddLikedSong, handleRemoveLikedSong } from '@/services/UserIteamDetails';

function SongsConatiner({data=[], className, type='playlist'}) {
    
    const[loading, setLoading] = useState(true)
    const pathname = usePathname()
    const dispatch = useDispatch();
    const {songs} = useSelector((state) => state.player);
    const {likedSongs} = useSelector((state) => state.userIteam);
    const {signUpData} = useSelector((state) => state.authenticationSlice);
    const renderComponent = () => {
        return <HomeLoader type='songs' />;
    };
    
    const components = Array.from({ length: 8 }, (_, index) => (
      <React.Fragment key={index}>{renderComponent()}</React.Fragment>
    ));
    

    async function handlePlaySong (song) {
        if(pathname === '/search' && !(songs.length > 0)) {
            //console.log(song?.primaryArtistsId, song?.id)
            const result = await getArtistRecommendedSongs(song?.primaryArtistsId, song?.id);
            if(result){
                result.splice(0, 0, song)
                dispatch(addPlaylist(result))
            }
            //console.log(result, 'result')
        }
        dispatch(addCurrentSongs(song))
        //console.log(songs, 'songs')

    }
    useEffect(() => {
        if(data){
            setLoading(false)
        }
    }, [])

    //console.log(data, 'SongsContainer')
  return (
    !loading && (
    <table  className='w-full overflow-x-hidden border-separate border-spacing-0 hello mb-10'>
        <tr className={twMerge(`w-full relative z-10`, className)}>
            <th className='text-start border-b border-neutral-700 w-[5%] pl-10 py-2 mb-4'>#</th>
            <th className='text-start border-b border-neutral-700 sm:w-[50%] w-[90%] py-2'>Title</th>
            <th className='visible max-sm:hidden text-start border-b border-neutral-700 w-[30%] py-2'>{type==='playlist' ? 'Album' : 'Plays'}</th>
            <th className='visible max-sm:hidden text-start border-b border-neutral-700 w-[5%] pr-20'>
                <IoTimeOutline />
            </th>
            <th className='visible sm:hidden border-b border-neutral-700 w-[5%]'>
                
            </th>
            
        </tr>
        {
            !data ? (components) : (data.map((item, index) => (
                <tr className='w-full overflow-x-hidden group hover:bg-neutral-700/40'>
                    <td className='text-start w-[3.825rem] pl-10 py-2'>{index+1}</td>
                    <td className='text-start sm:w-[35rem]  w-[13rem] py-2 px-2 flex gap-4 items-center'>
                        <Image onClick={()=>handlePlaySong(item)} className='h-[50px] w-[50px]' src={item?.image[2]?.link} width={50} height={50} alt="" />
                        <div className='sm:w-[30rem] w-full'>
                            <p className='w-full text-ellipsis whitespace-nowrap overflow-x-hidden text-sm font-semibold' dangerouslySetInnerHTML={{ __html: item?.name }}></p>
                            <p className='w-full text-ellipsis whitespace-nowrap overflow-x-hidden text-sm font-medium text-neutral-400' dangerouslySetInnerHTML={{ __html: item?.primaryArtists }}></p>
                        </div>
                    </td>
                    <td className='text-start w-[20.285rem] py-2 visible max-sm:hidden'>
                        <div className=' w-[20rem]'>
                            <p className='w-[80%] text-ellipsis whitespace-nowrap overflow-x-hidden text-sm font-medium text-neutral-400' dangerouslySetInnerHTML={{ __html: item?.album?.name}}></p>
                        </div>
                    </td>
                    <td className=' relative  visible max-sm:hidden'>
                        <p className='text-neutral-400 text-sm font-medium'>{secondToTime(item?.duration)}</p>
                        {
                            likedSongs?.includes(item?.id) ? <FaHeart onClick={() => handleRemoveLikedSong(item, signUpData, likedSongs, dispatch)} className='absolute top-6 right-32 cursor-pointer opacity-100'/> : <FaRegHeart onClick={() => handleAddLikedSong(item, signUpData, likedSongs, dispatch)} className='absolute top-6 right-32 cursor-pointer opacity-0 group-hover:opacity-100 group-hover:visible'/>
                        }
                        <BsThreeDots className='absolute top-6 right-8 invisible opacity-0 group-hover:opacity-100 group-hover:visible -tracking-tight'/>
                    </td>
                    <td className='visible sm:hidden text-white pr-2 my-auto font-bold'>
                        <VscKebabVertical/>
                    </td>
                </tr>
            )))
        }
    </table>
    )
  )
}
  

export default SongsConatiner