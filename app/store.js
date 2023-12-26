"use client"

import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../ReduxSlices/authSlice'
import { Provider } from 'react-redux'
import playerSlice from '@/ReduxSlices/playerSlice'
import authenticationSlice from '@/ReduxSlices/authenticationSlice'
import userIteamSlice from '@/ReduxSlices/userIteamSlice'

export const store = configureStore({
  reducer: {
    auth : authSlice,
    player : playerSlice,
    authenticationSlice : authenticationSlice,
    userIteam : userIteamSlice
  },
})

export const GlobalProvider = ({children}) =>{
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

