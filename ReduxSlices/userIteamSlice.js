import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    likedSongs : [],
    likedPlaylists : [],
    artistFollow : [],
    likedAlbums : [],
    createPlayList : [],
}

const userIteamSlice = createSlice({
    name : "userIteam",
    initialState : intialState,
    reducers : {
        setLikedSongs : (state, action)=>{
            state.likedSongs = action.payload
        },
        setLikedPlayLists : (state, action)=>{
            state.likedPlaylists = action.payload
        },
        setArtistFollow : (state, action)=>{
            state.artistFollow = action.payload
        },
        setLikedAlbums : (state, action)=>{
            state.likedAlbums = action.payload
        }
    }
})

export const {setLikedSongs, setLikedPlayLists, setArtistFollow, setLikedAlbums} = userIteamSlice.actions
export default userIteamSlice.reducer