import {createSlice} from '@reduxjs/toolkit' ;

const initialState = {
    user : JSON.parse(localStorage.getItem("user")) || null,
    isFetching : false ,
    error :false ,
}

const authSlice = createSlice({
    name : "user" ,
    initialState ,

    reducers : {
        authRequest : (state)=>{
            state.isFetching = true ;
        },
        authLogin : (state , response) =>{
            state.user = response ;
            localStorage.setItem("user" , JSON.stringify(response.payload));
        },
        authError : (state)=>{
            state.error = true ;
        }
    }
});


export const {authRequest , authLogin , authError} = authSlice.actions ;
export const authReducer = authSlice.reducer ;