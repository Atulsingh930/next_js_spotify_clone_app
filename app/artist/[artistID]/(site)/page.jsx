import { getArtistDetail } from '@/services/HomeDetails';
import React from 'react'
import ArtistDetailsClient from './component/ArtistDetailsClient';

async function ArtistDetails({params}) {
    //console.log(params.artistID, 'artistID')
    try {
        const artistDetails = await getArtistDetail(params.artistID);
        if(artistDetails) {
            // //console.log(artistDetails.artistAlbums, 'result')
            return <ArtistDetailsClient artistDetails={artistDetails}/>;
        }
    } catch (error) {
        //console.error(error);
    }
}

export default ArtistDetails