import SearchIteams from '@/components/SearchIteams'
import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';
import CarousalLoader from '@/components/CarousalLoader';

function SearchAlbums({albums}) {
  return (
    <div className='w-full flex flex-col gap-4 items-start'>
        <p className='text-2xl text-neutral-50 font-semibold'>Albums</p>
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
            {albums?.length>0 ?  
            albums?.slice(0, 5).map((album) => (
                <SwiperSlide>
                    <SearchIteams data={album} />
                </SwiperSlide>
            )) :(<CarousalLoader/>)}
        </Swiper>
    </div>
  )
}

export default SearchAlbums