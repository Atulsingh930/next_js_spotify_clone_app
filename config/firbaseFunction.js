import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from "./firbase";
import { addUserData, getUserData } from "./firestoreFunction";
import toast from "react-hot-toast";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { setSignUpDetails } from "@/ReduxSlices/authenticationSlice";

export async function userSignUp (userDetails) {
    const docSanp = await getDoc(doc(db, "users", userDetails.email));
    if(docSanp.exists()){
        //console.log('it already exists')
        toast.error('User already exists');
        return null
    }
    const signUpDetails = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password)
    if(signUpDetails) {
        const result = await updateUserProfile(userDetails);
        const setUserDetails = await addUserData(userDetails, signUpDetails.user.uid);
        return setUserDetails;
    }
}

export async function loginUser (userDetails, dispatch) {
    const loginDetails = await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
    //console.log(loginDetails, 'loginDetails')
    const userData = getUserData(userDetails.email);
    dispatch(setSignUpDetails(userData));
    if(loginDetails) {
        return docSanp.data()
    }
}

export async function updateUserProfile (userDetails) {
    let result;
    if(userDetails.firstName || userDetails.lastName) {
        result = await updateProfile(auth.currentUser, {
            displayName: `${userDetails.firstName} ${userDetails.lastName}`,
        })
    }
    if(userDetails.photoUrl) {
        result = await updateProfile(auth.currentUser, {
            photoURL: userDetails.photoUrl
        })
    }
    if(userDetails.phoneNo) {
        result = await updateProfile(auth.currentUser, {
            phoneNumber: userDetails.phoneNo
        })
    }return result
}

export async function handleUpdateUserName(userName, signUpData, dispatch) {
    await updateProfile(auth.currentUser, {
        displayName: userName
    })
    const result = await updateDoc(doc(db, "users", signUpData.email), {
        first: userName.split(' ')[0],
        last: userName.split(' ')[1],
    });

    dispatch(setSignUpDetails(
        {
            ...signUpData,
            first: userName.split(' ')[0],
            last: userName.split(' ')[1],
        }
    ));
}
