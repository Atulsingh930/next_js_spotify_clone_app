const { setSignUpDetails } = require("@/ReduxSlices/authenticationSlice");
const { setLikedSongs, setLikedPlayLists, setArtistFollow, setLikedAlbums } = require("@/ReduxSlices/userIteamSlice");
const { addLikedSongs, removeLikedSongs, getUserData, addLikedPlaylist, removeLikedPlaylist, addArtistFollow, removeArtistFollow, addLikedAlbums, removeLikedAlbums } = require("@/config/firestoreFunction");

export async function handleAddLikedSong(song, signUpData, likedSongs, dispatch) {
    //console.log(song, signUpData)
    try {
        if (!signUpData || !song) {
            return null; // Or a loading state if desired
        }

        if (signUpData && song) {
            dispatch(setLikedSongs([...likedSongs, song.id]));
            await addLikedSongs(signUpData.email, song.id);
            const result = await getUserData(signUpData.email);
            if (result) {
                //console.log(result);
                dispatch(setSignUpDetails(result));
            }
        }
    } catch (error) {
        //console.error(error);
    }
}

export async function handleRemoveLikedSong(song, signUpData, likedSongs, dispatch) {
    try {
        if (!signUpData || !song) {
            return null; // Or a loading state if desired
        }

        if(signUpData && song) {
            dispatch(setLikedSongs(likedSongs.filter((id) => id !== song.id)));
            await removeLikedSongs(signUpData.email, song.id);
            const result = await getUserData(signUpData.email);
            if (result) {
                //console.log(result);
                dispatch(setSignUpDetails(result));
            }
        }
    } catch (error) {
        //console.error(error);
    }
}

// ******************************LikedSongs Function**********************************

export async function handleAddLikedPlaylist(playlist, signUpData, likedPlaylists, dispatch) {
    //console.log(playlist, signUpData, likedPlaylists)
    try {
        if (!signUpData || !playlist) {
            return null; // Or a loading state if desired
        }

        if (signUpData && playlist) {
            dispatch(setLikedPlayLists([...likedPlaylists, {
                id : playlist.id,
                name : playlist.name,
                image : playlist.image[2].link
            }]));
            await addLikedPlaylist(signUpData.email, playlist);
            const result = await getUserData(signUpData.email);
            if (result) {
                //console.log(result);
                dispatch(setSignUpDetails(result));
            }
        }
    } catch (error) {
        //console.error(error);
    }
}

export async function handleRemoveLikedPlaylist(playlist, signUpData, likedPlaylists, dispatch) {
    try {
        if (!signUpData || !playlist) {
            return null; // Or a loading state if desired
        }

        if(signUpData && playlist) {
            dispatch(setLikedPlayLists(likedPlaylists.filter((iteam) => iteam.id !== playlist.id)));
            await removeLikedPlaylist(signUpData.email, playlist);
            const result = await getUserData(signUpData.email);
            if (result) {
                //console.log(result);
                dispatch(setSignUpDetails(result));
            }
        }
    } catch (error) {
        //console.error(error);
    }
}

// ******************************LikedPlaylist Function**********************************//

export async function handleAddArtistFollow(artist, signUpData, artistFollow, dispatch) {
    try {
        if (!signUpData || !artist) {
            return null; // Or a loading state if desired
        }

        if (signUpData && artist) {
            dispatch(setArtistFollow([...artistFollow, {
                id : artist.id,
                name : artist.name,
                image : artist.image[2].link
            }]));
            await addArtistFollow(signUpData.email, artist);
            const result = await getUserData(signUpData.email);
            if (result) {
                //console.log(result);
                dispatch(setSignUpDetails(result));
            }
        }
    } catch (error) {
        //console.error(error);
    }
}

export async function handleRemoveArtistFollow(artist, signUpData, artistFollow, dispatch) {
    try {
        if (!signUpData || !artist) {
            return null; // Or a loading state if desired
        }

        if(signUpData && artist) {
            dispatch(setArtistFollow(artistFollow.filter((iteam) => iteam.id !== artist.id)));
            await removeArtistFollow(signUpData.email, artist);
            const result = await getUserData(signUpData.email);
            if (result) {
                //console.log(result);
                dispatch(setSignUpDetails(result));
            }
        }
    } catch (error) {
        //console.error(error);
    }
}

// ******************************ArtistFollow Function**********************************//

export async function handleAddLikedAlbums(albums, signUpData, likedAlbums, dispatch) {
    try {
        if (!signUpData || !albums) {
            return null; // Or a loading state if desired
        }

        if (signUpData && albums) {
            dispatch(setLikedAlbums([...likedAlbums, {
                id : albums.id,
                name : albums.name,
                image : albums.image[2].link,
                artist : albums.primaryArtists
            }]));
            await addLikedAlbums(signUpData.email, albums);
            const result = await getUserData(signUpData.email);
            if (result) {
                //console.log(result);
                dispatch(setSignUpDetails(result));
            }
        }
    } catch (error) {
        //console.error(error);
    }
}

export async function handleRemoveLikedAlbums(albums, signUpData, likedAlbums, dispatch) {
    try {
        if (!signUpData || !albums) {
            return null; // Or a loading state if desired
        }

        if(signUpData && albums) {
            dispatch(setLikedAlbums(likedAlbums.filter((iteam) => iteam.id !== albums.id)));
            await removeLikedAlbums(signUpData.email, albums);
            const result = await getUserData(signUpData.email);
            if (result) {
                //console.log(result);
                dispatch(setSignUpDetails(result));
            }
        }
    } catch (error) {
        //console.error(error);
    }
}

// ******************************LikedAlbums Function**********************************//

export async function handleSignOut(dispatch) {
    try {
        await signOut(auth);
        dispatch(setSignUpDetails(null));
        dispatch(setLikedAlbums([]));
        dispatch(setLikedPlayLists([]));
        dispatch(setLikedSongs([]));
        dispatch(setArtistFollow([]));
        dispatch(setLoginStatus(false));
    } catch (error) {
        //console.error(error);
    }
}

export async function handleChangeUserImage(dispatch, image, signUpData) {
    try {
        dispatch(setSignUpDetails(
            {
                ...signUpData,
                profileUrl : image
            }
        ));
    } catch (error) {
        console.error(error);
    }
}