import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { HiPlay } from 'react-icons/hi2'

function SearchIteams({data, key}) {

    let primaryArtists;
    if(data?.type!=="") {
        primaryArtists=  data?.primaryArtists?.map((art)=>{
            return art?.name
        });
        primaryArtists =primaryArtists?.join(',')
    }else{
        primaryArtists = data?.primaryArtists
    }


    let image = data?.image[2]?.link;
    if(image.split('/')[2]==='admin.aws.sg.saavn.com'){
        image = "https://www.jiosaavn.com/_i/3.0/artist-default-music.png"
    }

  return (
    <Link href={`${data?.type ? data?.type : 'playlist'}/${data?.id}`}>
        <div className='lg:w-[210px] max-sm:w-[168px]  group searhconatiner'>
            <div key={key} className='w-full flex flex-col gap-4 items-center bg-neutral-800/30 p-3.5 rounded-lg transition-all duration-150 cursor-pointer group-hover:bg-neutral-800'>
                <div className='relative lg:w-[178px] w-full lg:h-[190px] h-[144px]'>
                    <Image loading='lazy' width={188} height={200} src={image} className='rounded-lg w-full h-full group-hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]' alt="" />
                    <button style={{backgroundColor : `${data}`}} className="transition opacity-0 absolute bottom-2 right-0 mr-4 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md translate-y-1/4 translate group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
                        <HiPlay size={26} className="text-black" />
                    </button>
                </div>
                <div className='flex flex-col items-start w-full'>
                    <p className='overflow-hidden text-base text-ellipsis font-semibold whitespace-nowrap w-full' dangerouslySetInnerHTML={{__html : data?.name}}></p>
                    <p className='text-sm capitalize text-neutral-400 font-medium text-ellipsis whitespace-nowrap overflow-hidden w-full' dangerouslySetInnerHTML={{__html : primaryArtists ? `${data?.year} &#8226; ${primaryArtists}` : data?.language}}></p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default SearchIteams