"use client"
import Header from '@/components/Header'
import SongsConatiner from '@/components/SongsConatiner'
import { secondToHourTime } from '@/utils/CommonFunction'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiPlay } from 'react-icons/hi2'
import { useInView } from 'react-intersection-observer'
import { Waypoint } from 'react-waypoint'
import Loading from '../loading'
import { useDispatch, useSelector } from 'react-redux'
import { handleAddLikedPlaylist, handleRemoveLikedPlaylist } from '@/services/UserIteamDetails'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

function PlaylistDetailsClient({playlistData}) {

    const [isAtTop, setIsAtTop] = useState(false);
    const {inView, ref} = useInView()
    const [loading, setLoading] = useState(true);
    const { likedPlaylists } = useSelector((state) => state.userIteam);
    const { signUpData } = useSelector((state) => state.authenticationSlice);
    const dispatch = useDispatch();
    const handleEnter = () => {
      setIsAtTop(false);
    };
  
    const handleLeave = () => {
      setIsAtTop(true);
    };

    function handlePlaylistSongsParser() {
        if(playlistData){
            dispatch(addPlaylist(playlistData.songs));
            dispatch(addCurrentSongs(playlistData.songs[0]))
        }
    }

    useEffect(() => {
        if(playlistData) {
            setLoading(false)
        }
    }, [])
    //console.log(likedPlaylists, 'likedPlaylists')

  return loading ? (<Loading/>) : (
    <div className='bg-neutral-900 overflow-y-auto h-full w-full rounded-lg flex flex-col'>
    {   
         playlistData && (
        <>
            <Header playBtn={!inView ? playlistData?.name : null} style={{backgroundColor : "rgb(64, 72, 88)"}} className={`value sticky top-0 z-10`}/>

            <div ref={ref} style={{backgroundColor : "rgb(64, 72, 88)"}} className='flex flex-col sm:flex-row items-center gap-6 p-6'>
                <Image className='shadow-[rgba(0,_0,_0,_0.5)_0_4px_30px] transition-all duration-200 hover:scale-[101%] cursor-pointer rounded-md' height={230} width={230} loading='lazy' src={playlistData?.image[2]?.link}/>
                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-medium text-neutral-50'>{playlistData?.type ? playlistData?.type : "Playlist"}</p>
                    <p className='text-7xl max-sm:text-4xl font-bold tracking-tighter'>{playlistData?.name}</p>
                    <div className='flex max-sm:flex-col max-sm:items-start items-center gap-1 max-sm:gap-2 pt-2'>
                        <div className='flex items-center gap-1'>
                            <img className='rounded-full' height={24} width={24} src={'https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5'} alt='Spotify'/>
                            <p className='font-bold text-neutral-50'>Spotify</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <div className='flex items-center gap-1'>
                                <p className='font-semibold'>	&#8226;</p>
                                <p className='font-semibold'>{Number(playlistData?.followerCount).toLocaleString('en-US')} Likes</p>
                            </div>
                            <div className='hidden sm:flex items-center gap-1 '>
                                <p className='font-semibold'>{Number(playlistData?.songCount).toLocaleString('en-US')} {playlistData?.songCount > '1' ? "Songs" : "Song"},</p>
                            </div>
                            <p className='font-semibold visible sm:hidden'>	&#8226;</p>
                            <p className='font-semibold text-neutral-300'>About {secondToHourTime(playlistData?.songs.reduce((accumulator, currentValue) => accumulator + Number(currentValue?.duration),0))}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-8 isolate relative w-full'>
                <div className='CoLO4pdSl8LGWyVZA00t' style={{backgroundColor: "rgb(64, 72, 88)", background: `linear-gradient(0deg, rgba(23,23,23,1) 0%, ${"rgb(64, 72, 88)"} 100%)`}}></div>
                <div className='w-full flex items-center justify-start gap-12'>
                    <button className="ml-4 mt-8 transition w-16 aspect-square rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md hover:scale-110">
                        <HiPlay onClick={handlePlaylistSongsParser} size={26} className="text-black" />
                        <Waypoint onEnter={handleEnter} onLeave={handleLeave} />
                    </button>
                        {
                            likedPlaylists?.some((playlist) => playlist?.id === (playlistData?.id)) ? (
                                <button onClick={()=>handleRemoveLikedPlaylist(playlistData, signUpData, likedPlaylists, dispatch)} className='mt-8 mr-20'>
                                    <FaHeart size={40} className="text-green-500"/>
                                </button>
                            ) : (
                                <button onClick={()=>handleAddLikedPlaylist(playlistData, signUpData, likedPlaylists, dispatch)} className='mt-8 mr-20'>
                                    <FaRegHeart size={40} className="text-neutral-300"/> 
                                </button>
                            )
                        }
                </div>
                <SongsConatiner className={`sticky top-[4.4rem] ${isAtTop && 'bg-neutral-900'}`} data={playlistData?.songs}/>
            </div>
        </>
        )
    }
    </div>
  )
}

export default PlaylistDetailsClient