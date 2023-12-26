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
import { useSelector } from 'react-redux'
import { getSongDetails } from '@/services/HomeDetails'
import liked from '../../public/assets/liked.webp'

function UserLikedSongs() {

    const {likedSongs} = useSelector((state)=>state.userIteam)
    const {signUpData} = useSelector((state)=>state.authenticationSlice)
    const[playlistData, setPlaylistData] = useState([])
    const [isAtTop, setIsAtTop] = useState(false);
    const {inView, ref} = useInView()
    const [loading, setLoading] = useState(true);
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

    async function getlikedSongsDetails(){
        const songIDs = likedSongs.join();
        const result = await getSongDetails(songIDs);
        if(result){
            setPlaylistData(result)
            setLoading(false)
        }
    }

    useEffect(() => {
        getlikedSongsDetails()
    }, [])
    //console.log(playlistData)

    useEffect(() => {
        setPlaylistData(playlistData.filter((song) => likedSongs.includes(song.id)))
    }, [likedSongs])
    

  return loading ? (<Loading/>) : (
    <div className='bg-neutral-900 overflow-y-auto h-full w-full rounded-lg flex flex-col'>
    {   
        "rgb(80, 56, 160)" && playlistData && (
        <>
            <Header playBtn={!inView ? 'Liked Songs' : null} style={{backgroundColor : "rgb(80, 56, 160)"}} className={`value sticky top-0 z-10`}/>

            <div ref={ref} style={{backgroundColor : "rgb(80, 56, 160)"}} className='flex flex-col sm:flex-row items-center gap-6 p-6'>
                <Image className='shadow-[rgba(0,_0,_0,_0.5)_0_4px_30px] transition-all duration-200 hover:scale-[101%] cursor-pointer rounded-md' height={230} width={230} loading='lazy' src={liked}/>
                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-medium text-neutral-50'>{"Playlist"}</p>
                    <p className='text-7xl max-sm:text-4xl font-bold tracking-tighter'>Liked Songs</p>
                    <div className='flex max-sm:flex-col max-sm:items-start items-center gap-1 max-sm:gap-2 pt-2'>
                        <div className='flex items-center gap-1'>
                            <p className='font-bold text-neutral-50'>{`${signUpData.first} ${signUpData.last}`}</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <div className='hidden sm:flex items-center gap-1 '>
                                <p className='font-semibold'>{Number(playlistData?.length).toLocaleString('en-US')} {playlistData?.length > '1' ? "Songs" : "Song"},</p>
                            </div>
                            <p className='font-semibold visible sm:hidden'>	&#8226;</p>
                            <p className='font-semibold text-neutral-300'>About {secondToHourTime(playlistData?.reduce((accumulator, currentValue) => accumulator + Number(currentValue?.duration),0))}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-8 isolate relative'>
                <div className='CoLO4pdSl8LGWyVZA00t' style={{backgroundColor: "rgb(80, 56, 160)", background: `linear-gradient(0deg, rgba(23,23,23,1) 0%, ${"rgb(80, 56, 160)"} 100%)`}}></div>
                <button className="ml-4 mt-8 transition w-16 aspect-square mr-4 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md hover:scale-110">
                    <HiPlay onClick={handlePlaylistSongsParser} size={26} className="text-black" />
                    <Waypoint onEnter={handleEnter} onLeave={handleLeave} />
                </button>
                <SongsConatiner className={`sticky top-[4.4rem] ${isAtTop && 'bg-neutral-900'}`} data={playlistData}/>
            </div>
        </>
        )
    }
    </div>
  )
}

export default UserLikedSongs