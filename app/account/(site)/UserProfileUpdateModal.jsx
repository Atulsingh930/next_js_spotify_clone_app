import React, { useEffect, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { FiEdit2 } from "react-icons/fi";
import { firebaseImageRemover, firebaseImageUploader } from '@/config/firebaseImageUploader';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeUserImage } from '@/services/UserIteamDetails';
import { handleUpdateUserName } from '@/config/firbaseFunction';

function UserProfileUpdateModal({className, handleModal, userData}) {

    const { signUpData } = useSelector((state)=>state.authenticationSlice)
    const [show, setShow] = useState(false)
    const [imageUrl, setimageUrl] = useState('');
    const [uploadImage, setUploadImage] = useState(null);
    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();
    console.log(userName, 'uploadImage')

    async function handleSaveImage() {
        console.log('uploadImage', uploadImage)

        if(userName !== `${signUpData?.first} ${signUpData?.last}`) {
            await handleUpdateUserName(userName, signUpData, dispatch);
        };

        if(uploadImage !== null) {
            const imageurl = await firebaseImageUploader(uploadImage, userData.email);
            if(imageurl){
                handleChangeUserImage(dispatch, imageurl, signUpData);
                setimageUrl(imageurl);
                setUploadImage(null);
                handleModal(null);
            }
        };
    }

    async function handleChange(event){
        setUploadImage(event.target.files[0]);
        setimageUrl(URL?.createObjectURL(event.target.files[0]));
    }

    function handleRemoveImage(e){
        e.preventDefault();
        setUploadImage(null);
        setimageUrl(null);
        firebaseImageRemover(userData.email, signUpData, dispatch);
    }

    function closeModal () {
        handleModal(null)
    }

    useEffect(() => {
        if(signUpData) {
            setUserName(`${signUpData?.first} ${signUpData?.last}`);
            setimageUrl(signUpData.profileUrl);
        }
    }, [])
    

    console.log(imageUrl, 'imageUrl')
  return (
    <div className={className}>
        <div className='fixed top-40 left-[32rem] translate-x-0 translate-y-0 z-20 '>
            <RxCross2 onClick={closeModal} size={33} className='absolute top-4 right-4 p-1.5 rounded-full cursor-pointer'/>
            <div className='h-[21rem] w-[32rem] bg-neutral-800 overflow-y-auto flex flex-col items-start gap-4 rounded-lg p-6'>
                <p className='text-xl text-neutral-50 font-semibold'>Profile Details</p>
                <div className='flex items-center gap-6'>
                    <label onMouseOver={() =>setShow(true)} onMouseOut={() =>setShow(false)} className='rounded-full h-[12rem] w-[12rem] bg-neutral-800 flex justify-center items-center shadow-[rgba(0,_0,_0,_0.5)_0_5px_30px] cursor-pointer relative'>
                        <input onChange={handleChange} type="file" className='hidden' />
                        { imageUrl && <Image src={imageUrl} width={300} height={300} alt='profile' className={`rounded-full h-full aspect-square ${show && 'brightness-50'}`}/> }
                        {
                            show ? (
                                <div className='flex flex-col justify-center gap-4 items-center absolute top-16 right-10'>
                                    <FiEdit2 className='text-neutral-50' size={40}/>
                                    <p onClick={imageUrl && handleRemoveImage} className='text-neutral-50 text-sm font-medium hover:underline'>{imageUrl ? 'Remove Photo' : 'Choose a Photo'}</p>
                                </div>
                            ) : (<FaRegUser className='text-neutral-500' size={50}/>)
                        }

                    </label>
                    <div className='w-[15rem] flex flex-col items-end gap-2'>
                        <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" className='w-full px-3 py-2 bg-neutral-700 text-neutral-50 text-sm font-medium rounded-sm'/>
                        <button onClick={handleSaveImage} className='text-sm text-neutral-800 font-medium px-6 py-4 rounded-3xl bg-neutral-50'>
                            Save
                        </button>
                    </div>
                </div>
                <p className='text-xs font-medium text-neutral-50 tracking-tighter'>By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
            </div>
        </div>
        <div className='fixed inset-0 z-10 !mt-0 grid place-items-center overflow-auto  bg-opacity-10 backdrop-brightness-50 over'></div>
    </div>
  )
}

export default UserProfileUpdateModal