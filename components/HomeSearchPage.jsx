import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BiPlay } from 'react-icons/bi'
import SongBox from './SongBox';
import SearchAlbums from '@/app/search/(components)/SearchAlbums';
import SearchPlaylists from '@/app/search/(components)/SearchPlaylists';
import SearchArtists from '@/app/search/(components)/SearchArtists';
import { useSelector } from 'react-redux';

function HomeSearchPage({data={}}) {

    const[loading, setLoading] = useState(true)
    const { signUpData } = useSelector((state) => state.authenticationSlice);
    const { likedSongs } = useSelector((state) => state.userIteam);
    //console.log(likedSongs)
    const {searchAllData, searchSongsData, searchAlbumsData, searchPlaylistData, searchArtistData} = data

    useEffect(() => {
        if(searchAllData || searchSongsData || searchAlbumsData || searchPlaylistData || searchArtistData ) {
            setLoading(false)
        }
    }, [data])
    //console.log(searchSongsData)
    return (
    <div className='w-full px-6 flex flex-col items-start gap-8 mb-8'>
        <div className='w-full flex mt-2 gap-8 lg:flex-row flex-col'>
            <div className='lg:w-[40%] w-full flex flex-col items-start gap-4 relative'> 
                <p className='text-2xl text-neutral-50 font-semibold'>Top Results</p>
                <div className={`w-full transition duration-200 flex flex-col gap-4 group items-start py-4 px-5 bg-neutral-700/10 rounded-lg ${!loading ? 'hover:bg-neutral-700/20' : ''} cursor-pointer`}>
                    {
                        loading ? (<div className='skeleton group-hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-[100px] aspect-square rounded-full'></div>) : (<Image className={`${searchAllData?.topQuery?.results[0]?.type === 'artist' ? 'rounded-full' : 'rounded-lg'} skeleton group-hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`} height={100} width={100} src={searchAllData?.topQuery?.results[0]?.image[1]?.link} alt=''/>)
                    }
                    <div className='w-full flex flex-col items-start gap-3'>
                        {
                            loading ? (<div className='h-4 font-bold rounded-lg w-3/5 skeleton text-ellipsis whitespace-nowrap overflow-hidden'></div>) : (<p className='text-4xl font-bold w-full text-ellipsis whitespace-nowrap overflow-hidden'>{searchAllData?.topQuery?.results[0]?.title}</p>)
                        }
                        {
                            loading ? (<div className='h-4 font-bold rounded-lg w-2/5 skeleton text-ellipsis whitespace-nowrap overflow-hidden'></div>) : 
                            (
                                <div className='w-full flex gap-4 items-center justify-start'>
                                    {searchAllData?.topQuery?.results[0]?.type === 'song' && <p className='text-sm font-medium'>{searchAllData?.topQuery?.results[0]?.primaryArtists}</p>}
                                    <p className='capitalize px-3 py-1 font-semibold text-sm rounded-2xl bg-neutral-900'>{searchAllData?.topQuery?.results[0]?.type}</p>
                                </div>
                            )
                        }
                    </div>
                    {!loading && <div className='absolute bottom-6 right-6 h-14 aspect-square bg-green-600 rounded-full flex justify-center translate-y-1/4 items-center transition-all opacity-0 duration-200 invisible group-hover:visible group-hover:translate-y-0 group-hover:opacity-100'>
                        <BiPlay size={40} className='text-neutral-900'/>
                    </div>}
                </div>
            </div>
            <div className='lg:w-[60%] w-full flex flex-col items-start gap-4'>
                <p className='text-2xl text-neutral-50 font-semibold'>Songs</p>
                <div className='w-full flex flex-col items-start'>
                    {searchSongsData &&
                        searchSongsData?.slice(0, 4)?.map((song, index) => (
                            <SongBox song={!loading && searchSongsData ? song : '' } key={index} loading={loading}/>
                        ))
                    }
                </div>
            </div>
        </div>
        <SearchArtists artists={searchArtistData}/>
        <SearchAlbums albums={searchAlbumsData}/>
        <SearchPlaylists playlists={searchPlaylistData}/>
    </div>
  )
}

export default HomeSearchPage