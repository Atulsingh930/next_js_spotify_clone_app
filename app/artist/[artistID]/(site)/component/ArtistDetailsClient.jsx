"use client";

import Header from '@/components/Header'
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react'
import verifed from '../../../../../public/assets/verifed.png'
import Loading from '@/app/loading';
import { HiPlay } from 'react-icons/hi2';
import { artistMainFind, secondToTime, shuffle } from '@/utils/CommonFunction';
import CarousalLoader from '@/components/CarousalLoader';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Waypoint } from 'react-waypoint';
import { useInView } from 'react-intersection-observer';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import SearchIteams from '@/components/SearchIteams';
import { useParams } from 'next/navigation';
import ArtistModals from './ArtistModals';
import { VscKebabVertical } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddArtistFollow, handleRemoveArtistFollow } from '@/services/UserIteamDetails';

function ArtistDetailsClient({artistDetails}) {

    const [ref, inView] = useInView();
    const [showBtn, setShowBtn] = useState(false);
    const artistID = useParams();
    const [seeMore, setSeeMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState('all');
    const [popular, setPopular] = useState([]);
    const [handleModal, setHandleModal] = useState(false)
    const {artistFollow} = useSelector((state) => state.userIteam)
    const {signUpData} = useSelector((state) => state.authenticationSlice)
    const dispatch = useDispatch();
    const {artistData, artistLatestSongs, artistLatestAlbums, artistAlbums, artistSongs, artisAppearList } = artistDetails    

    const handleActive = useMemo(() =>
        [
            {
                id : 1,
                title : 'Popular releases',
                name : 'all',
                checkActive : active === 'all',
            },
            {
                id : 2,
                title : 'Albums',
                name : 'albums',
                checkActive : active === 'albums',
            },
            {
                id : 3,
                title : 'Single and EPs',
                name : 'songs',
                checkActive : active === 'songs',
            }
        ]
    , [active])

    useEffect(() => {
        if(artistLatestAlbums && artistLatestSongs) {
            setPopular(shuffle([...popular, ...artistMainFind(artistID.artistID, artistLatestAlbums), ...artistMainFind(artistID.artistID, artistLatestSongs)]))
            setLoading(false)
        }
    }, [])
    // console.log(artistFollow, 'artistLatestAlbums');


  return !loading ? (
    <div className='bg-neutral-900 overflow-y-auto h-full w-full rounded-lg flex flex-col relative pb-10'>
        <Header playBtn={showBtn ? artistData?.name : ''} className={`sticky top-0 z-10 ${!inView ? 'bg-transparent animate-colorChange' : 'animate-reversecolorChange'}`}/>
        <div style={{backgroundColor: "rgb(64, 72, 88)"}} className='w-full -mt-[6rem] sm:-mt-[4.5rem] pt-[6rem] p-6 object-cover bg-center flex gap-6 items-center flex-col sm:flex-row'>
            <Image height={230} width={230} className='rounded-full shadow-[rgba(0,_0,_0,_0.5)_0_4px_30px] transition-all duration-200 hover:scale-[101%] cursor-pointer' src={artistData?.image[2]?.link} alt="" />
            <div className='flex flex-col gap-2 '>
                <div className='flex items-center gap-2'>
                    {
                        artistData?.isVerified ? (
                            <>
                                <Image src={verifed} height={35} width={35}/>
                                <p className='font-medium text-neutral-50'>Verified Artist</p>
                            </>
                        ) : (<p className='font-medium text-neutral-50'>Artist</p>)
                    }
                </div>
                <p ref={ref} className='text-7xl max-sm:text-4xl font-bold tracking-tighter'>{artistData?.name}</p>
                <p className='text-neutral-50 font-medium -tracking-tight'>{Number(artistData?.followerCount).toLocaleString('en-UN')} monthly listeners</p>
            </div>
        </div>
        <Waypoint onEnter={()=>setShowBtn(false)} onLeave={()=>setShowBtn(true)}/>
        <div className='flex flex-col gap-8 isolate relative w-full'>
            <div className='CoLO4pdSl8LGWyVZA00t' style={{backgroundColor: "rgb(64, 72, 88)", background: `linear-gradient(0deg, rgba(23,23,23,1) 0%, rgb(64, 72, 88) 100%)`}}></div>
            <div className='flex items-center gap-6 px-6'>
                <button className="transition w-14 aspect-square rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md hover:scale-110">
                    <HiPlay size={26} className="text-black" />
                </button>
                <button onClick={()=>artistFollow.some((artist)=>artist.id===artistData?.id) ? handleRemoveArtistFollow(artistData, signUpData, artistFollow, dispatch) : handleAddArtistFollow(artistData, signUpData, artistFollow, dispatch)} className='text-neutral-50 border border-neutral-400 px-6 py-2 flex items-center justify-center rounded-full text-sm font-medium hover:scale-[1.03] hover:border-neutral-50 hover:border-2  transition-all duration-75 overflow-hidden'>
                    {artistFollow.some((artist)=>artist.id===artistData?.id) ? 'Following' : 'Follow'}
                </button>
            </div>
            <div className='flex flex-col items-start gap-4 px-6 w-full'>
                <p className='text-2xl font-semibold tracking-tighter'>Popular</p>
                <div className='w-full grid items-center grid-cols-1'>
                    {
                        artistSongs.slice(0, seeMore ? artistSongs.length : 5)?.map((song, index) => (
                            <div className='sm:grid-cols-[5%_45%_42%_5%] sm:pl-4 py-2 rounded-md grid hover:bg-neutral-700 duration-100 max-sm:flex items-center justify-between'>
                                <p className='text-neutral-400 ml-4 visible max-sm:hidden my-auto'>{index+1}</p>
                                <div className='text-start sm:w-[35rem] w-[15rem] py-2 px-2 flex gap-4 items-center'>
                                    <Image className='rounded-sm h-[50px] w-[50px]' src={song?.image[2]?.link} height={42} width={42}/>
                                    <div className='flex flex-col items-start w-full'>
                                        <p className='text-neutral-50 w-full text-ellipsis whitespace-nowrap overflow-hidden font-bold text-sm' dangerouslySetInnerHTML={{__html : song?.name}}></p>
                                        <p className='text-neutral-400 visible sm:hidden font-medium text-sm my-auto w-full text-ellipsis whitespace-nowrap overflow-hidden' dangerouslySetInnerHTML={{__html : song?.album?.name}}></p>
                                    </div>
                                </div>
                                <p className='text-neutral-400 visible max-sm:hidden font-medium text-sm my-auto' dangerouslySetInnerHTML={{__html : song?.album?.name}}></p>
                                <p className='text-neutral-400 visible max-sm:hidden font-medium text-sm my-auto'>{secondToTime(song?.duration)}</p>
                                <p className='visible sm:hidden text-white -pr-2 my-auto font-bold'><VscKebabVertical/></p>
                            </div>
                        ))
                    }
                </div>
                <button className='px-6 text-sm text-neutral-500 font-semibold hover:text-neutral-50' onClick={() => setSeeMore(!seeMore)}>
                    {seeMore ? 'See Less' : 'See More'}
                </button>
            </div>
        </div>
        <div className='flex flex-col gap-6 px-6 mt-8'>
            <div className='w-full flex justify-between items-end'>
                <p className='text-2xl font-semibold tracking-tighter'>Discography</p>
                <Link href={'/section/trending'} className='text-sm text-neutral-400 font-semibold cursor-pointer hover:text-neutral-300 underline-offset-2 decoration-[1.5px] hover:underline'>Show All</Link>
            </div>
            <div className='flex gap-4 items-center overflow-x-auto hidden_scrollbar'>
                {
                    handleActive.map((item, index) => (
                        <div onClick={() => setActive(item.name)} className={`text-sm py-2 px-4 rounded-3xl cursor-pointer transition-all duration-200 whitespace-nowrap ${item.checkActive ? 'bg-neutral-50 text-neutral-900 font-medium' : 'text-neutral-100 bg-neutral-700/50 font-medium hover:bg-neutral-700/60'}`} key={index}>{item.title}</div>
                    ))
                }
            </div>
            <Swiper breakpoints={
              {
                100 : {
                  slidesPerView : 1
                },
                320 : {
                  slidesPerView: 2,
                  spaceBetween : 30
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
             className="w-full flex gap-4 justify-between overflow-x-hidden transition-all duration-200">
                {loading ? (<CarousalLoader/>) :
                (active==="albums" && artistAlbums || active==="songs" && artistSongs || active==="all" && popular)?.slice(0, 5)?.map((song) => (
                  <SwiperSlide className='w-full'>
                    <SearchIteams key={song.id} data={song} />
                  </SwiperSlide>
                ))}
            </Swiper>
        </div>
        {
            artisAppearList.length > 0 && (
                <div className='flex flex-col gap-6 px-6 mt-8'>
                    <div className='w-full flex justify-between items-end'>
                        <p className='text-2xl font-semibold tracking-tighter'>Appears On</p>
                        <Link href={'/section/trending'} className='text-sm text-neutral-400 font-semibold cursor-pointer hover:text-neutral-300 underline-offset-2 decoration-[1.5px] hover:underline'>Show All</Link>
                    </div>
                    <Swiper breakpoints={
                      {
                        100 : {
                          slidesPerView : 1
                        },
                        320 : {
                          slidesPerView: 2,
                          spaceBetween : 30
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
                     className="w-full flex gap-4 justify-between overflow-x-hidden transition-all duration-200">
                        {loading ? (<CarousalLoader/>) :
                        artisAppearList?.slice(0, 5)?.map((song) => (
                          <SwiperSlide className='w-full'>
                            <SearchIteams key={song.id} data={song} />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )
        }
        <div onClick={() => scrollTo({ y: 0 })} className='flex-col gap-6 px-6 mt-8 hidden sm:flex '>
            <p className='text-2xl font-semibold tracking-tighter'>About</p>
            <div onClick={() => setHandleModal(true)} className='py-10 px-9 flex items-center gap-8 bg-neutral-800/50 rounded-2xl transition-all duration-300 hover:scale-[1.01] cursor-pointer'>
                <Image src={artistData?.image[2]?.link} alt={artistData?.name} width={250} height={250} className='rounded-full'/>
                <div className='flex flex-col gap-4'>
                    <p className='font-medium'>{Number(artistData?.fanCount).toLocaleString('en-US')} monthly listeners</p>
                    <p className='line-clamp-3 text-neutral-50 relative' dangerouslySetInnerHTML={{__html: artistData?.bio[0] && artistData?.bio[0]?.text}}></p>
                </div>
            </div>
        </div>
        <ArtistModals handleModal={setHandleModal} className={`${handleModal ? 'opacity-100 visible transition-all duration-150 ease-in-out': 'opacity-0 hidden transition-all duration-150 ease-in-out'}`} artistData={artistData}/>
    </div>
  ) : (<Loading/>)
}

export default ArtistDetailsClient


