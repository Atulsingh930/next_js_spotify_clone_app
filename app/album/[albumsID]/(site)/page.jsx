import React from 'react'
import { getAlbumsDetails } from '@/services/HomeDetails'
import AlbumsDetailsClient from './component/AlbumsDetailsClient';

async function AlbumsDetails({params}) {

    //console.log(params.albumsID, 'artistID')
    try {
        const playlistData = await getAlbumsDetails(params.albumsID);
        if(playlistData) {
            // //console.log(playlistData, 'result')
            return <AlbumsDetailsClient playlistData={playlistData}/>;
        }
    } catch (error) {
        //console.error(error);
    }
}

export default AlbumsDetails