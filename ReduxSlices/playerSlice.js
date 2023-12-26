import { shuffle } from "@/utils/CommonFunction";
import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    songs : [],
    currentSong : {
        "id": "kVGYhq-r",
        "name": "Tere Sang Yaara",
        "type": "",
        "album": {
            "id": "2433329",
            "name": "Rustom",
            "url": "https://www.jiosaavn.com/album/rustom/vc9lCrxDsno_"
        },
        "year": "2018",
        "releaseDate": null,
        "duration": "290",
        "label": "Zee Music Co.",
        "primaryArtists": "Atif Aslam",
        "primaryArtistsId": "459633",
        "featuredArtists": "",
        "featuredArtistsId": "",
        "explicitContent": 0,
        "playCount": "164579614",
        "language": "hindi",
        "hasLyrics": "true",
        "url": "https://www.jiosaavn.com/song/tere-sang-yaara/Gz4saBxBGkE",
        "copyright": "© 2019 Zee Music Company",
        "image": [
            {
                "quality": "50x50",
                "link": "https://c.saavncdn.com/221/Rustom-Hindi-2018-20191029174008-50x50.jpg"
            },
            {
                "quality": "150x150",
                "link": "https://c.saavncdn.com/221/Rustom-Hindi-2018-20191029174008-150x150.jpg"
            },
            {
                "quality": "500x500",
                "link": "https://c.saavncdn.com/221/Rustom-Hindi-2018-20191029174008-500x500.jpg"
            }
        ],
        "downloadUrl": [
            {
                "quality": "12kbps",
                "link": "https://aac.saavncdn.com/298/74e78bbd04353f2fb7059c4b41ec15b1_12.mp4"
            },
            {
                "quality": "48kbps",
                "link": "https://aac.saavncdn.com/298/74e78bbd04353f2fb7059c4b41ec15b1_48.mp4"
            },
            {
                "quality": "96kbps",
                "link": "https://aac.saavncdn.com/298/74e78bbd04353f2fb7059c4b41ec15b1_96.mp4"
            },
            {
                "quality": "160kbps",
                "link": "https://aac.saavncdn.com/298/74e78bbd04353f2fb7059c4b41ec15b1_160.mp4"
            },
            {
                "quality": "320kbps",
                "link": "https://aac.saavncdn.com/298/74e78bbd04353f2fb7059c4b41ec15b1_320.mp4"
            }
        ]
    },
    songIndex : 0,
    volumn : 0.3,
}

export const playerSlice = createSlice({
    name : "player",
    initialState : intialState,
    reducers : {
        addCurrentSongs : (state, action) => {
            state.currentSong = action.payload
        },
        addPlaylist : (state, action) => {
            state.songs = action.payload
            state.songIndex = 0
        },
        handleNextSong : (state) => {
            state.currentSong = state.songs[(state.songIndex + 1) % state.songs.length];
            state.songIndex = (state.songIndex + 1) % state.songs.length
        },
        handlePreviousSong : (state) => {
            state.currentSong = state.songs[(state.songIndex - 1 + state.songs.length) % state.songs.length];
        },
        handleVolumn : (state, action) => {
            state.volumn = action.payload
        },
        shufflePlaylist : (state) => {
            state.playlist = shuffle(state.playlist);
        }
    }
})

export const {addPlaylist, shufflePlaylist, addCurrentSongs, handleNextSong, handlePreviousSong, handleVolumn} = playerSlice.actions;
export default playerSlice.reducer;