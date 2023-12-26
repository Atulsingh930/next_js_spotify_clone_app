"use client"
import React, { useEffect, useState } from 'react'
import NewRelease from './NewRelease'
import HomeCharts from './HomeCharts'
import HomeAlbums from './HomeAlbums'
import HomePlaylist from './HomePlaylist'
import { getHomePageDetails } from '@/services/HomeDetails'
import throttle from 'lodash.throttle'
import Header from '@/components/Header'
import Image from 'next/image'
import liked from '../../../public/assets/liked.webp'
import { HiPlay } from 'react-icons/hi2'

function PageContent({homePageDetails}) {
    // //console.log(homePageDetails, 'HOME')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(homePageDetails) {
            setLoading(false)
        }
    }, [])
    
    
  return (
    <div className="bg-neutral-900 overflow-y-auto h-full w-full rounded-lg">
    <Header className={"bg-gradient-to-b from-[#404858] "}>
    <div className="flex sm:w-fit w-full flex-col items-start gap-4 group cursor-pointer">
        <h1 className="text-3xl text-white font-semibold">Welcome back</h1>
        <div className="flex items-center justify-between group sm:w-fit w-full bg-neutral-100/10 transition group-hover:bg-neutral-100/20 gap-14 rounded-lg">
            <div className="flex items-center gap-4 h-16">
                <Image width={64} height={64} className="h-full rounded-l-lg" src={liked} alt="" />
                <p>Liked Songs</p>
            </div>
            <button className="transition opacity-0 mr-4 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md translate-y-0 translate group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
                <HiPlay size={26} className="text-black" />
            </button>
        </div>
    </div>
    </Header>
        <div className='mt-4 flex w-full flex-col items-start gap-8 p-6'>
            <NewRelease songs={homePageDetails?.trending?.songs.length>0?homePageDetails?.trending?.albums.concat(homePageDetails?.trending?.songs):homePageDetails?.trending?.albums}/>
            <HomeCharts charts={homePageDetails?.charts}/>
            <HomeAlbums albums={homePageDetails?.albums}/>
            <HomePlaylist playlists={homePageDetails?.playlists}/>
        </div>
    </div>
  )
}

export default PageContent