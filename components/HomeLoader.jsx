import React from 'react'

function HomeLoader({type="all"}) {
  return (
    type === 'songs' ? (
      <tr className='w-full'>
            <td className='text-start w-[3.835rem] pl-10 py-2'></td>
            <td className='text-start w-[37rem] py-2 px-2 flex gap-4 items-center'>
                <div className='w-[50px] h-[50px] skeleton rounded-lg bg-neutral-800'/>
                <div className='w-[calc(100%-50px)] flex flex-col items-start gap-2'>
                    <p className='rounded-2xl w-[45%] h-4 skeleton font-semibold'></p>
                    <p className='rounded-2xl w-[35%] h-4 skeleton text-sm font-semibold text-neutral-400'></p>
                </div>
            </td>
            <td className='text-start text-sm w-[30.68rem] py-2 text-neutral-400 font-semibold text-ellipsis whitespace-nowrap overflow-x-hidden'>
              <p className='rounded-2xl skeleton w-[30%] h-4'></p>
            </td>
            <td className='text-start w-[3.835rem] pr-20 text-neutral-400 font-semibold'>
              <p className='rounded-2xl skeleton w-[400%] h-4'></p>
            </td>
      </tr>
    ) : (
      <div className='lg:w-[210px] w-full'>
        <div className='w-full flex flex-col gap-2 items-start bg-neutral-800/30 p-3.5 rounded-lg transition-all duration-150 cursor-pointer group-hover:bg-neutral-800'>
            <div className='relative lg:w-[188px] w-full lg:h-[200px] h-[154px]'>
                <div className={`skeleton  ${type === 'artist' ? 'rounded-full' : 'rounded-lg'} w-full h-full group-hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`} alt="" />
            </div>
            <div className='flex flex-col gap-1 items-start w-full'>
                <p className='skeleton overflow-hidden h-4 rounded-xl text-ellipsis whitespace-nowrap w-[60%] text-center'></p>
                <p className='skeleton w-[40%] h-4 rounded-xl text-sm text-neutral-600'></p>
            </div>
        </div>
    </div>
    )
  )
}

export default HomeLoader