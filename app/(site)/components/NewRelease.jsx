import HomeLoader from '@/components/HomeLoader'
import IteamContainer from '@/components/IteamContainer'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import CarousalLoader from '@/components/CarousalLoader'

function NewRelease({ songs }) {
    //console.log(songs.length > 0)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(songs){
            setLoading(false)
        }
    }, [])
    
    const components1 = Array.from({ length : 5 }, (_, index) => (
          <HomeLoader />
    ));
    const components2 = Array.from({ length : 3 }, (_, index) => (
        <HomeLoader />
    ));
    const components3 = Array.from({ length : 2 }, (_, index) => (
    <HomeLoader key={index} />
    ));
    const components4 = Array.from({ length : 1 }, (_, index) => (
        <HomeLoader />
    ));

    return (

        <div className='w-full flex flex-col gap-4'>
            <div className='w-full flex justify-between items-end'>
                <p className='text-2xl font-semibold'>New Release</p>
                <Link href={'/section/trending'} className='text-sm text-neutral-400 font-semibold cursor-pointer hover:text-neutral-300 underline-offset-2 decoration-[1.5px] hover:underline'>Show All</Link>
            </div>
            <Swiper breakpoints={
              {
                100 : {
                  slidesPerView : 1
                },
                320 : {
                  slidesPerView: 2,
                  spaceBetween : 10
                },
                940 : {
                  slidesPerView: 3,
                  spaceBetween : 30
                },
                1496 : {
                  slidesPerView: 5,
                  spaceBetween: 10
                }
              }
            } mousewheel={true} cssMode={true}
             className="w-full flex gap-4 justify-between overflow-x-hidden">
                {loading ? (<CarousalLoader/>) :
                songs?.slice(0, 5)?.map((song) => (
                  <SwiperSlide className='w-full'>
                    <IteamContainer key={song.id} data={song} />
                  </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default NewRelease