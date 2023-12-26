"use client"

import Header from '@/components/Header'
import HomeLoader from '@/components/HomeLoader';
import IteamContainer from '@/components/IteamContainer';
import { getHomePageDetails } from '@/services/HomeDetails';
import throttle from 'lodash.throttle';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

function page({params}) {

    const pageDetails = [
        {
            id : "albums",
            heading : "Popular Albums",
        }, 
        {
            id : "charts",
            heading : "Charts",
        }, 
        {
            id : "trending",
            heading : "New Releases",
        }, 
        {
            id : "playlists",
            heading : "Top Playlists",
        }, 
    ]

    let {sectionName} = params;
    const[pageData, setPageData] = useState([]);
    const dispatch = useDispatch()

    const renderComponent = () => {
        return <HomeLoader />;
      };
    
      const components = Array.from({ length: 10 }, (_, index) => (
        <React.Fragment key={index}>{renderComponent()}</React.Fragment>
      ));
    
    const homePageDetailsData = throttle(async () => {
        const result = await getHomePageDetails();
        if (result) {
            if (Array.isArray(result[sectionName])) {
                setPageData(result[sectionName]);
            }
            else {
                setPageData(result[sectionName]?.songs.length>0?result[sectionName]?.albums.concat(result[sectionName]?.songs):result[sectionName]?.albums);
            }
        }
    }, 200)

    useEffect(() => {
        homePageDetailsData();
    }, [])

    return (
      <div className="bg-neutral-900 overflow-y-auto h-full w-full rounded-lg">
            <Header/>
            <p className='text-3xl font-bold px-6'>{pageDetails.filter((data)=>data.id === sectionName)[0].heading}</p>
            <div className='flex flex-wrap w-full  min-[300px]:justify-center min-[300px]:gap-6 justify-between lg:pl-6 pl-2 lg:my-10 my-5'>
                {
                    pageData.length===0 ? (components) : (
                        pageData?.map((data) => (
                            <IteamContainer data={data} key={sectionName}/>
                        ))
                    )
                }
            </div>
      </div>
    )
}

export default page