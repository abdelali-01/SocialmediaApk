import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isFetching: false,
  error: null,
  response : null 
};

const authSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    authCheck: (state, response) => {
      if (response) {
        state.user = response.payload;
      }
    },
    authRequest: (state) => {
      state.isFetching = true;
    },
    authLogin: (state, response) => {
      state.user = response.payload;
    },
    authError: (state , error) => {
      state.error = error.payload;
    },
    authResponse : (state , response) =>{
        state.response = response.payload ;
    },
    resetResponse : (state)=>{
        state.response = null ;
    },
  },
});

export const { authRequest, authLogin, authError, authCheck  , authResponse , resetResponse} =
  authSlice.actions;
export const authReducer = authSlice.reducer;
