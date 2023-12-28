import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firbase";
import { updateUserImage } from "./firestoreFunction";
import { dividerClasses } from "@mui/material";
import { handleChangeUserImage } from "@/services/UserIteamDetails";

export async function firebaseImageUploader(file, userID) {
    const imageRef = ref(storage, `userImages/${userID}`);
    console.log(imageRef)
    const snapshot = await uploadBytes(imageRef, file);
    console.log(snapshot)
    const downloadURL = await getDownloadURL(ref(storage, `userImages/${userID}`));
    const updatedUserData = await updateUserImage(userID, downloadURL);
    console.log(downloadURL)
    return downloadURL;
}

export async function firebaseImageRemover(userID, signUpData, dispatch) {
    const imageRef = ref(storage, `userImages/${userID}`);
    if(imageRef){
        await deleteObject(imageRef);
        updateUserImage(signUpData.email, '');
    }
    handleChangeUserImage(dispatch, '', signUpData);
}