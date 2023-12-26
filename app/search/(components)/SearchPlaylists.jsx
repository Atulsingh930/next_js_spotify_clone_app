import CarousalLoader from '@/components/CarousalLoader'
import SearchIteams from '@/components/SearchIteams'
import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';

function SearchPlaylists({playlists}) {
  return (
    <div className='w-full flex flex-col gap-4 items-start'>
        <p className='text-2xl text-neutral-50 font-semibold'>Playlists</p>
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
                {playlists?.length>0 ?  
                playlists?.slice(0, 5).map((playlist) => (
                  <SwiperSlide>
                    <SearchIteams data={playlist} />
                  </SwiperSlide>
                )) :(<CarousalLoader/>)}
            </Swiper>
    </div>
  )
}

export default SearchPlaylists