"use client"
import { setSignup, setLogin, setReset } from '@/ReduxSlices/authSlice';
import { useEffect, useState } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '@/config/firbase';
import { setSignUpDetails, setLoginStatus } from '@/ReduxSlices/authenticationSlice';
import Loading from '@/app/loading';
import { loginUser, userSignUp } from '@/config/firbaseFunction';
import toast from 'react-hot-toast';
import { getUserData } from '@/config/firestoreFunction';
import { setArtistFollow, setLikedAlbums, setLikedPlayLists, setLikedSongs } from '@/ReduxSlices/userIteamSlice';
function LoginModal({children}) {

    const [userSignup, setUserSignup] = useState({
        email : '',
        password : '',
        firstName : '',
        lastName : '',
    });
    const dispatch = useDispatch();
    const {login, signup} = useSelector((state)=>state.auth);
    const { loginStatus, signUpDetails} = useSelector((state)=>state.authenticationSlice);
    const[pageLoading, setPageloading] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault();
        //console.log(login)
        //console.log(userSignup, 'userSignup')
        if(signup) {
            await handleCreateUser();
        }
        if(login) {
            await handleLoginUser();
        }
    }

    function handleLogin(){
        setUserSignup({
            email : '',
            password : '',
            firstName : '',
            lastName : '',
        })
        dispatch(setLogin())
    }
    
    function handleSignUp(){
        setUserSignup({
            email : '',
            password : '',
            firstName : '',
            lastName : '',
        })
        dispatch(setSignup())
    }

    async function handleCreateUser(){
        try{
            const signUpDetails = await userSignUp(userSignup);
            if(signUpDetails) {
                dispatch(setSignUpDetails(signUpDetails.auth))
                dispatch(setLoginStatus(true))
                //console.log(signUpDetails)
            }
            //console.log(signUpDetails)
        }catch(error){
            //console.log(error)
        }
    }

    async function handleLoginUser() {
        try {
            const loginDetails = await loginUser(userSignup, dispatch);
            if(loginDetails) {
                //console.log(loginDetails)
                setUserSignup({
                    email : '',
                    password : '',
                    firstName : '',
                    lastName : '',
                })
                dispatch(setLoginStatus(true))
                dispatch(setSignUpDetails(loginDetails.user))
            }
            //console.log(loginDetails)
            return
        }catch(error) {
            //console.log(error.message)
            if (error.message==="Firebase: Error (auth/invalid-credential).") {
                toast.error('Invalid Email or Password')
            }
            return
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            if(user) {
                //console.log('first')
                const data = await getUserData(auth.currentUser.email);
                dispatch(setSignUpDetails(data))
                dispatch(setLikedSongs(data?.likedSongs))
                dispatch(setLikedPlayLists(data?.likedPlaylists))
                dispatch(setArtistFollow(data?.artistFollow))
                dispatch(setLikedAlbums(data?.likedAlbums))
                dispatch(setLoginStatus(true))
            }
        })
        setPageloading(true);
    }, [signUpDetails])
    
    //console.log(signUpDetails, 'auth.currentUser')
  return (
    !pageLoading ? (<Loading/>) : (
        <>
            {loginStatus ? children :
            (<form onSubmit={handleSubmit} className={``}>
                <div className={`md:w-11/12 md:max-w-[450px] w-full max-h-full  h-full  md:h-auto  md:max-h-[92vh] rounded-lg border border-neutral-700 bg-neutral-800 px-6 py-8 z-50 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 flex flex-col items-center justify-center gap-6`}>
                    <div className=' w-full flex flex-col items-center gap-5 border-b pb-7 border-neutral-700'>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <p className="text-3xl font-bold -tracking-tight">Welcome back</p>
                            <p className="text-sm font-light -tracking-tight">Login to Your Account</p>
                        </div>
                        <button className='flex justify-center items-center gap-2 py-3 rounded-lg border border-neutral-700 bg-neutral-700/30 w-full hover:bg-neutral-700/70'>
                            <FcGoogle className='text-lg'/>
                            <p className='text-sm font-medium'>Sign in With Google</p>
                        </button>
                    </div>
                    <div className='flex flex-col items-start w-full gap-3'>
                        {
                            !login && (
                                <div className='w-full flex items-center justify-center gap-4'>
                                    <label className='w-full flex flex-col gap-1'>
                                        <p className='text-neutral-500'>First Name</p>
                                        <input onChange={(event)=>setUserSignup({...userSignup, firstName : event.target.value})} value={userSignup.firstName} className='bg-neutral-900 border border-neutral-700 w-full px-3 py-2 focus:border-neutral-500 hover:border-neutral-400 outline-none' type="text" placeholder='Your First Name'/>
                                    </label>
                                    <label className='w-full flex flex-col gap-1'>
                                        <p className='text-neutral-500'>Last Name</p>
                                        <input onChange={(event)=>setUserSignup({...userSignup, lastName : event.target.value})} value={userSignup.lastName} className='bg-neutral-900 border border-neutral-700 w-full px-3 py-2 focus:border-neutral-500 hover:border-neutral-400 outline-none' type="text" placeholder='Your Last Name'/>
                                    </label>
                                </div>
                            )
                        }
                        <label className='w-full flex flex-col gap-1'>
                            <p className='text-neutral-500'>Email address</p>
                            <input defaultValue={userSignup.email} onChange={(event)=>setUserSignup({...userSignup, email : event.target.value})} className='bg-neutral-900 border border-neutral-700 w-full px-3 py-2 focus:border-neutral-500 hover:border-neutral-400 outline-none' type="text" placeholder='Your Email Address'/>
                        </label>
                        <label className='w-full flex flex-col gap-1'>
                            <p className='text-neutral-500'>Your Password</p>
                            <input defaultValue={userSignup.password} onChange={(event)=>setUserSignup({...userSignup, password : event.target.value})} className='bg-neutral-900 border border-neutral-700 w-full px-3 py-2 focus:border-neutral-500 hover:border-neutral-400 outline-none' type="password" placeholder='Your Password'/>
                        </label>
                    </div>
                    <button type='submit' className='w-full py-2.5 rounded border border-green-600 bg-neutral-700/30 hover:bg-green-600'>Sign in</button>
                    <div className='flex flex-col items-center gap-1'>
                        <p className='underline text-neutral-500 text-sm font-light hover:text-neutral-400 cursor-pointer'>Send a magic link email</p>
                        <p className='underline text-neutral-500 text-sm font-light hover:text-neutral-400 cursor-pointer'>Forgot your password?</p>
                        {
                            login ? (<p onClick={handleSignUp} className='underline text-neutral-500 text-sm font-light hover:text-neutral-400 cursor-pointer'>Don't have account? Sign up</p>)
                            : (<p onClick={handleLogin} className='underline text-neutral-500 text-sm font-light hover:text-neutral-400 cursor-pointer'>Already have account? Login</p>) 
                        }
                    </div>
                </div>
                <div className='fixed inset-0 bg-neutral-900/80 backdrop-blur-sm'></div>
            </form>)}
        </>
    )
  )
}

export default LoginModal