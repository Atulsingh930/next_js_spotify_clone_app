
import React from 'react'
import { getPlaylistDetails } from '@/services/HomeDetails'
import PlaylistDetailsClient from './component/PlaylistDetailsClient'

async function PlaylistDetails({params}) {
    
    //console.log(params.playlistID, 'artistID')
    try {
        const playlistData = await getPlaylistDetails(params.playlistID);
        if(playlistData) {
            // //console.log(playlistData, 'result')
            return <PlaylistDetailsClient playlistData={playlistData}/>;
        }
    } catch (error) {
        //console.error(error);
    }
}

export default PlaylistDetails