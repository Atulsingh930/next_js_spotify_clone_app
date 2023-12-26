"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchCarousalData } from '@/utils/Constant'
import { getSearchAlbums, getSearchArtist, getSearchPlaylists, getSearchSongs } from '@/services/HomeDetails';
import ArtistContainer from './ArtistContainer';
import SearchIteams from './SearchIteams';
import HomeLoader from './HomeLoader';
import { useInView } from 'react-intersection-observer';
import SongsConatiner from './SongsConatiner';
import HomeSearchPage from './HomeSearchPage';
import throttle from 'lodash.throttle';
function SearchCarousal({homeSearchPageData}) {

    const searchParams = useSearchParams();
    const [searchData, setSearchData] = useState([]);
    const [active, setActive] = useState('all');
    const [index, setIndex] = useState(2);
    const [hasMore, setHasMore] = useState(true)
    const {inView, ref} = useInView()


    const renderComponent = () => {
        return <HomeLoader />;
      };
    
      const components = Array.from({ length: 10 }, (_, index) => (
        <React.Fragment key={index}>{renderComponent()}</React.Fragment>
      ));

    const handleClick = (value) => {
        setSearchData([])
        setActive(value)
        setHasMore(true)
    }
    useEffect(() => {
        handleActive();
        setIndex(2)
        setHasMore(true)
    }, [searchParams.get('title'), active]);

    const fetchMoreData = throttle(async()=> {
        if (searchData?.length > 0) {
            let result;
            if (active === 'artists') {
            result = await getSearchArtist(searchParams.get('title'), index);
            } else if (active === 'playlists') {
            result = await getSearchPlaylists(searchParams.get('title'), index);
            } else if (active === 'albums') {
            result = await getSearchAlbums(searchParams.get('title'), index);
            } else if (active === 'songs') {
            result = await getSearchSongs(searchParams.get('title'), index);
            }
            if (result) {
            setSearchData([...searchData, ...result.results]);
            setHasMore(result.total > searchData.length);
            }
        }
  
      setIndex((prevIndex) => prevIndex + 1);
    }, 200);

    useEffect(() => {
      //console.log(hasMore)
      if(inView && hasMore){
        fetchMoreData()
      }
    }, [inView])
    
    const handleActive = () => {
        //console.log(active)
        if(active==='all') {
            setSearchData(homeSearchPageData)
        }
        if (active === 'artists') {
            setSearchData(homeSearchPageData?.searchArtistData)
        } 
        if (active === 'playlists') {
            setSearchData(homeSearchPageData?.searchPlaylistData)
        } 
        if (active === 'albums') {
            setSearchData(homeSearchPageData?.searchAlbumsData)
        } 
        if (active === 'songs') {
            setSearchData(homeSearchPageData?.searchSongsData)
        }
    }

    useEffect(() => handleActive(), [active])


  return homeSearchPageData && (
    searchParams.get('title') && (
        <div className='flex flex-col items-start w-full'>
        <div className='flex gap-4 sm:overflow-x-hidden overflow-x-auto pb-4 w-full bg-neutral-900 px-6 sticky sm:top-[4.75rem] top-[5.9rem] z-10 hidden_scrollbar'>
            {
                searchCarousalData.map((item, index) => (
                    <button onClick={()=>handleClick(item.id)} className={`${active===item?.id ? 'bg-neutral-50 text-neutral-800' : 'text-neutral-50 bg-neutral-800 hover:bg-neutral-700/50'} font-medium px-2.5 py-1 text-sm rounded-2xl transition duration-150`} key={index}>{item.title}</button>
                ))
            }
        </div>

        {
            active === 'all' ? (
                <HomeSearchPage data={searchData}/>
            ) : (
                <div className='w-full flex flex-wrap gap-6 mt-6'>
                {
                    active==='artists' && (
                      <div className='flex flex-wrap min-[400px]:justify-center min-[400px]:gap-6 justify-between'>
                        {
                          searchData?.map((item, index) => (
                            <ArtistContainer data={item} key={index}/>
                        ))
                        }
                      </div>
                    )
                }
                {
                    active==='albums' && <div className='flex flex-wrap min-[400px]:justify-center min-[400px]:gap-6 justify-between'>
                      {
                        searchData?.map((item, index) => (
                        <SearchIteams data={item} key={index}/>
                      ))
                      }
                    </div>
                }
                {
                    active==='playlists' && <div className='flex flex-wrap min-[400px]:justify-center min-[400px]:gap-6 justify-between'>
                      {
                        searchData?.map((item, index) => (
                        <SearchIteams data={item} key={index}/>
                      ))
                      }
                    </div>
                }
                {
                  (active==='songs') && (
                    <SongsConatiner className={'bg-neutral-800 sticky sm:top-[7rem] top-[8.5rem]'} data={searchData}/>
                )
                }
                <p ref={ref} className={`w-full text-center ${!hasMore && 'hidden'}`}>Loading...</p>
                </div>
            )
        }
        
    </div>)
    )
}

export default SearchCarousal

