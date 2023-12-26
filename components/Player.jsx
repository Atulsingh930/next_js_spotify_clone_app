"use client"

import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactHowler from 'react-howler';
import { secondToTime } from '@/utils/CommonFunction';
import Slider from '@mui/material/Slider';
import { useInterval } from '@mantine/hooks';
import { FaPlay, FaPause, FaShuffle } from "react-icons/fa6";
import { IoIosSkipForward, IoIosSkipBackward } from "react-icons/io";
import { RiRepeat2Fill } from "react-icons/ri";
import { HiOutlineQueueList } from "react-icons/hi2";
import { SlVolume1, SlVolumeOff } from "react-icons/sl";
import { useDispatch, useSelector } from 'react-redux';
import { handleNextSong, handlePreviousSong, handleVolumn } from '@/ReduxSlices/playerSlice';
import { IoPlaySharp } from "react-icons/io5";
import { RiPauseLine } from "react-icons/ri";

function Player({song, shuffle}) {

    const playerRef = useRef(null);
    const { currentSong } = useSelector((state)=>state.player);
    const [startPlay, setStartPlay] = useState(currentSong?.id!="kVGYhq-r");
    const [mouseOver, setMouseOver] = useState(false);
    const [volMouseOver, setVolMouseOver] = useState(false);
    const [mute, setMute] = useState(false)
    const [prevVolumn, setPrevVolumn] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const interval = useInterval(() => setSeconds((s) => s + 1), 1000);
    const dispatch = useDispatch();
    const {volumn, songs} = useSelector((state)=>state.player);

    useMemo(() => {
        setPrevVolumn(volumn);
        if (mute) {
            if (prevVolumn < volumn) {
                setPrevVolumn(0);
                setMute(false);
            }
        }
    }, [mute, volumn])
    
    const handlePlay = () => {
        if (startPlay) {
            setStartPlay(false);
            interval.stop();
        } else {
            setStartPlay(true);
            interval.start();
        }
    }
    const handleRepeat = ()=>{
        //console.log('seek')
        playerRef?.current?.seek(0)
        setSeconds(0)
    }
    function handleSeek (){
        playerRef?.current?.seek(seconds)
    }

    function handleVolumnChange (e) {
        dispatch(handleVolumn(e.target.value))
    }

    function handleEndSong () {
        if(songs.length > 0) {
            dispatch(handleNextSong());
            setStartPlay(true);
            setSeconds(0);
            interval.start();
        }
        else {
            setStartPlay(false);
            setSeconds(0);
            interval.stop();
        }
    }

    function changeSongToNext () {
        if (songs.length > 0) {
            dispatch(handleNextSong());
            setStartPlay(true);
            setSeconds(0);
            interval.start();
        }
    }

    function changeSongToPrevious () {
        if(songs.length > 0){
            dispatch(handlePreviousSong());
            setStartPlay(true);
            setSeconds(0);
            interval.start();
        }
    }
    // //console.log(currentSong)

  return (
    <div className='w-full p-2 px-4 flex justify-between items-center max-sm:bg-[#404858] rounded-t-lg'>
        <div className='w-full sm:w-1/3 flex items-center gap-4'>
            <Image className='rounded-sm contrast-125' src={currentSong?.image[0].link} width={55} height={55} alt=''/>
            <div className='flex flex-col leading-4 items-start max-sm:w-[60%]'>
                <p className='text-[0.85rem] w-full text-ellipsis whitespace-nowrap overflow-hidden font-medium tracking-tight'>{currentSong?.name}</p>
                <p className='text-[0.7rem] w-full text-ellipsis whitespace-nowrap overflow-hidden tracking-tight font-medium text-neutral-400'>{currentSong?.primaryArtists}</p>
            </div>
        </div>
        <div className='w-1/3 hidden sm:flex items-center flex-col'>
            <div className='flex items-center gap-6 class text-neutral-400'>
                {song && <ReactHowler src={currentSong?.downloadUrl[2].link} mute={mute} playing={startPlay} onPlay={() => interval.start()} onEnd={handleEndSong} volume={volumn} ref={playerRef}/>}
                <FaShuffle onClick={shuffle} className='hover:text-white cursor-pointer' size={20}/>
                <button onClick={changeSongToPrevious} disabled={!(songs.length > 0)}>
                    <IoIosSkipBackward className='hover:text-white' size={23}/>
                </button>
                <button onClick={handlePlay} className='w-8 h-8 rounded-full flex items-center justify-center bg-white text-black'>
                    {startPlay ? <FaPause  size={18} className='' /> : <FaPlay size={18} className=''/>}
                </button>
                <button onClick={changeSongToNext} disabled={!(songs.length > 0)}>
                    <IoIosSkipForward className='hover:text-white' size={23}/>
                </button>
                <RiRepeat2Fill onClick={handleRepeat} size={20} className='rotate-180 rounded-lg hover:text-white cursor-pointer '/>
            </div>
            <div className='flex items-center gap-4 w-full'>
                <p className='text-[0.7rem] text-neutral-400 font-medium'>{`${seconds<=59 ? '0:' : ''}${secondToTime(seconds)}`}</p>
                <Slider onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)} value={seconds} onChange={(e)=>setSeconds(e.target.value)} onChangeCommitted={handleSeek} aria-label="Default" max={Number(currentSong?.duration)} sx={{
                    height: '3px',
                    '& .MuiSlider-thumb': {
                        display: `${mouseOver ? 'block' : 'none'}`,
                        width: '11px',
                        height: '11px',
                        color: 'white',
                        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                            boxShadow: 'inherit',
                        },
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: `${mouseOver ? '#1dd460' : 'white'}`,
                        border : 'none'
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor : '#4d4d4d'
                    }
                }}/>
                <p className='text-[0.7rem] text-neutral-400 font-medium'>{secondToTime(currentSong?.duration)}</p>
            </div>
        </div>
        <div className='w-1/3 hidden sm:flex items-center gap-4 justify-end mr-2'>
            <HiOutlineQueueList/>
            <div className='flex items-center gap-4 w-1/4'>
                {mute ? <SlVolumeOff onClick={()=>setMute(false)} size={23} fontWeight={900} className='hover:text-white cursor-pointer text-neutral-400'/> :<SlVolume1 onClick={()=>setMute(true)} size={23} fontWeight={900} className='hover:text-white cursor-pointer text-neutral-400' />}
                <Slider onMouseOver={() => setVolMouseOver(true)} onMouseOut={() => setVolMouseOver(false)} value={mute ? 0 : volumn} onChange={handleVolumnChange} aria-label="Default" max={1} step={0.01} sx={{
                    height: '3px',
                    width: '100%',
                    '& .MuiSlider-thumb': {
                        display: `${volMouseOver ? 'block' : 'none'}`,
                        width: '11px',
                        height: '11px',
                        color: 'white',
                        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                            boxShadow: 'inherit',
                        },
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: `${volMouseOver ? '#1dd460' : 'white'}`,
                        border : 'none'
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor : '#4d4d4d'
                    }
                }}/>
            </div>
        </div>
        <div className='visible sm:hidden'>
            <button onClick={handlePlay}>
                {startPlay ? <RiPauseLine  size={24} className='' /> : <IoPlaySharp size={24} className=''/>}
            </button>
        </div>
    </div>
  )
}

export default Player