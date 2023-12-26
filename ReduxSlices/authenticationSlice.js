import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    loginStatus : false,
    signUpData : null
}

const authSlice = createSlice(
    {
        name : 'authenticationSlice',
        initialState : intialState,
        reducers : {
            setLoginStatus : (state, value)=>{
                state.loginStatus = value.payload
            },
            setSignUpDetails : (state, value)=>{
                state.signUpData = value.payload
            }
        }
    }
);

export const { setLoginStatus, setSignUpDetails} = authSlice.actions;
export default authSlice.reducer;