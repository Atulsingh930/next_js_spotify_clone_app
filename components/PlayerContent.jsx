"use client"
import React, { useMemo, useState } from 'react'
import Player from './Player'
import { useDispatch, useSelector } from 'react-redux'
import { shufflePlaylist } from '@/ReduxSlices/playerSlice';

function PlayerContent() {

    const dispatch = useDispatch();
    const {songs, currentSong} = useSelector((state)=>state?.player);
    const[song, setSong] = useState([]);
    useMemo(() => setSong(currentSong), [currentSong]);
    //console.log(songs)

    function handleShuffle () {
        dispatch(shufflePlaylist())
    }
    //console.log(songs?songs[0]:'', 'songs')

  return (
    <div className='w-full'>
        <Player song={song ? song : null} key={song?.id} shuffle={handleShuffle}/>
    </div>
  )
}

export default PlayerContent