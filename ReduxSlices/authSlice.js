import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    login: false,
    signup:true,
    loading : false,
    count : 5
    
}

export const authSlice = createSlice(
    {
        initialState,
        name : 'auth',
        reducers : {
            setLogin : (state) => {
                state.login = true,
                state.signup = false
                //console.log(state.login, state.signup, 'redux');
            },
            setSignup : (state) => {
                state.login = false,
                state.signup = true
            },
            setReset : (state)=>{
                state.login = false,
                state.signup = false
            },
            setLoading : (state, action)=>{
                state.loading = action.payload
            },
            setCount : (state, action)=>{
                state.count = action.payload
            }
        }
    }
)

export const {setLogin, setSignup, setReset, setLoading, setCount} = authSlice.actions;
export default authSlice.reducer