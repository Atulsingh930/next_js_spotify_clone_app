import React from 'react'
import HomeLoader from './HomeLoader';

function CarousalLoader({type}) {

    const components1 = Array.from({ length : 5 }, (_, index) => (
          <HomeLoader type={type} key={index} />
    ));
    const components2 = Array.from({ length : 3 }, (_, index) => (
        <HomeLoader type={type} key={index} />
    ));
    const components3 = Array.from({ length : 2 }, (_, index) => (
    <HomeLoader type={type} key={index} />
    ));
    const components4 = Array.from({ length : 1 }, (_, index) => (
        <HomeLoader type={type} key={index} />
    ));

  return (
    <>
        <div className='w-full hidden xl:grid grid-rows-1 grid-cols-5 gap-4'>{components1}</div>
        <div className='w-full hidden xl:hidden lg:grid grid-rows-1 grid-cols-3 gap-4'>{components2}</div>
        <div className='w-full hidden xl:hidden lg:hidden sm:hidden md:grid grid-rows-1 grid-cols-2 gap-4'>{components3}</div>
        <div className='w-full hidden max-sm:grid grid-rows-1 grid-cols-2 gap-4'>{components3}</div>
    </>
  )
}

export default CarousalLoader