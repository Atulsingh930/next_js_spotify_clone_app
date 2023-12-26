"use client"
import { auth } from '@/config/firbase'
import { addUserDataInFirestore } from '@/config/firestoreFunction'
import React from 'react'

function AccountDetails() {
    //console.log(auth.currentUser, 'AccountDetails')
  return (
    <div className='bg-neutral-900 overflow-y-auto h-full w-full rounded-lg flex justify-center items-center'>
        <button onClick={() => addUserDataInFirestore({displayName : auth.currentUser.displayName, email : auth.currentUser.email, userID : auth.currentUser.uid})}>
            Click me
        </button>
    </div>
  )
}

export default AccountDetails