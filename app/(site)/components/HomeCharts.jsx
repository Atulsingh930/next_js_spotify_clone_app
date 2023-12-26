"use client"
import IteamContainer from '@/components/IteamContainer';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import CarousalLoader from '@/components/CarousalLoader';

function HomeCharts({charts}) {
  // //console.log(charts)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
      if(charts){
          setLoading(false)
      }
  }, [])
 
  return (
      <div className='w-full flex flex-col gap-4'>
          <div className='w-full flex justify-between items-end'>
                <p className='text-2xl font-semibold'>Charts</p>
                <Link href={'/section/charts'} className='text-sm text-neutral-400 font-semibold cursor-pointer hover:text-neutral-300 underline-offset-2 decoration-[1.5px] hover:underline'>Show All</Link>
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
                  charts?.slice(0, 5).map((chart) => (
                    <SwiperSlide>
                      <IteamContainer key={chart.id} data={chart} />
                    </SwiperSlide>
                  ))
              }
          </Swiper>
      </div>
  );
}

export default HomeCharts