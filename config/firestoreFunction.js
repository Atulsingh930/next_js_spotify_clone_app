"use client"


import { arrayRemove, arrayUnion, collection, doc, getDoc, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "./firbase";
import toast from "react-hot-toast";

export async function addUserData (data, userID) {
    //console.log(data, userID)
    try {
        const docRef = await setDoc(doc(db, "users", data.email), {
            uuid : userID,
            first: data.firstName,
            last: data.lastName,
            DOB : "",
            email : data.email,
            phoneNo  : "",
            profileUrl : "",
            likedSongs : [],
            likedPlaylists : [],
            artistFollow : [],
            likedAlbums : [],
        }, {merge : true});
        //console.log("Document written with ID: ", docRef.id);
        return docRef
      } catch (e) {
        //console.error("Error adding document: ", e);
        return null
      }
}

export async function addUserDataInFirestore(user){ 
    //console.log(user.userID)
    try {
        const docRef = await setDoc(doc(db, "users", user.userID), {
          first: user.displayName.split(' ')[0],
          last: user.displayName.split(' ')[1],
          age: '',
          email : user.email,
          gender : '',
        });
        //console.log("Document written with ID: ", docRef.id);
        return docRef;
      } catch (e) {
        //console.error("Error adding document: ", e);
        return null
      }
}

export async function getUserData (userID) {
    try {
        const docRef = await getDoc(doc(db, "users", userID));
        if (docRef.exists()) {
          //console.log("Document data:", docRef.data());
          return docRef.data()
        } else {
          // doc.data() will be undefined in this case
          //console.log("No such document!");
          return null
        }
      } catch (e) {
        //console.error("Error adding document: ", e);
        return null
      }
}

export async function addLikedSongs(userID, songID) {
    try {
        //console.log(userID, songID);
        await updateDoc(doc(db, "users", userID), {
            likedSongs: arrayUnion(songID),
        });
    } catch (error) {
        //console.error(error);
    }
}

export async function removeLikedSongs(userID, songID) {
    try {
        //console.log(userID, songID);
        await updateDoc(doc(db, "users", userID), {
            likedSongs: arrayRemove(songID),
        });
    } catch (error) {
        //console.error(error);
        return null;
    }
}

export async function addLikedPlaylist(userID, playlist) {
  try {
      //console.log(userID, playlist);
      await updateDoc(doc(db, "users", userID), {
          likedPlaylists: arrayUnion(
            {
                id : playlist.id,
                name : playlist.name,
                image : playlist.image[2].link
            }
          ),
      });
  } catch (error) {
      //console.error(error);
  }
}

export async function removeLikedPlaylist(userID, playlist) {
  try {
      //console.log(userID, playlist);
      await updateDoc(doc(db, "users", userID), {
          likedPlaylists: arrayRemove(
            {
              id : playlist.id,
              name : playlist.name,
              image : playlist.image[2].link
            }
          ),
      });
  } catch (error) {
      //console.error(error);
      return null;
  }
}


export async function addArtistFollow(userID, artist) {
  try {
      //console.log(userID, artist);
      await updateDoc(doc(db, "users", userID), {
        artistFollow: arrayUnion(
            {
                id : artist.id,
                name : artist.name,
                image : artist.image[2].link
            }
          ),
      });
  } catch (error) {
      //console.error(error);
  }
}

export async function removeArtistFollow(userID, artist) {
  try {
      //console.log(userID, artist);
      await updateDoc(doc(db, "users", userID), {
        artistFollow: arrayRemove(
            {
              id : artist.id,
              name : artist.name,
              image : artist.image[2].link
            }
          ),
      });
  } catch (error) {
      //console.error(error);
      return null;
  }
}


export async function addLikedAlbums(userID, albums) {
  try {
      //console.log(userID, albums);
      await updateDoc(doc(db, "users", userID), {
        likedAlbums: arrayUnion(
            {
                id : albums.id,
                name : albums.name,
                image : albums.image[2].link,
                artist : albums.primaryArtists
            }
          ),
      });
  } catch (error) {
      //console.error(error);
  }
}

export async function removeLikedAlbums(userID, albums) {
  try {
      //console.log(userID, albums);
      await updateDoc(doc(db, "users", userID), {
        likedAlbums: arrayRemove(
            {
              id : albums.id,
              name : albums.name,
              image : albums.image[2].link,
              artist : albums.primaryArtists
            }
          ),
      });
  } catch (error) {
      //console.error(error);
      return null;
  }
}
