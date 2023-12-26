import { secondToTime } from '@/utils/CommonFunction';
import Image from 'next/image'
import React from 'react'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { handleAddLikedSong, handleRemoveLikedSong } from '@/services/UserIteamDetails';


function SongBox({song={}, loading}) {


    const { signUpData } = useSelector((state) => state.authenticationSlice);
    const { likedSongs } = useSelector((state) => state.userIteam);
    const dispatch = useDispatch();

  return (
    <div className={`flex p-2 w-full ${!loading ? 'justify-between hover:bg-neutral-700/40' : 'gap-4'} items-center group transition-all duration-100 rounded-lg`}>
        {!loading && song ? (<Image src={song?.image[1]?.link} width={40} height={40}/>) : (<div className='skeleton h-[40px] aspect-square rounded-lg'></div>)}
        <div className={`flex flex-col ${loading && 'gap-2'} items-start w-[65%]`}>
            <p className={`${loading && 'skeleton h-3.5 rounded-lg w-[16.5rem]'} text-ellipsis whitespace-nowrap overflow-hidden w-full text-neutral-50 font-medium`} dangerouslySetInnerHTML={{ __html: song?.name }}></p>
            <p className={` ${loading && 'skeleton h-2.5 rounded-lg w-52'} text-ellipsis whitespace-nowrap overflow-hidden w-full text-sm font-medium text-neutral-400 group-hover:text-neutral-50`}>{song?.primaryArtists}</p>
        </div>
        {
            !loading && (
                <>
                    {
                        likedSongs.includes(song?.id) ? <FaHeart onClick={() => handleRemoveLikedSong(song, signUpData, likedSongs, dispatch)} className='text-neutral-400 cursor-pointer'/> : <FaRegHeart onClick={() => handleAddLikedSong(song, signUpData, likedSongs, dispatch)} className='text-neutral-400 invisible opacity-0 group-hover:opacity-100 group-hover:visible cursor-pointer'/>
                    }
                    {/* <Icon onClick={likdeStatus ? handleRemoveLikedSong : handleAddLikedSong} size={18} className='text-neutral-400 invisible opacity-0 group-hover:opacity-100 group-hover:visible cursor-pointer'/> */}
                    <p className='mx-6 font-medium text-neutral-400 '>{secondToTime(song?.duration)}</p>
                    <BsThreeDots className='invisible opacity-0 group-hover:opacity-100 group-hover:visible -tracking-tight'/>
                </>
            )
        }
    </div>
  )
}

export default SongBox