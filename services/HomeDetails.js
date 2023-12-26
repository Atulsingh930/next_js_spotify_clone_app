"use server"

import { artistAppearFind } from "@/utils/CommonFunction";
import throttle from "lodash.throttle";
export async function getHomePageDetails(){
    let result;
    try{
        // result = await axios({
        //     method: "get",
        //     url: "https://saavn.me/modules?language=hindi,english",})
        result = await fetch("https://saavn.me/modules?language=hindi,english", {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        result = await result.json();
        if(!result.status==="SUCCESS"){
            throw new Error(result.message);
        }
        //console.log('getHomePageDetailsFunction')
    }catch(error){
        //console.log(error.message)
    }
    return result?.data
}

export async function getSearchArtist(query, page){
    let result;
    try{
        if(query==="") return
        result = await fetch(`https://saavn.me/search/artists?query=${query}&page=${page}`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        result = await result.json();
        if(!result.status==="SUCCESS"){
            throw new Error(result.message);
        }
        // //console.log(result)
    }catch(error){
        //console.log(error.message);
    }return result?.data
}

export async function getSearchPlaylists(query, page){
    let result;
    try{
        result = await fetch(`https://saavn.me/search/playlists?query=${query}&page=${page}&limit=10`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        result = await result.json();
        if(!result.status==="SUCCESS"){
            throw new Error(result.message);
        }
        // //console.log(result?.data)
    }catch(error){
        //console.log(error.message);
    }return result?.data
}

export async function getSearchAlbums(query, page){
    let result;
    try{
        if(query==="") return
        result = await fetch(`https://saavn.me/search/albums?query=${query}&page=${page}&limit=10`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        result = await result.json();
        if(!result.status==="SUCCESS"){
            throw new Error(result.message);
        }
        // //console.log(result?.data)
    }catch(error){
        //console.log(error.message);
    }return result?.data
}

export async function getSearchSongs(query, page){
    let result;
    try{
        if(query==="") return
        result = await fetch(`https://saavn.me/search/songs?query=${query}&page=${page}&limit=10`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        result = await result.json();
        if(!result.status==="SUCCESS"){
            throw new Error(result.message);
        }
        // //console.log(result?.data)
    }catch(error){
        //console.log(error.message);
    }return result?.data
}

export async function getSearchAll(query){
    let result;
    try{
        if(query==="") return
        result = await fetch(`https://saavn.me/search/all?query=${query}`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        result = await result.json();
        if(!result.status==="SUCCESS"){
            throw new Error(result.message);
        }
        // //console.log(result?.data)
    }catch(error){
        //console.log(error.message);
    }return result?.data
}

export async function getPlaylistDetails(playlistId){
    let result;
    try{
        if(playlistId==="") return
        result = await fetch(`https://saavn.me/playlists?id=${playlistId}`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        result = await result.json();
        if(!result.status==="SUCCESS"){
            throw new Error(result.message);
        }
        //console.log(1)
    }catch(error){
        //console.log(error.message);
    }return result?.data
}

export async function getSongDetails(songID){
    let result;
    //console.log(songID)
    try{
        if(songID==="") return
        result = await fetch(`https://saavn.me/songs?id=${songID}`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        result = await result.json();
        //console.log(`https://saavn.me/playlists?id=${songID}`)
        if(!result.status==="SUCCESS"){
            throw new Error(result.message);
        }
        //console.log(1)
    }catch(error){
        //console.log(error.message);
    }return result?.data
}

export async function getAlbumsDetails(albumsID){
    let result;
    try{
        if(albumsID==="") return
        result = await fetch(`https://saavn.me/albums?id=${albumsID}`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        result = await result.json();
        if(!result.status==="SUCCESS"){
            throw new Error(result.message);
        }
        // //console.log(result?.data)
    }catch(error){
        //console.log(error.message)
    }return result?.data
}

export async function getArtistRecommendedSongs(artistID, songID){
    let result;
    try{
        if(artistID==="") return
        result = await fetch(`https://saavn.me/artists/${artistID}/recommendations/${songID}`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        result = await result.json();
        if(!result.status==="SUCCESS"){
            throw new Error(result.message);
        }
        // //console.log(result?.data)
    }catch(error){
        //console.log(error.message)
    }return result?.data
}

export async function getArtistDetail(artistID) {
    let result = {
        artistData : null,  
        artistLatestSongs : [],
        artistLatestAlbums : [],
        artistAlbums : [],
        artistSongs : [],
        artisAppearList : [],
    };
    let tempAns;
    let tempAppearList;
    try{
        if(!artistID) return
        tempAns = await fetch(`https://saavn.me/artists?id=${artistID}`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        tempAns = await tempAns.json();
        if(!tempAns.status === "SUCCESS"){
            throw new Error(tempAns.message);
        }
        result.artistData = tempAns?.data
        // tempAns = await fetch(`https://saavn.me/artists/${artistID}/songs?page=1&category=latest`, {
        //     method: "get",
        //     next: {
        //         revalidate: 3600
        //     }
        // })
        // tempAns = await tempAns.json();
        tempAns = await fetch(`https://saavn.me/artists/${artistID}/songs?page=1&category=latest`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        tempAns = await tempAns.json();

        if(!tempAns.status === "SUCCESS"){
            throw new Error(tempAns.message);
        }
        result.artistLatestSongs = tempAns?.data?.results
        result.artisAppearList = [...result.artisAppearList, ...artistAppearFind(artistID, result.artistLatestSongs)]
        
        tempAns = await fetch(`https://saavn.me/artists/${artistID}/songs?page=1&sort=asc`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        tempAns = await tempAns.json();
        if(!tempAns.status === "SUCCESS"){
            throw new Error(tempAns.message);
        }
        result.artistSongs = tempAns?.data?.results
        result.artisAppearList = [...result.artisAppearList,  ...artistAppearFind(artistID, tempAns?.data?.results)]

        tempAns = await fetch(`https://saavn.me/artists/${artistID}/albums?page=1&category=latest`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        tempAns = await tempAns.json();

        if(!tempAns.status === "SUCCESS"){
            throw new Error(tempAns.message);
        }
        result.artistLatestAlbums = tempAns?.data?.results
        result.artisAppearList = [...result.artisAppearList,  ...artistAppearFind(artistID, tempAns?.data?.results)]

        tempAns = await fetch(`https://saavn.me/artists/${artistID}/albums?page=1&sort=asc`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        tempAns = await tempAns.json();

        if(!tempAns.status === "SUCCESS"){
            throw new Error(tempAns.message);
        }
        result.artistAlbums = tempAns?.data?.results
        result.artisAppearList = [...result.artisAppearList, ...artistAppearFind(artistID, tempAns?.data?.results)]

    }catch(error){
        //console.log(error.message, 'getArtistDetail');
    }return result
}

export const getSearchHomeDetails = throttle(async (query)=>{
    let result = {
        searchAllData : null,  
        searchSongsData : [],
        searchAlbumsData : [],
        searchPlaylistData : [],
        searchArtistData : [],
    };
    let tempAns;
    try{
        if(!query) return
        tempAns = await fetch(`https://saavn.me/search/all?query=${query}`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        tempAns = await tempAns.json();
        if(!tempAns.status === "SUCCESS"){
            throw new Error(tempAns.message);
        }
        result.searchAllData = tempAns?.data
        tempAns = await fetch(`https://saavn.me/search/artists?query=${query}&page=1`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        tempAns = await tempAns.json();

        if(!tempAns.status === "SUCCESS"){
            throw new Error(tempAns.message);
        }
        result.searchArtistData = tempAns?.data?.results

        tempAns = await fetch(`https://saavn.me/search/playlists?query=${query}&page=1&limit=10`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        tempAns = await tempAns.json();
        if(!tempAns.status === "SUCCESS"){
            throw new Error(tempAns.message);
        }
        result.searchPlaylistData = tempAns?.data?.results

        tempAns = await fetch(`https://saavn.me/search/albums?query=${query}&page=1&limit=10`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        tempAns = await tempAns.json();

        if(!tempAns.status === "SUCCESS"){
            throw new Error(tempAns.message);
        }
        result.searchAlbumsData = tempAns?.data?.results

        tempAns = await fetch(`https://saavn.me/search/songs?query=${query}&page=1&limit=10`, {
            method: "get",
            next: {
                revalidate: 3600
            }
        })
        tempAns = await tempAns.json();

        if(!tempAns.status === "SUCCESS"){
            throw new Error(tempAns.message);
        }
        result.searchSongsData = tempAns?.data?.results
    }catch(error){
        //console.log(error.message);
    }return result
}, 200)