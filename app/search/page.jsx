import Header from '@/components/Header'
import SearchCarousal from '@/components/SearchCarousal'
import { getSearchHomeDetails } from '@/services/HomeDetails'
import throttle from 'lodash.throttle'
import React from 'react'

async function page({searchParams}) {
  //console.log(searchParams.title, 'searchParams')
  const result = await getSearchHomeDetails(searchParams.title)
  // //console.log(result, 'result')
  return (
    <div className='bg-neutral-900 overflow-y-auto h-full w-full rounded-lg'>
        <Header className={'sticky top-0 bg-neutral-900 z-10'}/>
        <SearchCarousal homeSearchPageData={result}/>
    </div>
  )
}

export default page